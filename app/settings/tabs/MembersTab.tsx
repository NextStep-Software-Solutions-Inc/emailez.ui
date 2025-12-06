import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { GetAllWorkspaceMembersResponse } from '@/lib/types/member.types';
import { memberApi } from '@/lib/services/member-api';
import { toast } from 'sonner';
import { InviteMemberDialog } from '@/components/dialogs/InviteMemberDialog';
import { useUser } from '@clerk/react-router';
import { Trash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConfirmDialog } from '@/components/ui/responsive-dialog';

const ROLE_OPTIONS = ["Admin", "Member"];

export function MembersTab({ workspaceId }: { workspaceId: string }) {
  const [members, setMembers] = useState<GetAllWorkspaceMembersResponse[]>([]);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    handleGetMembers(workspaceId);
  }, [workspaceId]);

  const handleGetMembers = async (workspaceId: string) => {
    memberApi.getMembers(workspaceId).then((res) => setMembers(res))
  }

  const handleRoleChange = async (workspaceUserId: string, newRole: string) => {
    setUpdatingRoleId(workspaceUserId);
    const role = newRole === 'Owner' ? 1 : newRole === 'Admin' ? 2 : 3; // Assuming roles are mapped like this
    toast.promise(memberApi.updateMemberRole(workspaceId, workspaceUserId, role), {
      success: res => {
        setMembers(members =>
          members.map(m =>
            m.id === workspaceUserId ? { ...m, role: newRole } : m
          )
        );
        return res.message || 'Role updated successfully';
      },
      error: res => {
        return res.message || 'Failed to update role';
      },
      finally: () => {  
        setUpdatingRoleId(null);
      }
    });
  };


  const handleRemoveMember = async (memberId: string) => {
    setRemovingId(memberId);
  };

  const confirmRemoveMember = async () => {
    if (!removingId) return;
    toast.promise(
      memberApi.removeMember(workspaceId, removingId),
      {
        loading: 'Removing...',
        success: res => {
          setMembers(members => members.filter(m => m.id !== removingId));
          setRemovingId(null);
          return res.message || 'Member removed successfully';
        },
        error: res => {
          setRemovingId(null);
          return res.message || 'Failed to remove member';
        }
      }
    );
  };
  const handleMemberInvited = () => {
    handleGetMembers(workspaceId);
  };

  if (!workspaceId) {
    return <div className="text-center py-12">No workspace selected</div>;
  }
  if(!user) {
    return <div className="text-center py-12">User not found</div>;
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Workspace Members</h2>
        <InviteMemberDialog workspaceId={workspaceId} onInvited={handleMemberInvited} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-700">
              <th className="py-2 px-3 text-left">User ID</th>
              <th className="py-2 px-3 text-left">Role</th>
              <th className="py-2 px-3 text-left">Joined</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} className="border-t">
                <td className="py-2 px-3">{member.userId}
                  {member.userId === user.id && (
                    <span className="ml-2 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 align-middle">
                      You
                    </span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {member.role === "Owner" ? (
                    <span className="font-semibold text-blue-700">Owner</span>
                  ) : (
                     <Select 
                      value={member.role} 
                      onValueChange={role => handleRoleChange(member.id, role)}
                      disabled={updatingRoleId === member.id || user.id === member.userId}
                     >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select role"  />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map(role => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="py-2 px-3">{new Date(member.createdAt).toLocaleString()}</td>
                <td className="py-2 px-3 flex gap-2">
                  <Button
                    className="cursor-pointer"
                    type="button" variant="destructive" 
                    size="icon" 
                    disabled={user.id === member.userId || updatingRoleId === member.id}
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <Trash/>
                  </Button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={4} className="py-2 px-3 text-gray-500">No members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {
        <ConfirmDialog
          open={!!removingId}
          title="Remove Member"
          description="Are you sure you want to remove this member from the workspace?"
          onConfirm={confirmRemoveMember}
          onCancel={() => setRemovingId(null)}
          onOpenChange={() => setRemovingId(null)}
          confirmText="Remove"
          cancelText="Cancel"
          variant="destructive"
          isLoading={!removingId}
        />
      }
    </div>
  );
}

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { memberApi } from '@/lib/services/member-api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const ROLE_OPTIONS = ["Admin", "Member"];

export function InviteMemberDialog({
  workspaceId,
  onInvited,
}: {
  workspaceId: string;
  onInvited?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [inviteUserId, setInviteUserId] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [inviting, setInviting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteUserId) return;
    setInviting(true);

    const role = inviteRole === 'Admin' ? 2 : 3; // Assuming 2 is Admin and 3 is Member
    toast.promise(
      memberApi.addMember(workspaceId, inviteUserId, role),
      {
        loading: 'Inviting...',
        success: res => {
          setInviteUserId('');
          setInviteRole('Member');
          setOpen(false);
          onInvited && onInvited();
          return res.message || 'Member invited successfully';
        },
        error: res => res.message || 'Failed to invite member',
        finally: () => setInviting(false),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="default">Invite Member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">User ID</label>
            <Input
              type="text"
              value={inviteUserId}
              onChange={e => setInviteUserId(e.target.value)}
              placeholder="Enter user ID"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
            <Select value={inviteRole} onValueChange={setInviteRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map(role => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={inviting || !inviteUserId}>
              {inviting ? 'Inviting...' : 'Invite'}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
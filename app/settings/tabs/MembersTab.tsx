import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { WorkspaceMember } from '@/lib/types/member.types';
import { memberApi } from '@/lib/services/member-api';

export function MembersTab({ workspaceId }: { workspaceId: string }) {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [memberLoading, setMemberLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;
    setMemberLoading(true);
    memberApi.getMembers(workspaceId)
      .then((res) => setMembers(res as WorkspaceMember[]))
      .finally(() => setMemberLoading(false));
  }, [workspaceId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Workspace Members</h2>
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
                <td className="py-2 px-3">{member.userId}</td>
                <td className="py-2 px-3">{member.role}</td>
                <td className="py-2 px-3">{new Date(member.createdAt).toLocaleString()}</td>
                <td className="py-2 px-3 flex gap-2">
                  <Button type="button" variant="destructive" size="sm" disabled>Remove</Button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={4} className="py-2 px-3 text-gray-500">No members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

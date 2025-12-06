// Workspace membership management service
import type { AddWorkspaceMemberResponse, GetAllWorkspaceMembersResponse, RemoveWorkspaceMemberResponse, UpdateWorkspaceMemberRoleResponse } from '../types/member.types';
import { httpClient } from './http-client';

export const memberApi = {

    setAuthToken: (token: string | null): void => {
        httpClient.setTokenGetter(() => token);
    },
    // List all members of a workspace
    getMembers: async (workspaceId: string) => {
        return httpClient.get<GetAllWorkspaceMembersResponse[]>(`/api/v1/workspaces/${workspaceId}/members`);
    },

    // Add a member to a workspace
    addMember: async (workspaceId: string, userId: string, role: number) => {
        return httpClient.post<AddWorkspaceMemberResponse>(`/api/v1/workspaces/${workspaceId}/members`, {
            userId,
            role,
        });
    },

    // Remove a member from a workspace
    removeMember: async (workspaceId: string, userId: string) => {
        return httpClient.delete<RemoveWorkspaceMemberResponse>(`/api/v1/workspaces/${workspaceId}/members/${userId}`);
    },

    // Update a member's role
    updateMemberRole: async (workspaceId: string, userId: string, role: number) => {
        return httpClient.put<UpdateWorkspaceMemberRoleResponse>(`/api/v1/workspaces/${workspaceId}/members/${userId}/role`, {
            role,
        });
    },
};

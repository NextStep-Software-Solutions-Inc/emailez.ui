// Workspace membership management service
import { httpClient } from './http-client';

export const memberApi = {
    // List all members of a workspace
    getMembers: async (workspaceId: string) => {
        return httpClient.get(`/api/v1/workspaces/${workspaceId}/members`);
    },

    // Add a member to a workspace
    addMember: async (workspaceId: string, userId: string, role: number) => {
        return httpClient.post(`/api/v1/workspaces/${workspaceId}/members`, {
            userId,
            role,
        });
    },

    // Remove a member from a workspace
    removeMember: async (workspaceId: string, userId: string) => {
        return httpClient.delete(`/api/v1/workspaces/${workspaceId}/members/${userId}`);
    },

    // Update a member's role
    updateMemberRole: async (workspaceId: string, userId: string, role: number) => {
        return httpClient.put(`/api/v1/workspaces/${workspaceId}/members/${userId}/role`, {
            role,
        });
    },
};

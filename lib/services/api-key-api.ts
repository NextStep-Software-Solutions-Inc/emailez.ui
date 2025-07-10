import { httpClient } from './http-client';
import type { WorkspaceApiKey, CreateWorkspaceApiKeyResponse } from '@/lib/types/api-key.types';

export const apiKeyApi = {
    setAuthToken: (token: string | null): void => {
        httpClient.setTokenGetter(() => token);
    },

    // List all API keys for a workspace user
    getApiKeys: async (workspaceId: string, userId: string): Promise<WorkspaceApiKey[]> => {
        return httpClient.get<WorkspaceApiKey[]>(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys`);
    },

    // Create a new API key for a workspace user
    createApiKey: async (workspaceId: string, userId: string, name?: string): Promise<CreateWorkspaceApiKeyResponse> => {
        return httpClient.post<CreateWorkspaceApiKeyResponse>(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys`, {
            workspaceId,
            userId,
            name,
        });
    },

    // Revoke (delete) an API key
    revokeApiKey: async (workspaceId: string, userId: string, apiKeyId: string): Promise<void> => {
        return httpClient.delete<void>(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys/${apiKeyId}`);
    },
};
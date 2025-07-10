// API Key management service for workspace users
import { httpClient } from './http-client';

export const apiKeyApi = {

    setAuthToken: (token: string | null) => {
        httpClient.setTokenGetter(() => token);
    },
    // List all API keys for a workspace user
    getApiKeys: async (workspaceId: string, userId: string) => {
        return httpClient.get(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys`);
    },

    // Create a new API key for a workspace user
    createApiKey: async (workspaceId: string, userId: string, name?: string) => {
        return httpClient.post(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys`, {
            workspaceId,
            userId,
            name,
        });
    },

    // Regenerate an API key (returns new plain key)
    regenerateApiKey: async (workspaceId: string, userId: string, apiKeyId: string) => {
        return httpClient.post(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys/${apiKeyId}/regenerate`);
    },

    // Revoke (delete) an API key
    revokeApiKey: async (workspaceId: string, userId: string, apiKeyId: string) => {
        return httpClient.delete(`/api/v1/workspaces/${workspaceId}/users/${userId}/apikeys/${apiKeyId}`);
    },
};

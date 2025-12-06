// Types for API Key management
export interface WorkspaceApiKey {
    id: string;
    workspaceUserId: string;
    lastUsedAt: string | null;
    isActive: boolean;
    name: string;
}

export interface CreateWorkspaceApiKeyResponse {
    apiKeyId: string;
    plainKey: string;
    success: boolean;
    message: string;
}

export interface RegenerateApiKeyResponse {
    apiKeyId: string;
    plainKey: string;
    success: boolean;
    message: string;
}

export interface RevokeApiKeyResponse {
    success: boolean;
    message: string;
}
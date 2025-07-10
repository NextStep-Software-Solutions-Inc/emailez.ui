// Types for API Key management
export interface WorkspaceApiKey {
    id: string;
    workspaceUserId: string;
    lastUsedAt: string | null;
    isActive: boolean;
    name: string | null;
}

export interface CreateWorkspaceApiKeyResponse {
    apiKeyId: string;
    plainKey: string;
    success: boolean;
    message: string | null;
}

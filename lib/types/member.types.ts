// Types for workspace membership
export interface WorkspaceMember {
    id: string;
    userId: string;
    workspaceId: string;
    role: number;
    createdAt: string;
    isDeleted: boolean;
    // Add more fields as needed from API
}

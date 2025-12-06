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

export interface AddWorkspaceMemberResponse {
    success: boolean;
    message: string;
}

export interface GetAllWorkspaceMembersResponse {
    id: string;
    userId: string;
    workspaceId: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface RemoveWorkspaceMemberResponse {
    success: boolean;
    message: string;
}

export interface UpdateWorkspaceMemberRoleResponse {
    success: boolean;
    message: string;
}

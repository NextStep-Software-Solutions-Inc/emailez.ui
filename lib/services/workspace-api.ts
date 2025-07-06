import { httpClient } from './http-client';
import type { 
  Workspace,
  CreateWorkspaceCommand,
  CreateWorkspaceResponse,
  UpdateWorkspaceCommand
} from '@/types/workspace.types';

// Workspace API calls
export const workspaceApi = {
  setAuthToken: (token: string | null) => {
    httpClient.setTokenGetter(() => token);
  },

  // GET /api/v1/user/workspaces
  getUserWorkspaces: async (): Promise<Workspace[]> => {
    return httpClient.get<Workspace[]>('/api/v1/workspaces',);
  },

  // POST /api/v1/workspaces
  createWorkspace: async (data: CreateWorkspaceCommand): Promise<CreateWorkspaceResponse> => {
    return httpClient.post<CreateWorkspaceResponse>('/api/v1/workspaces', data);
  },

  // PUT /api/v1/workspaces/{workspaceId}
  updateWorkspace: async (workspaceId: string, data: UpdateWorkspaceCommand, token?: string): Promise<void> => {
    return httpClient.put<void>(`/api/v1/workspaces/${workspaceId}`, data);
  },

  // DELETE /api/v1/workspaces/{workspaceId}
  deleteWorkspace: async (workspaceId: string, token?: string): Promise<void> => {
    return httpClient.delete<void>(`/api/v1/workspaces/${workspaceId}`);
  },
};

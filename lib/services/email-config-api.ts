import { httpClient } from './http-client';
import type { 
  EmailConfiguration,
  CreateEmailConfigurationCommand,
  CreateEmailConfigurationResponse,
  UpdateEmailConfigurationCommand
} from '@/types/configuration.types';

// Email Configuration API calls
export const emailConfigApi = {
  setAuthToken: (token: string | null) => {
    httpClient.setTokenGetter(() => token);
  },

  // GET /api/v1/workspaces/{workspaceId}/email-configurations
  getAllEmailConfigurations: async (workspaceId: string): Promise<EmailConfiguration[]> => {
    return httpClient.get<EmailConfiguration[]>(`/api/v1/workspaces/${workspaceId}/email-configurations`);
  },

  // GET /api/v1/workspaces/{workspaceId}/email-configurations/{id}
  getEmailConfigurationById: async (workspaceId: string, id: string): Promise<EmailConfiguration> => {
    return httpClient.get<EmailConfiguration>(`/api/v1/workspaces/${workspaceId}/email-configurations/${id}`);
  },

  // POST /api/v1/workspaces/{workspaceId}/email-configurations
  createEmailConfiguration: async (workspaceId: string, data: CreateEmailConfigurationCommand): Promise<CreateEmailConfigurationResponse> => {
    return httpClient.post<CreateEmailConfigurationResponse>(`/api/v1/workspaces/${workspaceId}/email-configurations`, data);
  },

  // PUT /api/v1/workspaces/{workspaceId}/email-configurations/{id}
  updateEmailConfiguration: async (workspaceId: string, id: string, data: UpdateEmailConfigurationCommand): Promise<void> => {
    return httpClient.put<void>(`/api/v1/workspaces/${workspaceId}/email-configurations/${id}`, data);
  },

  // DELETE /api/v1/workspaces/{workspaceId}/email-configurations/{id}
  deleteEmailConfiguration: async (workspaceId: string, id: string): Promise<void> => {
    return httpClient.delete<void>(`/api/v1/workspaces/${workspaceId}/email-configurations/${id}`);
  },
};

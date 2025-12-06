import { httpClient } from './http-client';
import type { 
  SendEmailCommand,
  EmailDto,
  EmailDetailsDto,
  EmailFilters
} from '@/types/email.types';
import type { PaginatedList } from '@/types/common.types';

// Email API calls
export const emailApi = {

  setAuthToken: (token: string | null) => {
    httpClient.setTokenGetter(() => token);
  },
  // GET /api/v1/workspaces/{workspaceId}/emails
  getEmailsForWorkspace: async (workspaceId: string, filters: EmailFilters = {}): Promise<PaginatedList<EmailDto>> => {
    const params: Record<string, string | number | boolean> = {};
    
    if (filters.pageNumber) params.pageNumber = filters.pageNumber;
    if (filters.pageSize) params.pageSize = filters.pageSize;
    if (filters.sortOrder) params.sortOder = filters.sortOrder; // Note: API has typo 'sortOder'
    if (filters.emailStatus) params.emailStatus = filters.emailStatus;
    if (filters.toEmailContains) params.toEmailContains = filters.toEmailContains;
    if (filters.subjectContains) params.subjectContains = filters.subjectContains;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    
    return httpClient.get<PaginatedList<EmailDto>>(`/api/v1/workspaces/${workspaceId}/emails`, { params });
  },

  // GET /api/v1/workspaces/{workspaceId}/emails/{id}
  getEmailByIdForWorkspace: async (workspaceId: string, id: string): Promise<EmailDetailsDto> => {
    return httpClient.get<EmailDetailsDto>(`/api/v1/workspaces/${workspaceId}/emails/${id}`);
  },

  // POST /api/v1/workspaces/{workspaceId}/emails/send-email
  sendEmail: async (workspaceId: string, data: SendEmailCommand): Promise<void> => {
    return httpClient.post<void>(`/api/v1/workspaces/${workspaceId}/emails/send-email`, data);
  },

  // POST /api/v1/send-email (using API key)
  sendEmailWithApiKey: async (data: SendEmailCommand, apiKey: string): Promise<void> => {
    return httpClient.withHeaders({ 'X-API-KEY': apiKey }).post<void>('/api/v1/send-email', data);
  },
};

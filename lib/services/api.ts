import type { 
  EmailConfiguration,
  CreateEmailConfigurationCommand,
  CreateEmailConfigurationResponse,
  UpdateEmailConfigurationCommand,
  SendEmailCommand,
  EmailDto,
  EmailDetailsDto,
  EmailFilters,
  PaginatedList,
  Workspace,
  CreateWorkspaceCommand,
  CreateWorkspaceResponse,
  UpdateWorkspaceCommand,
  // Legacy types for backward compatibility
  Tenant, 
  CreateTenantCommand, 
  CreateTenantResponse,
  UpdateTenantCommand
} from '@/types/index';

// Base API configuration
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://emailez-api-apbhbpc8dcb9a9hc.southeastasia-01.azurewebsites.net';

// API utility functions
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken'); // Adjust based on your auth implementation
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Legacy Tenant API calls (deprecated - use workspaceApi instead)
export const tenantApi = {
  // GET /api/v1/tenants
  getAllTenants: async (): Promise<Tenant[]> => {
    return apiRequest<Tenant[]>('/api/v1/tenants');
  },

  // GET /api/v1/tenants/{id}
  getTenantById: async (id: string): Promise<Tenant> => {
    return apiRequest<Tenant>(`/api/v1/tenants/${id}`);
  },

  // POST /api/v1/tenants
  createTenant: async (data: CreateTenantCommand): Promise<CreateTenantResponse> => {
    return apiRequest<CreateTenantResponse>('/api/v1/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT /api/v1/tenants/{id}
  updateTenant: async (id: string, data: UpdateTenantCommand): Promise<void> => {
    return apiRequest<void>(`/api/v1/tenants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // DELETE /api/v1/tenants/{id}
  deleteTenant: async (id: string): Promise<void> => {
    return apiRequest<void>(`/api/v1/tenants/${id}`, {
      method: 'DELETE',
    });
  },
};

// Email Configuration API calls
export const emailConfigApi = {
  // GET /api/v1/workspaces/{workspaceId}/email-configurations
  getAllEmailConfigurations: async (workspaceId: string): Promise<EmailConfiguration[]> => {
    return apiRequest<EmailConfiguration[]>(`/api/v1/workspaces/${workspaceId}/email-configurations`);
  },

  // GET /api/v1/workspaces/{workspaceId}/email-configurations/{id}
  getEmailConfigurationById: async (workspaceId: string, id: string): Promise<EmailConfiguration> => {
    return apiRequest<EmailConfiguration>(`/api/v1/workspaces/${workspaceId}/email-configurations/${id}`);
  },

  // POST /api/v1/workspaces/{workspaceId}/email-configurations
  createEmailConfiguration: async (workspaceId: string, data: CreateEmailConfigurationCommand): Promise<CreateEmailConfigurationResponse> => {
    return apiRequest<CreateEmailConfigurationResponse>(`/api/v1/workspaces/${workspaceId}/email-configurations`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT /api/v1/workspaces/{workspaceId}/email-configurations/{id}
  updateEmailConfiguration: async (workspaceId: string, id: string, data: UpdateEmailConfigurationCommand): Promise<void> => {
    return apiRequest<void>(`/api/v1/workspaces/${workspaceId}/email-configurations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // DELETE /api/v1/workspaces/{workspaceId}/email-configurations/{id}
  deleteEmailConfiguration: async (workspaceId: string, id: string): Promise<void> => {
    return apiRequest<void>(`/api/v1/workspaces/${workspaceId}/email-configurations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Email API calls
export const emailApi = {
  // GET /api/v1/workspaces/{workspaceId}/emails
  getEmailsForWorkspace: async (workspaceId: string, filters: EmailFilters = {}): Promise<PaginatedList<EmailDto>> => {
    const params = new URLSearchParams();
    
    if (filters.pageNumber) params.append('pageNumber', filters.pageNumber.toString());
    if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
    if (filters.sortOrder) params.append('sortOder', filters.sortOrder); // Note: API has typo 'sortOder'
    if (filters.emailStatus) params.append('emailStatus', filters.emailStatus);
    if (filters.toEmailContains) params.append('toEmailContains', filters.toEmailContains);
    if (filters.subjectContains) params.append('subjectContains', filters.subjectContains);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    const queryString = params.toString();
    const endpoint = `/api/v1/workspaces/${workspaceId}/emails${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<PaginatedList<EmailDto>>(endpoint);
  },

  // GET /api/v1/workspaces/{workspaceId}/emails/{id}
  getEmailByIdForWorkspace: async (workspaceId: string, id: string): Promise<EmailDetailsDto> => {
    return apiRequest<EmailDetailsDto>(`/api/v1/workspaces/${workspaceId}/emails/${id}`);
  },

  // POST /api/v1/workspaces/{workspaceId}/emails/send-email
  sendEmail: async (workspaceId: string, data: SendEmailCommand): Promise<void> => {
    return apiRequest<void>(`/api/v1/workspaces/${workspaceId}/emails/send-email`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // POST /api/v1/send-email (using API key)
  sendEmailWithApiKey: async (data: SendEmailCommand, apiKey: string): Promise<void> => {
    return apiRequest<void>('/api/v1/send-email', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(data),
    });
  },
};

// Workspace API calls
export const workspaceApi = {
  // GET /api/v1/user/workspaces
  getUserWorkspaces: async (): Promise<Workspace[]> => {
    return apiRequest<Workspace[]>('/api/v1/user/workspaces');
  },

  // POST /api/v1/workspaces
  createWorkspace: async (data: CreateWorkspaceCommand): Promise<CreateWorkspaceResponse> => {
    return apiRequest<CreateWorkspaceResponse>('/api/v1/workspaces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT /api/v1/workspaces/{workspaceId}
  updateWorkspace: async (workspaceId: string, data: UpdateWorkspaceCommand): Promise<void> => {
    return apiRequest<void>(`/api/v1/workspaces/${workspaceId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // DELETE /api/v1/workspaces/{workspaceId}
  deleteWorkspace: async (workspaceId: string): Promise<void> => {
    return apiRequest<void>(`/api/v1/workspaces/${workspaceId}`, {
      method: 'DELETE',
    });
  },
};

// Combined API object
export const api = {
  workspaces: workspaceApi,
  tenants: tenantApi, // Keep for backward compatibility - deprecated, use workspaces instead
  emailConfigurations: emailConfigApi,
  emails: emailApi,
};

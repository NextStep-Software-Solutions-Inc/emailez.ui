import { httpClient } from './http-client';
import type { 
  Tenant, 
  CreateTenantCommand, 
  CreateTenantResponse,
  UpdateTenantCommand
} from '@/types/workspace.types';

// Legacy Tenant API calls (deprecated - use workspace-api instead)
export const tenantApi = {
  // GET /api/v1/tenants
  getAllTenants: async (): Promise<Tenant[]> => {
    return httpClient.get<Tenant[]>('/api/v1/tenants');
  },

  // GET /api/v1/tenants/{id}
  getTenantById: async (id: string): Promise<Tenant> => {
    return httpClient.get<Tenant>(`/api/v1/tenants/${id}`);
  },

  // POST /api/v1/tenants
  createTenant: async (data: CreateTenantCommand): Promise<CreateTenantResponse> => {
    return httpClient.post<CreateTenantResponse>('/api/v1/tenants', data);
  },

  // PUT /api/v1/tenants/{id}
  updateTenant: async (id: string, data: UpdateTenantCommand): Promise<void> => {
    return httpClient.put<void>(`/api/v1/tenants/${id}`, data);
  },

  // DELETE /api/v1/tenants/{id}
  deleteTenant: async (id: string): Promise<void> => {
    return httpClient.delete<void>(`/api/v1/tenants/${id}`);
  },
};

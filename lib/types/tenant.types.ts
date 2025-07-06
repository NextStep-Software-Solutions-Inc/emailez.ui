// Tenant-related types
export interface Tenant {
  tenantId: string;
  name: string | null;
  domain: string | null;
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateTenantCommand {
  name: string | null;
  domain: string | null;
}

export interface CreateTenantResponse {
  tenantId: string;
  name: string | null;
  domain: string | null;
  apiKey: string | null;
  isSuccess: boolean;
  message: string | null;
}

export interface UpdateTenantCommand {
  id: string;
  name: string | null;
  domain: string | null;
  isActive: boolean;
}

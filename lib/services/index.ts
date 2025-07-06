// Export the core HTTP client
export { httpClient, HttpClient } from './http-client';
export type { FetchOptions } from './http-client';

// Export individual API modules
export { workspaceApi } from './workspace-api';
export { emailConfigApi } from './email-config-api';
export { emailApi } from './email-api';
export { analyticsApi } from './analytics-api';
export { tenantApi } from './tenant-api';

// Combined API object for convenience (optional)
export const api = {
  workspaces: workspaceApi,
  emailConfigurations: emailConfigApi,
  emails: emailApi,
  analytics: analyticsApi,
  tenants: tenantApi, // Legacy - deprecated
};

// Re-export for backward compatibility
import { workspaceApi } from './workspace-api';
import { emailConfigApi } from './email-config-api';
import { emailApi } from './email-api';
import { analyticsApi } from './analytics-api';
import { tenantApi } from './tenant-api';

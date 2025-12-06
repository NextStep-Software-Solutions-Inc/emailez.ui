// Workspace-related types
export interface Workspace {
  workspaceId: string;
  name: string | null;
  domain: string | null;
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateWorkspaceCommand {
  name: string | null;
  domain: string | null;
}

export interface CreateWorkspaceResponse {
  workspaceId: string;
  name: string | null;
  domain: string | null;
  apiKey: string | null;
  isSuccess: boolean;
  message: string | null;
}

export interface UpdateWorkspaceCommand {
  id: string;
  name: string | null;
  domain: string | null;
  isActive: boolean;
}

// Legacy types (to be removed after backend migration)
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

export interface GetWorkspaceAnalyticsResponse {
  workspaceId: string,
  workspaceName: string,
  emailMetrics: {
    totalEmails: number,
    sentEmails: number,
    failedEmails: number,
    queuedEmails: number,
    successRate: number,
    averageAttempts: number,
    statusBreakdown: {
      Queued: number,
      Failed: number,
      Sent: number
    }
  },
  engagementMetrics: {
    openRate: number,
    clickRate: number,
    bounceRate: number,
    unsubscribeRate: number,
    spamComplaintRate: number
  },
  userMetrics: {
    totalUsers: number,
    owners: number,
    admins: number,
    members: number
  },
  analysisPeriodStart: string,
  analysisPeriodEnd: string,
  emailVolumeOverTime: {
      date: string,
      sent: number,
      failed: number
    }[],
  recentPerformance: {
      label: string,
      sent: number,
      failed: number,
      deliveryRate: number
    }[]
}
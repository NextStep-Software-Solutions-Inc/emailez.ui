import { httpClient } from './http-client';

// Analytics API response types
export interface EmailAnalytics {
  totalEmails: number;
  sentEmails: number;
  failedEmails: number;
  queuedEmails: number;
  deliveryRate: number;
  successRate: number;
}

export interface EmailTrendData {
  date: string;
  sent: number;
  failed: number;
  queued: number;
}

export interface DetailedAnalytics extends EmailAnalytics {
  openRate?: number;
  clickRate?: number;
  bounceRate?: number;
  unsubscribeRate?: number;
  trend: EmailTrendData[];
}

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  period?: '7d' | '30d' | '90d' | 'custom';
}

// Analytics API calls
export const analyticsApi = {
  setAuthToken: (token: string | null) => {
    httpClient.setTokenGetter(() => token);
  },

  // GET /api/v1/workspaces/{workspaceId}/analytics
  getEmailAnalytics: async (workspaceId: string, filters: AnalyticsFilters = {}): Promise<EmailAnalytics> => {
    const params: Record<string, string> = {};
    
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.period) params.period = filters.period;
    
    return httpClient.get<EmailAnalytics>(`/api/v1/workspaces/${workspaceId}/analytics`, { params });
  },

  // GET /api/v1/workspaces/{workspaceId}/analytics/detailed
  getDetailedAnalytics: async (workspaceId: string, filters: AnalyticsFilters = {}): Promise<DetailedAnalytics> => {
    const params: Record<string, string> = {};
    
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.period) params.period = filters.period;
    
    return httpClient.get<DetailedAnalytics>(`/api/v1/workspaces/${workspaceId}/analytics/detailed`, { params });
  },

  // GET /api/v1/workspaces/{workspaceId}/analytics/trend
  getEmailTrend: async (workspaceId: string, filters: AnalyticsFilters = {}): Promise<EmailTrendData[]> => {
    const params: Record<string, string> = {};
    
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.period) params.period = filters.period;
    
    return httpClient.get<EmailTrendData[]>(`/api/v1/workspaces/${workspaceId}/analytics/trend`, { params });
  },
};

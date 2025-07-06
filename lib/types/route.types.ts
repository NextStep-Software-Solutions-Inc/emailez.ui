import type { MetaDescriptor } from "react-router";
import type { Tenant } from "./tenant.types";
import type { EmailDto } from "./email.types";
import type { EmailConfiguration } from "./configuration.types";

// Dashboard Index Route Types
export interface DashboardIndexLoaderData {
  tenant: Tenant;
  recentEmails: EmailDto[];
  emailConfigurations: EmailConfiguration[];
}

export interface DashboardIndexComponentProps {
  loaderData: DashboardIndexLoaderData;
}

// Dashboard Compose Route Types
export interface DashboardComposeLoaderData {
  configurations: EmailConfiguration[];
}

export interface DashboardComposeComponentProps {
  loaderData: DashboardComposeLoaderData;
}

// Dashboard Configurations Route Types (no loader data needed)
export interface DashboardConfigurationsComponentProps {
  // No loader data for this route
}

// Dashboard Analytics Route Types
export interface AnalyticsData {
  emailsSent: number;
  emailsDelivered: number;
  emailsOpened: number;
  emailsClicked: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  recentActivity: Array<{
    date: string;
    emails: number;
    delivered: number;
    opened: number;
    clicked: number;
  }>;
}

export interface DashboardAnalyticsLoaderData {
  analytics: AnalyticsData;
}

export interface DashboardAnalyticsComponentProps {
  loaderData: DashboardAnalyticsLoaderData;
}

// Dashboard Activity Route Types
export interface DashboardActivityLoaderData {
  emails: EmailDto[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export interface DashboardActivityComponentProps {
  loaderData: DashboardActivityLoaderData;
}

// Dashboard Settings Route Types (typically no loader data)
export interface DashboardSettingsComponentProps {
  // No loader data for this route typically
}

// Meta function type
export type DashboardMetaFunction = () => MetaDescriptor[];

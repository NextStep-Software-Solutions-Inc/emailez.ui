// EmailEZ API Types - Generated from OpenAPI specification

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

export interface EmailConfiguration {
  emailConfigurationId: string;
  tenantId: string;
  smtpHost: string | null;
  smtpPort: number;
  useSsl: boolean;
  username: string | null;
  fromEmail: string | null;
  displayName: string | null;
  createdAtUtc: string;
}

export interface CreateEmailConfigurationCommand {
  tenantId: string;
  smtpHost: string | null;
  smtpPort: number;
  useSsl: boolean;
  username: string | null;
  fromEmail: string | null;
  password: string | null;
  displayName: string | null;
}

export interface CreateEmailConfigurationResponse {
  emailConfigurationId: string;
  success: boolean;
  message: string | null;
}

export interface UpdateEmailConfigurationCommand {
  id: string;
  tenantId: string;
  smtpHost: string | null;
  smtpPort: number;
  useSsl: boolean;
  username: string | null;
  fromEmail: string | null;
  password: string | null;
  displayName: string | null;
}

export interface EmailDto {
  id: string;
  tenantId: string;
  fromAddress: string;
  toAddresses: string[] | null;
  subject: string | null;
  status: string;
  errorMessage: string | null;
  queuedAt: string;
  sentAt: string | null;
  attemptCount: number;
  bodySnippet: string | null;
  isHtml: boolean;
}

export interface EmailDetailsDto {
  id: string;
  tenantId: string;
  emailConfigurationId: string;
  fromAddress: string;
  toAddresses: string[] | null;
  ccAddresses: string[] | null;
  bccAddresses: string[] | null;
  subject: string | null;
  bodyHtml: string | null;
  bodyPlainText: string | null;
  status: string;
  errorMessage: string | null;
  smtpResponse: string | null;
  hangfireJobId: string | null;
  queuedAt: string;
  sentAt: string | null;
  attemptCount: number;
}

export interface PaginatedList<T> {
  items: T[] | null;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type EmailDtoPaginatedList = PaginatedList<EmailDto>;

export interface SendEmailCommand {
  tenantId: string;
  emailConfigurationId: string;
  toEmail: string[] | null;
  subject: string | null;
  body: string | null;
  isHtml: boolean;
  fromDisplayName: string | null;
  ccEmail: string[] | null;
  bccEmail: string[] | null;
}

export interface EmailFilters {
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: string;
  emailStatus?: string;
  toEmailContains?: string;
  subjectContains?: string;
  startDate?: string;
  endDate?: string;
}

// Common response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string | null;
  data?: T;
}

export interface DeleteResponse {
  success: boolean;
  message: string | null;
}

// Email status constants
export const EMAIL_STATUS = {
  QUEUED: 'Queued',
  SENDING: 'Sending',
  SENT: 'Sent',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
} as const;

export type EmailStatus = typeof EMAIL_STATUS[keyof typeof EMAIL_STATUS];

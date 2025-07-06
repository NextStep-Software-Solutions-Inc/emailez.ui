// Email-related types
export interface EmailDto {
  id: string;
  workspaceId: string; // Updated to use workspaceId
  tenantId?: string; // Keep for backward compatibility
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
  workspaceId: string; // Updated to use workspaceId
  tenantId?: string; // Keep for backward compatibility
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

export interface SendEmailCommand {
  workspaceId: string; // Updated to use workspaceId
  tenantId?: string; // Keep for backward compatibility
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

// Email status constants
export const EMAIL_STATUS = {
  QUEUED: 'Queued',
  SENDING: 'Sending',
  SENT: 'Sent',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
} as const;

export type EmailStatus = typeof EMAIL_STATUS[keyof typeof EMAIL_STATUS];

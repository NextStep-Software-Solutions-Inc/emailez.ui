import type { EmailConfiguration, EmailDto, Tenant } from "../types";

// Mock data - will be replaced with API calls later
export const mockTenant: Tenant = {
  tenantId: "123e4567-e89b-12d3-a456-426614174000",
  name: "Acme Corporation",
  domain: "acme.com",
  isActive: true,
  createdAtUtc: "2024-01-15T10:30:00Z"
};

export const mockRecentEmails: EmailDto[] = [
  {
    id: "email-1",
    tenantId: mockTenant.tenantId,
    fromAddress: "noreply@acme.com",
    toAddresses: ["user@example.com"],
    subject: "Welcome to our service",
    status: "Sent",
    errorMessage: null,
    queuedAt: "2024-12-20T14:30:00Z",
    sentAt: "2024-12-20T14:30:15Z",
    attemptCount: 1,
    bodySnippet: "Thank you for signing up! We're excited to have you...",
    isHtml: true
  },
  {
    id: "email-2", 
    tenantId: mockTenant.tenantId,
    fromAddress: "alerts@acme.com",
    toAddresses: ["admin@example.com"],
    subject: "System maintenance notification",
    status: "Queued",
    errorMessage: null,
    queuedAt: "2024-12-20T15:00:00Z",
    sentAt: null,
    attemptCount: 0,
    bodySnippet: "Scheduled maintenance will occur tonight from 11 PM...",
    isHtml: true
  },
  {
    id: "email-3",
    tenantId: mockTenant.tenantId,
    fromAddress: "support@acme.com", 
    toAddresses: ["customer@example.com"],
    subject: "Your support ticket has been resolved",
    status: "Failed",
    errorMessage: "SMTP connection timeout",
    queuedAt: "2024-12-20T13:45:00Z",
    sentAt: null,
    attemptCount: 3,
    bodySnippet: "Hi there! Your support ticket #12345 has been...",
    isHtml: true
  }
];

export const mockEmailConfigurations: EmailConfiguration[] = [
  {
    emailConfigurationId: "config-1",
    tenantId: mockTenant.tenantId,
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    useSsl: true,
    username: "noreply@acme.com",
    fromEmail: "noreply@acme.com",
    displayName: "Acme Notifications",
    createdAtUtc: "2024-01-15T10:35:00Z"
  }
];

// Service functions that would later be replaced with API calls
export const getDashboardData = async () => {
  // Simulate API call
  return {
    tenant: mockTenant,
    recentEmails: mockRecentEmails,
    emailConfigurations: mockEmailConfigurations
  };
};

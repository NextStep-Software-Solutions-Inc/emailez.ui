import type { EmailConfiguration, EmailDto, Workspace } from "../types";

// Mock workspaces data
export const mockWorkspaces: Workspace[] = [
  {
    workspaceId: "workspace-1",
    name: "Acme Corp",
    domain: "acme.com",
    isActive: true,
    createdAtUtc: "2024-01-15T10:30:00Z",
  },
  {
    workspaceId: "workspace-2", 
    name: "Beta Solutions",
    domain: "beta.com",
    isActive: true,
    createdAtUtc: "2024-02-01T09:15:00Z",
  }
];

// Mock data - will be replaced with API calls later
export const mockRecentEmails: EmailDto[] = [
  {
    id: "email-1",
    workspaceId: "workspace-1",
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
    workspaceId: "workspace-1",
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
    workspaceId: "workspace-1",
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
  },
  // Mock emails for second workspace
  {
    id: "email-4",
    workspaceId: "workspace-2",
    fromAddress: "hello@beta.com",
    toAddresses: ["client@example.com"],
    subject: "Project update",
    status: "Sent",
    errorMessage: null,
    queuedAt: "2024-12-20T16:00:00Z",
    sentAt: "2024-12-20T16:00:10Z",
    attemptCount: 1,
    bodySnippet: "Here's the latest update on your project...",
    isHtml: true
  }
];

export const mockEmailConfigurations: EmailConfiguration[] = [
  {
    emailConfigurationId: "config-1",
    workspaceId: "workspace-1",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    useSsl: true,
    username: "noreply@acme.com",
    fromEmail: "noreply@acme.com",
    displayName: "Acme Notifications",
    createdAtUtc: "2024-01-15T10:35:00Z"
  },
  {
    emailConfigurationId: "config-2",
    workspaceId: "workspace-1",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    useSsl: true,
    username: "alerts@acme.com",
    fromEmail: "alerts@acme.com",
    displayName: "Acme Alerts",
    createdAtUtc: "2024-01-20T11:00:00Z"
  },
  {
    emailConfigurationId: "config-3",
    workspaceId: "workspace-2",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: 587,
    useSsl: true,
    username: "apikey",
    fromEmail: "hello@beta.com",
    displayName: "Beta Solutions",
    createdAtUtc: "2024-02-01T09:20:00Z"
  }
];

// Service functions that would later be replaced with API calls
export const getDashboardData = async (workspaceId?: string) => {
  // Simulate API call
  const filteredEmails = workspaceId 
    ? mockRecentEmails.filter(email => email.workspaceId === workspaceId)
    : mockRecentEmails;
  
  const filteredConfigurations = workspaceId
    ? mockEmailConfigurations.filter(config => config.workspaceId === workspaceId)
    : mockEmailConfigurations;

  const workspace = workspaceId 
    ? mockWorkspaces.find(w => w.workspaceId === workspaceId)
    : mockWorkspaces[0]; // Default to first workspace if no ID provided

  return {
    workspace,
    recentEmails: filteredEmails,
    emailConfigurations: filteredConfigurations
  };
};

export const getWorkspaceEmails = async (workspaceId: string) => {
  return mockRecentEmails.filter(email => email.workspaceId === workspaceId);
};

export const getWorkspaceConfigurations = async (workspaceId: string) => {
  return mockEmailConfigurations.filter(config => config.workspaceId === workspaceId);
};

import type { EmailConfiguration } from "@/types/configuration.types";

// Mock configurations for selection
export const mockConfigurations: EmailConfiguration[] = [
  {
    emailConfigurationId: "config-1",
    tenantId: "tenant-1",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    useSsl: true,
    username: "noreply@example.com",
    fromEmail: "noreply@example.com",
    displayName: "Example Company",
    createdAtUtc: "2024-01-15T10:30:00Z"
  },
  {
    emailConfigurationId: "config-2",
    tenantId: "tenant-1",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: 587,
    useSsl: true,
    username: "apikey",
    fromEmail: "support@example.com",
    displayName: "Support Team",
    createdAtUtc: "2024-01-15T10:35:00Z"
  },
  {
    emailConfigurationId: "config-3",
    tenantId: "tenant-1",
    smtpHost: "smtp.mailgun.org",
    smtpPort: 587,
    useSsl: true,
    username: "postmaster@mg.example.com",
    fromEmail: "alerts@example.com",
    displayName: "System Alerts",
    createdAtUtc: "2024-01-15T10:40:00Z"
  }
];

export const getEmailConfigurations = async (): Promise<EmailConfiguration[]> => {
  // Simulate API call
  return mockConfigurations;
};

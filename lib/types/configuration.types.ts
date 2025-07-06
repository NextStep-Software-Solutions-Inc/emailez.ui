// Email configuration types
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

// SMTP Provider presets
export interface SmtpPreset {
  name: string;
  smtpHost: string;
  smtpPort: number;
  useSsl: boolean;
  instructions: string;
}

export interface TestConnectionResult {
  success: boolean;
  message: string;
}

export interface TestEmailData {
  recipient: string;
  subject: string;
  message: string;
}

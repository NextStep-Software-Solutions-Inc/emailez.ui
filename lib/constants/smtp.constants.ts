import type { SmtpPreset } from '@/types/configuration.types';

// Popular SMTP provider presets
export const SMTP_PRESETS: Record<string, SmtpPreset> = {
  gmail: {
    name: 'Gmail',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    useSsl: true,
    instructions: 'Use your Gmail address as username and an App Password for the password.'
  },
  outlook: {
    name: 'Outlook/Hotmail',
    smtpHost: 'smtp-mail.outlook.com',
    smtpPort: 587,
    useSsl: true,
    instructions: 'Use your Outlook email address as username and your account password.'
  },
  sendgrid: {
    name: 'SendGrid',
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: 587,
    useSsl: true,
    instructions: 'Use "apikey" as username and your SendGrid API key as password.'
  },
  mailgun: {
    name: 'Mailgun',
    smtpHost: 'smtp.mailgun.org',
    smtpPort: 587,
    useSsl: true,
    instructions: 'Use your Mailgun SMTP credentials from your domain settings.'
  },
  ses: {
    name: 'Amazon SES',
    smtpHost: 'email-smtp.us-east-1.amazonaws.com',
    smtpPort: 587,
    useSsl: true,
    instructions: 'Use your AWS SES SMTP credentials (not your AWS access keys).'
  }
};

// Default test email content
export const DEFAULT_TEST_EMAIL = {
  subject: 'Test Email from Email EZ',
  message: 'This is a test email sent from your Email EZ configuration. If you received this email, your SMTP configuration is working correctly!'
};

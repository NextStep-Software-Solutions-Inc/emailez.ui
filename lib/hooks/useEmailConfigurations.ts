import { useState } from 'react';
import type { EmailConfiguration, TestConnectionResult, TestEmailData } from '@/types/configuration.types';

// Mock data for email configurations
const mockConfigurations: EmailConfiguration[] = [
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
    displayName: "Example Support",
    createdAtUtc: "2024-01-10T14:20:00Z"
  }
];

interface UseEmailConfigurationsProps {
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export function useEmailConfigurations({ showNotification }: UseEmailConfigurationsProps) {
  const [configurations, setConfigurations] = useState<EmailConfiguration[]>(mockConfigurations);
  const [isTestingConnection, setIsTestingConnection] = useState<string | null>(null);
  const [isSendingTestEmail, setIsSendingTestEmail] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: TestConnectionResult }>({});

  const addConfiguration = (config: EmailConfiguration) => {
    setConfigurations(prev => [...prev, config]);
  };

  const updateConfiguration = (config: EmailConfiguration) => {
    setConfigurations(prev => 
      prev.map(c => c.emailConfigurationId === config.emailConfigurationId ? config : c)
    );
  };

  const deleteConfiguration = (configId: string) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      setConfigurations(prev => prev.filter(c => c.emailConfigurationId !== configId));
      showNotification('success', 'Configuration deleted successfully');
    }
  };

  const testConnection = async (configId: string): Promise<TestConnectionResult> => {
    setIsTestingConnection(configId);
    try {
      // Mock test connection - in real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      const result: TestConnectionResult = {
        success,
        message: success 
          ? 'Connection successful! SMTP server is reachable.' 
          : 'Connection failed. Please check your SMTP settings.'
      };
      
      setTestResults(prev => ({ ...prev, [configId]: result }));
      showNotification(
        result.success ? 'success' : 'error',
        result.message
      );
      return result;
    } catch (error) {
      const result: TestConnectionResult = {
        success: false,
        message: 'Connection test failed'
      };
      setTestResults(prev => ({ ...prev, [configId]: result }));
      showNotification('error', 'Connection test failed');
      return result;
    } finally {
      setIsTestingConnection(null);
    }
  };

  const sendTestEmail = async (configId: string, testEmailData: TestEmailData): Promise<boolean> => {
    setIsSendingTestEmail(configId);
    try {
      // Mock send test email - in real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.2;
      
      if (success) {
        showNotification('success', `Test email sent successfully to ${testEmailData.recipient}`);
      } else {
        showNotification('error', 'Failed to send test email. Please check your configuration.');
      }
      
      return success;
    } catch (error) {
      showNotification('error', 'Failed to send test email');
      return false;
    } finally {
      setIsSendingTestEmail(null);
    }
  };

  return {
    configurations,
    setConfigurations,
    isTestingConnection,
    isSendingTestEmail,
    testResults,
    addConfiguration,
    updateConfiguration,
    deleteConfiguration,
    testConnection,
    sendTestEmail
  };
}

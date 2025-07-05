import { useState, useEffect, useRef } from 'react';
import type { EmailConfiguration } from '../../lib/types';

export function meta() {
  return [
    { title: "Configurations - Email EZ" },
    { name: "description", content: "Manage your SMTP configurations" },
  ];
}

// Popular SMTP provider presets
const SMTP_PRESETS = {
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

export default function DashboardConfigurations() {
  const [configurations, setConfigurations] = useState<EmailConfiguration[]>(mockConfigurations);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingConfig, setEditingConfig] = useState<EmailConfiguration | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState<string | null>(null);
  const [isSendingTestEmail, setIsSendingTestEmail] = useState<string | null>(null);
  const [testEmailModalConfig, setTestEmailModalConfig] = useState<EmailConfiguration | null>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDelete = (configId: string) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      setConfigurations(prev => prev.filter(c => c.emailConfigurationId !== configId));
      showNotification('success', 'Configuration deleted successfully');
    }
  };

  const handleTestConnection = async (configId: string) => {
    setIsTestingConnection(configId);
    try {
      // Mock test connection - in real implementation, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      const result = {
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
    } catch (error) {
      setTestResults(prev => ({ ...prev, [configId]: { success: false, message: 'Connection test failed' } }));
      showNotification('error', 'Connection test failed');
    } finally {
      setIsTestingConnection(null);
    }
  };

  const handleSendTestEmail = async (configId: string, testEmailData: {
    recipient: string;
    subject: string;
    message: string;
  }) => {
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
    } catch (error) {
      showNotification('error', 'Failed to send test email');
    } finally {
      setIsSendingTestEmail(null);
      // Don't close the modal here - let the modal handle its own closing
    }
  };

  const ConfigurationForm = ({ config, onSave, onCancel }: {
    config?: EmailConfiguration;
    onSave: (config: EmailConfiguration) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState<{
      smtpHost: string;
      smtpPort: number;
      useSsl: boolean;
      username: string;
      fromEmail: string;
      displayName: string;
      password: string;
    }>({
      smtpHost: config?.smtpHost || '',
      smtpPort: config?.smtpPort || 587,
      useSsl: config?.useSsl || true,
      username: config?.username || '',
      fromEmail: config?.fromEmail || '',
      displayName: config?.displayName || '',
      password: ''
    });

    const [selectedPreset, setSelectedPreset] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      
      if (!formData.smtpHost.trim()) {
        newErrors.smtpHost = 'SMTP Host is required';
      }
      if (!formData.smtpPort || formData.smtpPort <= 0 || formData.smtpPort > 65535) {
        newErrors.smtpPort = 'Valid SMTP Port is required (1-65535)';
      }
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (!formData.fromEmail.trim()) {
        newErrors.fromEmail = 'From Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.fromEmail)) {
        newErrors.fromEmail = 'Please enter a valid email address';
      }
      if (!config && !formData.password.trim()) {
        newErrors.password = 'Password is required for new configurations';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handlePresetChange = (presetKey: string) => {
      setSelectedPreset(presetKey);
      if (presetKey && SMTP_PRESETS[presetKey as keyof typeof SMTP_PRESETS]) {
        const preset = SMTP_PRESETS[presetKey as keyof typeof SMTP_PRESETS];
        setFormData(prev => ({
          ...prev,
          smtpHost: preset.smtpHost,
          smtpPort: preset.smtpPort,
          useSsl: preset.useSsl
        }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newConfig: EmailConfiguration = {
          emailConfigurationId: config?.emailConfigurationId || `config-${Date.now()}`,
          tenantId: config?.tenantId || 'tenant-1',
          smtpHost: formData.smtpHost,
          smtpPort: formData.smtpPort,
          useSsl: formData.useSsl,
          username: formData.username,
          fromEmail: formData.fromEmail,
          displayName: formData.displayName,
          createdAtUtc: config?.createdAtUtc || new Date().toISOString()
        };
        
        onSave(newConfig);
        showNotification('success', config ? 'Configuration updated successfully' : 'Configuration added successfully');
      } catch (error) {
        showNotification('error', 'Failed to save configuration');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {config ? 'Edit Configuration' : 'Add New Configuration'}
        </h3>
        
        {/* SMTP Provider Presets */}
        {!config && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Quick Setup (Optional)
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <option value="">Select a provider to auto-fill settings</option>
              {Object.entries(SMTP_PRESETS).map(([key, preset]) => (
                <option key={key} value={key}>{preset.name}</option>
              ))}
            </select>
            {selectedPreset && (
              <p className="mt-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>
                💡 {SMTP_PRESETS[selectedPreset as keyof typeof SMTP_PRESETS].instructions}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                SMTP Host *
              </label>
              <input
                type="text"
                value={formData.smtpHost}
                onChange={(e) => setFormData(prev => ({ ...prev, smtpHost: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.smtpHost ? 'border-red-300' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                placeholder="smtp.gmail.com"
              />
              {errors.smtpHost && (
                <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {errors.smtpHost}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                SMTP Port *
              </label>
              <input
                type="number"
                value={formData.smtpPort}
                onChange={(e) => setFormData(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.smtpPort ? 'border-red-300' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                placeholder="587"
                min="1"
                max="65535"
              />
              {errors.smtpPort && (
                <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {errors.smtpPort}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                placeholder="your-email@example.com"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {errors.username}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                placeholder={config ? 'Leave blank to keep current password' : 'Enter password'}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                From Email *
              </label>
              <input
                type="email"
                value={formData.fromEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fromEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                placeholder="noreply@yourcompany.com"
              />
              {errors.fromEmail && (
                <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {errors.fromEmail}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                placeholder="Your Company Name"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useSsl"
              checked={formData.useSsl}
              onChange={(e) => setFormData(prev => ({ ...prev, useSsl: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="useSsl" className="ml-2 block text-sm text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Use SSL/TLS (Recommended)
            </label>
          </div>
          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              {isLoading ? 'Saving...' : config ? 'Update Configuration' : 'Add Configuration'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  const TestEmailModal = ({ config, onSend, onCancel }: {
    config: EmailConfiguration;
    onSend: (testEmailData: { recipient: string; subject: string; message: string }) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      recipient: '',
      subject: 'Test Email from Email EZ',
      message: 'This is a test email sent from your Email EZ configuration. If you received this email, your SMTP configuration is working correctly!'
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isVisible, setIsVisible] = useState(false);
    const prevSendingState = useRef<string | null>(null);

    // Animation effect
    useEffect(() => {
      setIsVisible(true);
      return () => setIsVisible(false);
    }, []);

    // Handle completion of email sending
    useEffect(() => {
      const wasSending = prevSendingState.current === config.emailConfigurationId;
      const isNotSending = isSendingTestEmail !== config.emailConfigurationId;
      
      if (wasSending && isNotSending) {
        // Email sending just completed, close modal after a delay
        const timer = setTimeout(() => {
          handleCancel();
        }, 1500);
        return () => clearTimeout(timer);
      }
      
      // Update the previous state
      prevSendingState.current = isSendingTestEmail;
    }, [isSendingTestEmail, config.emailConfigurationId]);

    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      
      if (!formData.recipient.trim()) {
        newErrors.recipient = 'Recipient email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.recipient)) {
        newErrors.recipient = 'Please enter a valid email address';
      }
      
      if (!formData.subject.trim()) {
        newErrors.subject = 'Subject is required';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        onSend(formData);
      }
    };

    const handleCancel = () => {
      if (isSendingTestEmail === config.emailConfigurationId) {
        return; // Don't allow closing while sending
      }
      setIsVisible(false);
      setTimeout(() => onCancel(), 200); // Wait for animation to complete
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && isSendingTestEmail !== config.emailConfigurationId) {
        handleCancel();
      }
    };

    return (
      <div 
        className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      >
        <div className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Send Test Email
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
                <strong>Using configuration:</strong> {config.displayName || config.fromEmail}
              </p>
              <p className="text-sm text-blue-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                From: {config.fromEmail}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Recipient Email *
                </label>
                <input
                  type="email"
                  value={formData.recipient}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.recipient ? 'border-red-300' : 'border-gray-300'
                  }`}
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  placeholder="test@example.com"
                />
                {errors.recipient && (
                  <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {errors.recipient}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.subject ? 'border-red-300' : 'border-gray-300'
                  }`}
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  placeholder="Test Email Subject"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  }`}
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  placeholder="Enter your test message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSendingTestEmail === config.emailConfigurationId}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {isSendingTestEmail === config.emailConfigurationId ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send Test Email</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSendingTestEmail === config.emailConfigurationId}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {notification.message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setNotification(null)}
                className="inline-flex text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Email Configurations
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Manage your SMTP configurations for sending emails. Add multiple providers for redundancy and load balancing.
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAddingNew(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2" 
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Configuration</span>
          </button>
        </div>
        <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {configurations.length} configuration{configurations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Add New Configuration Form */}
      {isAddingNew && (
        <ConfigurationForm
          onSave={(config) => {
            setConfigurations(prev => [...prev, config]);
            setIsAddingNew(false);
          }}
          onCancel={() => setIsAddingNew(false)}
        />
      )}

      {/* Edit Configuration Form */}
      {editingConfig && (
        <ConfigurationForm
          config={editingConfig}
          onSave={(config) => {
            setConfigurations(prev => prev.map(c => 
              c.emailConfigurationId === config.emailConfigurationId ? config : c
            ));
            setEditingConfig(null);
          }}
          onCancel={() => setEditingConfig(null)}
        />
      )}

      {/* Configurations List */}
      {configurations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              No configurations yet
            </h3>
            <p className="text-gray-500 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Add your first SMTP configuration to start sending emails.
            </p>
            <button 
              onClick={() => setIsAddingNew(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200" 
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Add Configuration
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {configurations.map((config) => (
            <div key={config.emailConfigurationId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {config.displayName || config.fromEmail}
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {config.smtpHost}:{config.smtpPort} {config.useSsl && '(SSL)'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTestConnection(config.emailConfigurationId)}
                    disabled={isTestingConnection === config.emailConfigurationId}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center space-x-1 ${
                      testResults[config.emailConfigurationId]?.success 
                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                        : testResults[config.emailConfigurationId]?.success === false
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    } ${isTestingConnection === config.emailConfigurationId ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    {isTestingConnection === config.emailConfigurationId ? (
                      <>
                        <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Testing...</span>
                      </>
                    ) : testResults[config.emailConfigurationId]?.success ? (
                      <>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Connected</span>
                      </>
                    ) : testResults[config.emailConfigurationId]?.success === false ? (
                      <>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Failed</span>
                      </>
                    ) : (
                      <span>Test Connection</span>
                    )}
                  </button>
                  <button
                    onClick={() => setTestEmailModalConfig(config)}
                    className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center space-x-1"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Test</span>
                  </button>
                  <button
                    onClick={() => setEditingConfig(config)}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(config.emailConfigurationId)}
                    className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {/* Connection Test Result */}
              {testResults[config.emailConfigurationId] && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  testResults[config.emailConfigurationId].success
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`} style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {testResults[config.emailConfigurationId].message}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>From Email:</span>
                  <span className="ml-2 text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{config.fromEmail}</span>
                </div>
                <div>
                  <span className="text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>Username:</span>
                  <span className="ml-2 text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{config.username}</span>
                </div>
                <div>
                  <span className="text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>Created:</span>
                  <span className="ml-2 text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {new Date(config.createdAtUtc).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Test Email Modal */}
      {testEmailModalConfig && (
        <TestEmailModal
          config={testEmailModalConfig}
          onSend={(testEmailData) => handleSendTestEmail(testEmailModalConfig.emailConfigurationId, testEmailData)}
          onCancel={() => setTestEmailModalConfig(null)}
        />
      )}
    </div>
  );
}

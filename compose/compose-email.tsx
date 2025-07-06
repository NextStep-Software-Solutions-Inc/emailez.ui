import { useState } from 'react';
import type { EmailConfiguration, SendEmailCommand } from '@/types/index';

interface ComposeEmailProps {
  configurations: EmailConfiguration[];
}

export function ComposeEmail({ configurations }: ComposeEmailProps) {
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [recipients, setRecipients] = useState('');
  const [body, setBody] = useState('');
  const [isHtml, setIsHtml] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConfig || !subject || !recipients || !body) {
      setErrorMessage('Please fill in all required fields');
      setSendStatus('error');
      return;
    }

    setIsSending(true);
    setSendStatus('idle');
    setErrorMessage(null);

    try {
      const sendCommand: SendEmailCommand = {
        workspaceId: "workspace-1", // This would come from context/auth
        emailConfigurationId: selectedConfig,
        subject,
        toEmail: recipients.split(',').map(email => email.trim()),
        body,
        isHtml,
        fromDisplayName: selectedConfiguration?.displayName || null,
        ccEmail: null,
        bccEmail: null
      };

      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      
      if (success) {
        setSendStatus('success');
        // Reset form
        setSubject('');
        setRecipients('');
        setBody('');
        setSelectedConfig('');
      } else {
        setSendStatus('error');
        setErrorMessage('Failed to send email: SMTP connection timeout');
      }
    } catch (error) {
      setSendStatus('error');
      setErrorMessage('An unexpected error occurred while sending the email');
    } finally {
      setIsSending(false);
    }
  };

  const selectedConfiguration = configurations.find(c => c.emailConfigurationId === selectedConfig);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Compose Email
        </h1>
        <p className="text-gray-600 mt-1">
          Send emails through your configured SMTP servers
        </p>
      </div>

      {/* Status Messages */}
      {sendStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Email sent successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      {sendStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-600 text-lg">❌</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Failed to send email
              </p>
              {errorMessage && (
                <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 space-y-6">
          {/* Configuration Selection */}
          <div>
            <label htmlFor="config" className="block text-sm font-medium text-gray-700 mb-2">
              Email Configuration *
            </label>
            <select
              id="config"
              value={selectedConfig}
              onChange={(e) => setSelectedConfig(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a configuration</option>
              {configurations.map((config) => (
                <option key={config.emailConfigurationId} value={config.emailConfigurationId}>
                  {config.displayName} ({config.fromEmail})
                </option>
              ))}
            </select>
            {selectedConfiguration && (
              <p className="text-sm text-gray-600 mt-1">
                Using {selectedConfiguration.smtpHost}:{selectedConfiguration.smtpPort}
              </p>
            )}
          </div>

          {/* Recipients */}
          <div>
            <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-2">
              Recipients *
            </label>
            <input
              type="text"
              id="recipients"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="user@example.com, another@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              Separate multiple email addresses with commas
            </p>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Body Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Format
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bodyType"
                  checked={!isHtml}
                  onChange={() => setIsHtml(false)}
                  className="mr-2"
                />
                Plain Text
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bodyType"
                  checked={isHtml}
                  onChange={() => setIsHtml(true)}
                  className="mr-2"
                />
                HTML
              </label>
            </div>
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
              Message Body *
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              placeholder={isHtml ? "Enter HTML content..." : "Enter your message..."}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              required
            />
          </div>

          {/* HTML Preview */}
          {isHtml && body && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div 
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-40 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setSubject('');
                setRecipients('');
                setBody('');
                setSelectedConfig('');
                setSendStatus('idle');
                setErrorMessage(null);
              }}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Clear
            </button>
            
            <button
              type="submit"
              disabled={isSending || !selectedConfig || !subject || !recipients || !body}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSending ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Email</span>
                  <span className="text-lg">📧</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Email Templates Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Quick Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setSubject('Welcome to our service!');
              setBody(isHtml 
                ? '<h1>Welcome!</h1><p>Thank you for signing up for our service. We\'re excited to have you on board!</p><p>Best regards,<br>The Team</p>'
                : 'Welcome!\n\nThank you for signing up for our service. We\'re excited to have you on board!\n\nBest regards,\nThe Team'
              );
            }}
            className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h3 className="font-medium text-gray-900">Welcome Email</h3>
            <p className="text-sm text-gray-600 mt-1">Standard welcome message for new users</p>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setSubject('Password Reset Request');
              setBody(isHtml 
                ? '<h2>Password Reset</h2><p>We received a request to reset your password. Click the link below to reset it:</p><p><a href="#">Reset Password</a></p><p>If you didn\'t request this, please ignore this email.</p>'
                : 'Password Reset\n\nWe received a request to reset your password. Click the link below to reset it:\n\n[Reset Password Link]\n\nIf you didn\'t request this, please ignore this email.'
              );
            }}
            className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h3 className="font-medium text-gray-900">Password Reset</h3>
            <p className="text-sm text-gray-600 mt-1">Password reset confirmation email</p>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setSubject('Account Verification Required');
              setBody(isHtml 
                ? '<h2>Verify Your Account</h2><p>Please verify your email address by clicking the link below:</p><p><a href="#">Verify Email</a></p><p>This link will expire in 24 hours.</p>'
                : 'Verify Your Account\n\nPlease verify your email address by clicking the link below:\n\n[Verification Link]\n\nThis link will expire in 24 hours.'
              );
            }}
            className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h3 className="font-medium text-gray-900">Email Verification</h3>
            <p className="text-sm text-gray-600 mt-1">Email address verification request</p>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setSubject('Monthly Newsletter');
              setBody(isHtml 
                ? '<h1>Monthly Update</h1><h2>What\'s New This Month</h2><p>Here are the latest updates and features:</p><ul><li>New feature 1</li><li>New feature 2</li><li>Bug fixes and improvements</li></ul><p>Thank you for being a valued customer!</p>'
                : 'Monthly Update\n\nWhat\'s New This Month\n\nHere are the latest updates and features:\n\n- New feature 1\n- New feature 2\n- Bug fixes and improvements\n\nThank you for being a valued customer!'
              );
            }}
            className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h3 className="font-medium text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-600 mt-1">Monthly newsletter template</p>
          </button>
        </div>
      </div>
    </div>
  );
}

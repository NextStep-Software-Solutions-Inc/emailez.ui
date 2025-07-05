import { useState } from 'react';
import type { EmailConfiguration, SendEmailCommand } from '../../lib/types';

export function meta() {
  return [
    { title: "Compose Email - Email EZ" },
    { name: "description", content: "Send emails through your configured SMTP servers" },
  ];
}

// Mock configurations for selection
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

export default function ComposeEmail() {
  const [emailData, setEmailData] = useState<Partial<SendEmailCommand>>({
    tenantId: "tenant-1",
    emailConfigurationId: "",
    toEmail: [],
    subject: "",
    body: "",
    isHtml: true,
    fromDisplayName: "",
    ccEmail: [],
    bccEmail: []
  });

  const [toEmails, setToEmails] = useState<string>('');
  const [ccEmails, setCcEmails] = useState<string>('');
  const [bccEmails, setBccEmails] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Parse email addresses
    const toEmailArray = toEmails.split(',').map(email => email.trim()).filter(email => email);
    const ccEmailArray = ccEmails.split(',').map(email => email.trim()).filter(email => email);
    const bccEmailArray = bccEmails.split(',').map(email => email.trim()).filter(email => email);

    const emailCommand: SendEmailCommand = {
      ...emailData as SendEmailCommand,
      toEmail: toEmailArray,
      ccEmail: ccEmailArray.length > 0 ? ccEmailArray : null,
      bccEmail: bccEmailArray.length > 0 ? bccEmailArray : null
    };

    // Mock send - in real app, this would call the API
    console.log('Sending email:', emailCommand);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setEmailData({
        tenantId: "tenant-1",
        emailConfigurationId: "",
        toEmail: [],
        subject: "",
        body: "",
        isHtml: true,
        fromDisplayName: "",
        ccEmail: [],
        bccEmail: []
      });
      setToEmails('');
      setCcEmails('');
      setBccEmails('');
    }, 3000);
  };

  const selectedConfig = mockConfigurations.find(config => config.emailConfigurationId === emailData.emailConfigurationId);

  if (showSuccess) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Email Sent Successfully!
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Your email has been queued for delivery and will be sent shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Compose Email
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Send emails through your configured SMTP servers.
        </p>
      </div>

      {/* Compose Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Configuration Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Email Configuration *
            </label>
            <select
              value={emailData.emailConfigurationId}
              onChange={(e) => setEmailData(prev => ({ ...prev, emailConfigurationId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              required
            >
              <option value="">Select a configuration</option>
              {mockConfigurations.map(config => (
                <option key={config.emailConfigurationId} value={config.emailConfigurationId}>
                  {config.displayName || config.fromEmail} ({config.smtpHost})
                </option>
              ))}
            </select>
            {selectedConfig && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <strong>From:</strong> {selectedConfig.fromEmail} 
                  {selectedConfig.displayName && ` (${selectedConfig.displayName})`}
                </p>
              </div>
            )}
          </div>

          {/* From Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              From Display Name
            </label>
            <input
              type="text"
              value={emailData.fromDisplayName || ''}
              onChange={(e) => setEmailData(prev => ({ ...prev, fromDisplayName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              placeholder="Optional display name"
            />
          </div>

          {/* To Emails */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              To *
            </label>
            <input
              type="text"
              value={toEmails}
              onChange={(e) => setToEmails(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              placeholder="recipient@example.com, another@example.com"
              required
            />
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Separate multiple email addresses with commas
            </p>
          </div>

          {/* CC Emails */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              CC
            </label>
            <input
              type="text"
              value={ccEmails}
              onChange={(e) => setCcEmails(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              placeholder="cc@example.com, another-cc@example.com"
            />
          </div>

          {/* BCC Emails */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              BCC
            </label>
            <input
              type="text"
              value={bccEmails}
              onChange={(e) => setBccEmails(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              placeholder="bcc@example.com, another-bcc@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Subject *
            </label>
            <input
              type="text"
              value={emailData.subject || ''}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              placeholder="Email subject"
              required
            />
          </div>

          {/* Email Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Email Type
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="emailType"
                  checked={emailData.isHtml}
                  onChange={() => setEmailData(prev => ({ ...prev, isHtml: true }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  HTML
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="emailType"
                  checked={!emailData.isHtml}
                  onChange={() => setEmailData(prev => ({ ...prev, isHtml: false }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Plain Text
                </span>
              </label>
            </div>
          </div>

          {/* Email Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Email Body *
            </label>
            <textarea
              value={emailData.body || ''}
              onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              placeholder={emailData.isHtml ? 
                "Enter your HTML email content here...\n\nExample:\n<h1>Hello!</h1>\n<p>This is an <strong>HTML</strong> email.</p>" :
                "Enter your plain text email content here..."}
              required
            />
            {emailData.isHtml && (
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                You can use HTML tags for formatting
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSending || !emailData.emailConfigurationId || !emailData.subject || !emailData.body || !toEmails}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Email</span>
                )}
              </button>
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                onClick={() => {
                  setEmailData({
                    tenantId: "tenant-1",
                    emailConfigurationId: "",
                    toEmail: [],
                    subject: "",
                    body: "",
                    isHtml: true,
                    fromDisplayName: "",
                    ccEmail: [],
                    bccEmail: []
                  });
                  setToEmails('');
                  setCcEmails('');
                  setBccEmails('');
                }}
              >
                Clear
              </button>
            </div>
            <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {toEmails.split(',').filter(email => email.trim()).length} recipient(s)
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

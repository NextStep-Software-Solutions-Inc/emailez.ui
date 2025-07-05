import { useState } from 'react';
import type { EmailConfiguration } from '../../lib/types';

export function meta() {
  return [
    { title: "Configurations - Email EZ" },
    { name: "description", content: "Manage your SMTP configurations" },
  ];
}

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

  const handleDelete = (configId: string) => {
    setConfigurations(prev => prev.filter(c => c.emailConfigurationId !== configId));
  };

  const handleTestConnection = async (configId: string) => {
    // Mock test connection
    console.log(`Testing connection for config ${configId}`);
    // In real implementation, this would make an API call
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
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
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {config ? 'Edit Configuration' : 'Add New Configuration'}
        </h3>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                SMTP Port *
              </label>
              <input
                type="number"
                value={formData.smtpPort}
                onChange={(e) => setFormData(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                required={!config}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                From Email *
              </label>
              <input
                type="email"
                value={formData.fromEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                required
              />
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
              Use SSL/TLS
            </label>
          </div>
          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              {config ? 'Update Configuration' : 'Add Configuration'}
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

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Email Configurations
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Manage your SMTP configurations for sending emails.
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAddingNew(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200" 
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Add Configuration
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
                    className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Test Connection
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
    </div>
  );
}

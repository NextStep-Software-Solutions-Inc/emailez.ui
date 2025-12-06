import { useState } from 'react';
import type { EmailConfiguration, CreateEmailConfigurationCommand } from '@/types/configuration.types';
import { SMTP_PRESETS } from '@/constants/smtp.constants';
import { Button } from '@/components/ui/button';

interface ConfigurationFormProps {
  config?: EmailConfiguration;
  workspaceId: string;
  onSave: (config: CreateEmailConfigurationCommand) => void;
  onCancel: () => void;
}

export function ConfigurationForm({ config, workspaceId, onSave, onCancel }: ConfigurationFormProps) {
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
    if (presetKey && SMTP_PRESETS[presetKey]) {
      const preset = SMTP_PRESETS[presetKey];
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
      
      const configData: CreateEmailConfigurationCommand = {
        workspaceId: workspaceId,
        smtpHost: formData.smtpHost,
        smtpPort: formData.smtpPort,
        useSsl: formData.useSsl,
        username: formData.username,
        fromEmail: formData.fromEmail,
        displayName: formData.displayName,
        password: formData.password
      };
      
      onSave(configData);
    } catch (error) {
      console.error('Failed to save configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4"  >
        {config ? 'Edit Configuration' : 'Add New Configuration'}
      </h3>
      
      {/* SMTP Provider Presets */}
      {!config && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2"  >
            Quick Setup (Optional)
          </label>
          <select
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             
          >
            <option value="">Select a provider to auto-fill settings</option>
            {Object.entries(SMTP_PRESETS).map(([key, preset]) => (
              <option key={key} value={key}>{preset.name}</option>
            ))}
          </select>
          {selectedPreset && (
            <p className="mt-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg"  >
              💡 {SMTP_PRESETS[selectedPreset].instructions}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"  >
              SMTP Host *
            </label>
            <input
              type="text"
              value={formData.smtpHost}
              onChange={(e) => setFormData(prev => ({ ...prev, smtpHost: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.smtpHost ? 'border-red-300' : 'border-gray-300'
              }`}
               
              placeholder="smtp.gmail.com"
            />
            {errors.smtpHost && (
              <p className="mt-1 text-sm text-red-600"  >
                {errors.smtpHost}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"  >
              SMTP Port *
            </label>
            <input
              type="number"
              value={formData.smtpPort}
              onChange={(e) => setFormData(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.smtpPort ? 'border-red-300' : 'border-gray-300'
              }`}
               
              placeholder="587"
              min="1"
              max="65535"
            />
            {errors.smtpPort && (
              <p className="mt-1 text-sm text-red-600"  >
                {errors.smtpPort}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"  >
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.username ? 'border-red-300' : 'border-gray-300'
              }`}
               
              placeholder="your-email@example.com"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600"  >
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"  >
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
               
              placeholder={config ? 'Leave blank to keep current password' : 'Enter password'}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600"  >
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"  >
              From Email *
            </label>
            <input
              type="email"
              value={formData.fromEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.fromEmail ? 'border-red-300' : 'border-gray-300'
              }`}
               
              placeholder="noreply@yourcompany.com"
            />
            {errors.fromEmail && (
              <p className="mt-1 text-sm text-red-600"  >
                {errors.fromEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"  >
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               
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
          <label htmlFor="useSsl" className="ml-2 block text-sm text-gray-700"  >
            Use SSL/TLS (Recommended)
          </label>
        </div>

        <div className="flex items-center space-x-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
             
          >
            {isLoading ? 'Saving...' : config ? 'Update Configuration' : 'Add Configuration'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="ghost"
             
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

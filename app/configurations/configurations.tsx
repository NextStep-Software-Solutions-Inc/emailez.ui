import { useState } from 'react';
import type { EmailConfiguration } from '@/types/configuration.types';
import { ConfigurationCard } from './ConfigurationCard';
import { ConfigurationForm } from './ConfigurationForm';
import { TestEmailModal } from './TestEmailModal';
import type { Workspace } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ConfigurationsProps {
  workspace: Workspace;
  configurations: EmailConfiguration[];
}

export function Configurations({ workspace, configurations }: ConfigurationsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<EmailConfiguration | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testingConfig, setTestingConfig] = useState<EmailConfiguration | null>(null);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);

  const handleAddConfiguration = () => {
    setEditingConfig(null);
    setShowForm(true);
  };

  const handleEditConfiguration = (config: EmailConfiguration) => {
    setEditingConfig(config);
    setShowForm(true);
  };

  const handleDeleteConfiguration = (configId: string, configName: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete the configuration "${configName}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      // In a real app, this would make an API call
      console.log('Deleting configuration:', configId);
      // Here you would typically update the configurations state or refetch data
    }
  };

  const handleTestConnection = async (config: EmailConfiguration) => {
    setTestingConnection(config.emailConfigurationId);
    
    try {
      // Simulate API call for testing connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      setTestResults(prev => ({
        ...prev,
        [config.emailConfigurationId]: {
          success,
          message: success 
            ? 'Connection successful! SMTP server is reachable.' 
            : 'Connection failed. Please check your SMTP settings.'
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [config.emailConfigurationId]: {
          success: false,
          message: 'Connection failed. Please try again.'
        }
      }));
    } finally {
      setTestingConnection(null);
    }
  };

  const handleOpenTestModal = (config: EmailConfiguration) => {
    setTestingConfig(config);
    setShowTestModal(true);
  };

  const handleSendTestEmail = async (testEmailData: any) => {
    setIsSendingTestEmail(true);
    
    try {
      // Simulate API call for sending test email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Test email sent successfully:', testEmailData);
      
      // The modal will handle closing itself and showing success message
      
    } catch (error) {
      console.error('Failed to send test email:', error);
      alert('Failed to send test email. Please try again.');
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  const handleCancelTest = () => {
    setShowTestModal(false);
    setTestingConfig(null);
  };

  const handleSaveConfiguration = (config: EmailConfiguration) => {
    // In a real app, this would make an API call
    console.log('Saving configuration:', config);
    setShowForm(false);
    setEditingConfig(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingConfig(null);
  };

  const handleCloseTestModal = () => {
    setShowTestModal(false);
    setTestingConfig(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Email Configurations</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage SMTP configurations for {workspace.name}</p>
        </div>
        <div className="flex-shrink-0">
          <Button
            onClick={handleAddConfiguration}
            className="w-full sm:w-auto inline-flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="whitespace-nowrap">Add Configuration</span>
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingConfig ? 'Edit Configuration' : 'Add New Configuration'}
          </h2>
          <ConfigurationForm
            config={editingConfig || undefined}
            onSave={handleSaveConfiguration}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {configurations.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No configurations</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first email configuration.</p>
          <div className="mt-6">
            <Button
              onClick={handleAddConfiguration}
              className="inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Configuration
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {configurations.map((config) => (
            <ConfigurationCard
              key={config.emailConfigurationId}
              config={config}
              testResult={testResults[config.emailConfigurationId]}
              isTestingConnection={testingConnection === config.emailConfigurationId}
              onTestConnection={() => handleTestConnection(config)}
              onSendTestEmail={() => handleOpenTestModal(config)}
              onEdit={() => handleEditConfiguration(config)}
              onDelete={() => handleDeleteConfiguration(config.emailConfigurationId, config.displayName || config.fromEmail || 'Unknown Configuration')}
            />
          ))}
        </div>
      )}

      {showTestModal && testingConfig && (
        <TestEmailModal
          config={testingConfig}
          onSend={handleSendTestEmail}
          onCancel={handleCancelTest}
          isSending={isSendingTestEmail}
        />
      )}
    </div>
  );
}

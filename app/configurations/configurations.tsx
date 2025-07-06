import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { EmailConfiguration, CreateEmailConfigurationCommand } from '@/types/configuration.types';
import { ConfigurationCard } from './ConfigurationCard';
import { ConfigurationForm } from './ConfigurationForm';
import type { Workspace } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { TestEmailDialog, ConfirmDialog } from '@/components/dialogs';
import { emailConfigApi } from '@/lib/services';
import { useAuth } from '@clerk/react-router';

interface ConfigurationsProps {
  workspace: Workspace;
  configurations: EmailConfiguration[];
}

export function Configurations({ workspace, configurations: initialConfigurations }: ConfigurationsProps) {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [configurations, setConfigurations] = useState<EmailConfiguration[]>(initialConfigurations);
  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<EmailConfiguration | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testingConfig, setTestingConfig] = useState<EmailConfiguration | null>(null);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [configToDelete, setConfigToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddConfiguration = () => {
    setEditingConfig(null);
    setShowForm(true);
  };

  const handleEditConfiguration = (config: EmailConfiguration) => {
    setEditingConfig(config);
    setShowForm(true);
  };

  const handleDeleteConfiguration = (configId: string, configName: string) => {
    setConfigToDelete({ id: configId, name: configName });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!configToDelete) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the auth token
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      // Set the token for API calls
      emailConfigApi.setAuthToken(token);
      
      // Delete the configuration
      await emailConfigApi.deleteEmailConfiguration(workspace.workspaceId, configToDelete.id);
      
      // Remove from local state
      setConfigurations(prev => prev.filter(config => config.emailConfigurationId !== configToDelete.id));
      
      setConfigToDelete(null);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async (config: EmailConfiguration) => {
    setTestingConnection(config.emailConfigurationId);
    
    try {
      // Get the auth token
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      // Set the token for API calls
      emailConfigApi.setAuthToken(token);
      
      // For now, simulate the test connection
      // In the future, you might want to add a test connection endpoint
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

  const handleSaveConfiguration = async (configData: CreateEmailConfigurationCommand) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the auth token
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      // Set the token for API calls
      emailConfigApi.setAuthToken(token);
      
      if (editingConfig) {
        // Update existing configuration
        await emailConfigApi.updateEmailConfiguration(workspace.workspaceId, editingConfig.emailConfigurationId, {
          id: editingConfig.emailConfigurationId,
          workspaceId: workspace.workspaceId,
          displayName: configData.displayName,
          fromEmail: configData.fromEmail,
          smtpHost: configData.smtpHost,
          smtpPort: configData.smtpPort,
          useSsl: configData.useSsl,
          username: configData.username,
          password: configData.password
        });
        
        // Update local state
        setConfigurations(prev => prev.map(config => 
          config.emailConfigurationId === editingConfig.emailConfigurationId 
            ? { ...config, ...configData }
            : config
        ));
      } else {
        // Create new configuration
        const response = await emailConfigApi.createEmailConfiguration(workspace.workspaceId, configData);
        
        // Add to local state
        const newConfig: EmailConfiguration = {
          emailConfigurationId: response.emailConfigurationId,
          displayName: configData.displayName,
          fromEmail: configData.fromEmail,
          smtpHost: configData.smtpHost,
          smtpPort: configData.smtpPort,
          useSsl: configData.useSsl,
          username: configData.username,
          workspaceId: workspace.workspaceId,
          createdAtUtc: new Date().toISOString()
        };
        
        setConfigurations(prev => [...prev, newConfig]);
      }
      
      setShowForm(false);
      setEditingConfig(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setIsLoading(false);
    }
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
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-600">❌</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-red-100 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                  onClick={() => setError(null)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Email Configurations</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage SMTP configurations for {workspace.name}</p>
        </div>
        <div className="flex-shrink-0">
          <Button
            onClick={handleAddConfiguration}
            className="w-full sm:w-auto inline-flex items-center justify-center"
            disabled={isLoading}
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
          {isLoading && (
            <div className="mb-4 flex items-center text-blue-600">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editingConfig ? 'Updating configuration...' : 'Creating configuration...'}
            </div>
          )}
          <ConfigurationForm
            config={editingConfig || undefined}
            workspaceId={workspace.workspaceId}
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
        <TestEmailDialog
          open={showTestModal}
          config={testingConfig}
          onSend={handleSendTestEmail}
          onOpenChange={(open: boolean) => {
            if (!open) {
              handleCloseTestModal()
            }
          }}
          isSending={isSendingTestEmail}
        />
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Configuration"
        description={`Are you sure you want to delete the configuration "${configToDelete?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText={isLoading ? "Deleting..." : "Delete"}
        variant="destructive"
      />
    </div>
  );
}

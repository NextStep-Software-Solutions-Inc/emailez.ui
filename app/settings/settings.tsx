import { useState } from 'react';
import { useWorkspace } from '@/lib/contexts/WorkspaceContext';
import { useAuth } from '@clerk/react-router';
import type { CreateWorkspaceCommand } from '@/types/index';
import { Button } from '@/components/ui/button';
import { GeneralTab } from './tabs/GeneralTab';
import { NotificationsTab } from './tabs/NotificationsTab';
import { SecurityTab } from './tabs/SecurityTab';
import { BillingTab } from './tabs/BillingTab';
import { ApiKeysTab } from './tabs/ApiKeysTab';
import { MembersTab } from './tabs/MembersTab';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

export function Settings() {
  const { currentWorkspace, updateWorkspace, isLoading } = useWorkspace();
  const { userId } = useAuth();
 
  if (!currentWorkspace) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No workspace found</p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'billing' | 'apiKeys' | 'members'>('general');
  const [formData, setFormData] = useState({
    id: currentWorkspace.workspaceId || '',
    name: currentWorkspace.name || '',
    domain: currentWorkspace.domain || '',
    contactEmail: '', // This would come from user profile in a real app
    timezone: 'UTC',
    language: 'en',
    emailNotifications: true,
    smsNotifications: false,
    webhookUrl: '',
    twoFactorEnabled: false,
    sessionTimeout: 30,
    apiRateLimit: 1000,
  });

  // Restore tabs variable
  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    // { id: 'notifications', label: 'Notifications', icon: '🔔' },
    // { id: 'security', label: 'Security', icon: '🔒' },
    // { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'apiKeys', label: 'API Keys', icon: '🔑' },
    { id: 'members', label: 'Members', icon: '👥' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workspaceData: CreateWorkspaceCommand = {
      name: formData.name,
      domain: formData.domain,
    };
    toast.promise(
      updateWorkspace(workspaceData),
      {
        loading: 'Saving settings...',
        success: 'Settings updated successfully!',
        error: 'Failed to update settings. Please try again.',
      }
    );
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              variant="ghost"
              className={`py-2 px-1 border-b-2 font-medium text-sm h-auto rounded-none ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className="mb-6 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm">
          <div className="flex-1">
            <div className="text-xs font-semibold text-gray-500 mb-1">Your User ID</div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded border border-gray-300 text-gray-700 select-all">
                {userId}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:bg-green-200 transition"
                onClick={() => {
                  navigator.clipboard.writeText(userId as string);
                  toast.success('User ID copied!');
                }}
                aria-label="Copy User ID"
              >
                <Copy/>
              </Button>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1 md:mt-0">
            Use this ID for support or API access.
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <GeneralTab formData={formData} handleInputChange={handleInputChange} />
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <NotificationsTab formData={formData} handleInputChange={handleInputChange} />
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <SecurityTab formData={formData} handleInputChange={handleInputChange} />
        )}

        {/* Save Button */}
        {
          ["general", "notifications", "security"].includes(activeTab) &&
          <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
        }
      </form>
       

        {/* Billing Settings */}
        {activeTab === 'billing' && (
          <BillingTab />
        )}

        {/* API Key Management */}
        {activeTab === 'apiKeys' && userId && (
          <ApiKeysTab workspaceId={currentWorkspace.workspaceId} userId={userId} />
        )}

        {/* Membership Management */}
        {activeTab === 'members' && (
          <MembersTab workspaceId={currentWorkspace.workspaceId} />
        )}
    </div>
  );
}

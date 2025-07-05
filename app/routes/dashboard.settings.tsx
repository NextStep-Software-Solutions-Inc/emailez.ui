import { useState } from 'react';
import { useUser } from '@clerk/react-router';
import { cn } from '../../lib/utils';

// Mock data for settings
const mockOrganization = {
  name: "Acme Corp",
  domain: "acme.com",
  plan: "Pro",
  billingEmail: "billing@acme.com",
  timezone: "America/New_York"
};

const mockNotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  webhookNotifications: true,
  deliveryReports: true,
  bounceAlerts: true,
  failureAlerts: true
};

const mockApiSettings = {
  apiKey: "ez_live_1234567890abcdef",
  webhookUrl: "https://api.acme.com/webhooks/email",
  rateLimitPerMinute: 1000,
  callbackUrl: "https://app.acme.com/callback"
};

export default function DashboardSettings() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('organization');
  const [orgSettings, setOrgSettings] = useState(mockOrganization);
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [apiSettings, setApiSettings] = useState(mockApiSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message (in a real app, you'd use a toast/notification)
    alert(`${section} settings saved successfully!`);
  };

  const tabs = [
    { id: 'organization', label: 'Organization', icon: '🏢' },
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'api', label: 'API Settings', icon: '⚙️' }
  ];

  const TabButton = ({ tab, isActive, onClick }: { 
    tab: typeof tabs[0]; 
    isActive: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-blue-50 text-blue-700 border border-blue-200"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      <span>{tab.icon}</span>
      <span className="font-medium">{tab.label}</span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your organization, account, and system preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'organization' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgSettings.name}
                  onChange={(e) => setOrgSettings({ ...orgSettings, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <input
                  type="text"
                  value={orgSettings.domain}
                  onChange={(e) => setOrgSettings({ ...orgSettings, domain: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Email
                </label>
                <input
                  type="email"
                  value={orgSettings.billingEmail}
                  onChange={(e) => setOrgSettings({ ...orgSettings, billingEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={orgSettings.timezone}
                  onChange={(e) => setOrgSettings({ ...orgSettings, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => handleSave('Organization')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.emailAddresses[0]?.emailAddress || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Created
                </label>
                <input
                  type="text"
                  value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-600">
                  Account information is managed through your authentication provider. 
                  Use the user menu to update your profile.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {key === 'emailNotifications' && 'Receive email notifications for important events'}
                      {key === 'smsNotifications' && 'Receive SMS notifications for critical alerts'}
                      {key === 'webhookNotifications' && 'Send webhook notifications to your endpoints'}
                      {key === 'deliveryReports' && 'Get notified when emails are delivered'}
                      {key === 'bounceAlerts' && 'Get alerts when emails bounce'}
                      {key === 'failureAlerts' && 'Get alerts when email sending fails'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        [key]: e.target.checked
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => handleSave('Notification')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">API Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value={apiSettings.apiKey}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Copy
                  </button>
                  <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Regenerate
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={apiSettings.webhookUrl}
                  onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Limit (per minute)
                </label>
                <input
                  type="number"
                  value={apiSettings.rateLimitPerMinute}
                  onChange={(e) => setApiSettings({ ...apiSettings, rateLimitPerMinute: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Callback URL
                </label>
                <input
                  type="url"
                  value={apiSettings.callbackUrl}
                  onChange={(e) => setApiSettings({ ...apiSettings, callbackUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={() => handleSave('API')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useUser } from '@clerk/react-router';

export function meta() {
  return [
    { title: "Settings - Email EZ" },
    { name: "description", content: "Manage your account and application settings" },
  ];
}

export default function DashboardSettings() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Settings
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Account Information
            </h3>
            <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Update your account details and profile information.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={user?.firstName || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={user?.lastName || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Email Address
              </label>
              <input
                type="email"
                value={user?.emailAddresses[0]?.emailAddress || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Account information is managed through your authentication provider.
              </p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Email Preferences
            </h3>
            <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Configure how you receive notifications and updates.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Email Notifications
                </div>
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Receive notifications about email delivery status
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Weekly Reports
                </div>
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Receive weekly email analytics reports
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Security Alerts
                </div>
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Receive alerts about account security events
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              API Settings
            </h3>
            <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Manage your API keys and access tokens.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  API Key
                </div>
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Use this key to authenticate API requests
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Generate API Key
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                No API key generated yet
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Generate an API key to start using the Email EZ API
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow-sm border border-red-200">
          <div className="px-6 py-4 border-b border-red-200">
            <h3 className="text-lg font-semibold text-red-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Danger Zone
            </h3>
            <p className="text-sm text-red-600 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Irreversible and destructive actions.
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Delete Account
                </div>
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Permanently delete your account and all associated data
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

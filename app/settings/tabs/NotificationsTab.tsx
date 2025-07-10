import React from 'react';

export function NotificationsTab({ formData, handleInputChange }: {
  formData: any;
  handleInputChange: (field: string, value: string | boolean | number) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
              Email Notifications
            </label>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            id="emailNotifications"
            checked={formData.emailNotifications}
            onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700">
              SMS Notifications
            </label>
            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
          </div>
          <input
            type="checkbox"
            id="smsNotifications"
            checked={formData.smsNotifications}
            onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">
            Webhook URL
          </label>
          <input
            type="url"
            id="webhookUrl"
            value={formData.webhookUrl}
            onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
            placeholder="https://your-app.com/webhook"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            We'll send email events to this URL
          </p>
        </div>
      </div>
    </div>
  );
}

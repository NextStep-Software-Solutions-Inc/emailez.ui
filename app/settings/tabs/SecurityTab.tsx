import React from 'react';

export function SecurityTab({ formData, handleInputChange }: {
  formData: any;
  handleInputChange: (field: string, value: string | boolean | number) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="twoFactorEnabled" className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </label>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <input
            type="checkbox"
            id="twoFactorEnabled"
            checked={formData.twoFactorEnabled}
            onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            id="sessionTimeout"
            value={formData.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="480"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="apiRateLimit" className="block text-sm font-medium text-gray-700">
            API Rate Limit (requests per hour)
          </label>
          <input
            type="number"
            id="apiRateLimit"
            value={formData.apiRateLimit}
            onChange={(e) => handleInputChange('apiRateLimit', parseInt(e.target.value))}
            min="100"
            max="10000"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

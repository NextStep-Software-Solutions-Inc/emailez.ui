import React from 'react';
import { Button } from '@/components/ui/button';

export function BillingTab() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Settings</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900">Current Plan</h3>
          <p className="text-sm text-blue-700">Professional - $29/month</p>
          <p className="text-sm text-blue-700">10,000 emails/month included</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Usage This Month</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Emails sent</span>
            <span className="text-sm font-medium">1,247 / 10,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12.47%' }}></div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <Button type="button" variant="outline">
            View Billing History
          </Button>
        </div>
      </div>
    </div>
  );
}

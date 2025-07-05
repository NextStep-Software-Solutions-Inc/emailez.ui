import { useState } from 'react';
import { cn } from '../../lib/utils';

// Mock data for analytics
const mockAnalytics = {
  emailsSent: 12543,
  emailsDelivered: 12187,
  emailsOpened: 8934,
  emailsClicked: 2187,
  deliveryRate: 97.2,
  openRate: 73.3,
  clickRate: 24.5,
  bounceRate: 2.8,
  recentActivity: [
    { date: '2024-01-15', emails: 245, delivered: 238, opened: 179, clicked: 43 },
    { date: '2024-01-14', emails: 312, delivered: 304, opened: 223, clicked: 67 },
    { date: '2024-01-13', emails: 189, delivered: 185, opened: 134, clicked: 28 },
    { date: '2024-01-12', emails: 278, delivered: 270, opened: 198, clicked: 51 },
    { date: '2024-01-11', emails: 156, delivered: 152, opened: 112, clicked: 24 },
    { date: '2024-01-10', emails: 234, delivered: 227, opened: 167, clicked: 39 },
    { date: '2024-01-09', emails: 198, delivered: 193, opened: 141, clicked: 31 },
  ]
};

export default function DashboardAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const StatCard = ({ title, value, change, changeType, icon }: {
    title: string;
    value: string | number;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={cn(
          "text-sm font-medium",
          changeType === 'increase' ? "text-green-600" : 
          changeType === 'decrease' ? "text-red-600" : "text-gray-600"
        )}>
          {changeType === 'increase' && '+'}
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last period</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track your email performance and engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Emails Sent"
          value={mockAnalytics.emailsSent.toLocaleString()}
          change="12.5%"
          changeType="increase"
          icon="📧"
        />
        <StatCard
          title="Delivery Rate"
          value={`${mockAnalytics.deliveryRate}%`}
          change="0.3%"
          changeType="increase"
          icon="✅"
        />
        <StatCard
          title="Open Rate"
          value={`${mockAnalytics.openRate}%`}
          change="2.1%"
          changeType="increase"
          icon="👁️"
        />
        <StatCard
          title="Click Rate"
          value={`${mockAnalytics.clickRate}%`}
          change="5.7%"
          changeType="increase"
          icon="🔗"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Volume Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Volume</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {mockAnalytics.recentActivity.map((day, index) => (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-sm"
                  style={{ height: `${(day.emails / 350) * 100}%` }}
                />
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45">
                  {day.date.split('-')[2]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivered</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${mockAnalytics.deliveryRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{mockAnalytics.deliveryRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Opened</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${mockAnalytics.openRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{mockAnalytics.openRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Clicked</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${mockAnalytics.clickRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{mockAnalytics.clickRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bounced</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${mockAnalytics.bounceRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{mockAnalytics.bounceRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emails Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAnalytics.recentActivity.map((activity) => (
                <tr key={activity.date} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(activity.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.emails}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.delivered}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.opened}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.clicked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((activity.opened / activity.emails) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

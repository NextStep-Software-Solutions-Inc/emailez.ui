import { useState } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Workspace } from '@/types/workspace.types';
import type { DetailedAnalytics } from '@/lib/services/analytics-api';

interface AnalyticsProps {
  workspace: Workspace;
  analytics: DetailedAnalytics | null;
}

export function Analytics({ workspace, analytics }: AnalyticsProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Show demo data message when no real analytics API is available
  const showDemoData = !analytics;
  
  // Use real analytics data or fallback to demo data for development
  const analyticsData = analytics || {
    totalEmails: 1247,
    sentEmails: 1205,
    failedEmails: 42,
    queuedEmails: 0,
    deliveryRate: 96.6,
    successRate: 96.6,
    openRate: 24.3,
    clickRate: 3.2,
    bounceRate: 2.1,
    unsubscribeRate: 0.8,
    trend: []
  };

  // Use real chart data from analytics trend or fallback to demo data
  const getChartData = () => {
    if (analytics?.trend && analytics.trend.length > 0) {
      // Use real trend data from the API
      return analytics.trend.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        sent: item.sent,
        failed: item.failed
      }));
    }

    // Fallback to demo data for development (when no API is available)
    const demoData = {
      '7d': [
        { date: 'Dec 30', sent: 45, failed: 2 },
        { date: 'Dec 31', sent: 38, failed: 1 },
        { date: 'Jan 1', sent: 52, failed: 3 },
        { date: 'Jan 2', sent: 67, failed: 2 },
        { date: 'Jan 3', sent: 89, failed: 4 },
        { date: 'Jan 4', sent: 73, failed: 1 },
        { date: 'Jan 5', sent: 91, failed: 5 },
      ],
      '30d': [
        { date: 'Dec 7', sent: 145, failed: 8 },
        { date: 'Dec 14', sent: 162, failed: 12 },
        { date: 'Dec 21', sent: 178, failed: 6 },
        { date: 'Dec 28', sent: 134, failed: 9 },
        { date: 'Jan 4', sent: 189, failed: 7 },
      ],
      '90d': [
        { date: 'Oct 7', sent: 421, failed: 23 },
        { date: 'Oct 21', sent: 387, failed: 18 },
        { date: 'Nov 4', sent: 456, failed: 31 },
        { date: 'Nov 18', sent: 398, failed: 15 },
        { date: 'Dec 2', sent: 512, failed: 28 },
        { date: 'Dec 16', sent: 467, failed: 19 },
        { date: 'Dec 30', sent: 523, failed: 22 },
      ],
    };
    return demoData[selectedTimeRange];
  };

  const chartData = getChartData();

  // Chart configuration for ShadCN/UI
  const chartConfig = {
    sent: {
      label: 'Sent Emails',
      color: 'hsl(var(--chart-1))',
    },
    failed: {
      label: 'Failed Emails',
      color: 'hsl(var(--chart-2))',
    },
  };

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Email performance metrics for {workspace.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="timeRange" className="text-sm font-medium text-gray-700">
            Time Range:
          </label>
          <select
            id="timeRange"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Demo Data Notice */}
      {showDemoData && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Demo Data:</strong> Analytics API is not yet available. The data shown below is for demonstration purposes only.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Emails</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalEmails.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sent Successfully</p>
              <p className="text-2xl font-bold text-green-600">{analyticsData.sentEmails.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{analyticsData.failedEmails.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Queued</p>
              <p className="text-2xl font-bold text-yellow-600">{analyticsData.queuedEmails.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Rate Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Rate</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsData.deliveryRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-600 mt-1">
              Success Rate: {analyticsData.successRate.toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-purple-100 rounded-full">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {analyticsData.openRate ? `${analyticsData.openRate}%` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Open Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {analyticsData.clickRate ? `${analyticsData.clickRate}%` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Click Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {analyticsData.bounceRate ? `${analyticsData.bounceRate}%` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Bounce Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {analyticsData.unsubscribeRate ? `${analyticsData.unsubscribeRate}%` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Unsubscribe Rate</p>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Volume Over Time</h2>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
        
        {/* Chart Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-blue-500"></div>
              <span className="text-sm text-gray-600">Sent Emails</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-red-500" style={{ borderTop: '2px dashed #ef4444' }}></div>
              <span className="text-sm text-gray-600">Failed Emails</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">
              Total Sent: <span className="font-semibold text-blue-600">{chartData.reduce((sum, d) => sum + d.sent, 0)}</span>
            </span>
            <span className="text-gray-600">
              Total Failed: <span className="font-semibold text-red-600">{chartData.reduce((sum, d) => sum + d.failed, 0)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Recent Performance Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Performance</h2>
        <div className="space-y-3">
          {analyticsData.trend && analyticsData.trend.length > 0 ? (
            analyticsData.trend.slice(-3).reverse().map((item, index) => {
              const date = new Date(item.date);
              const deliveryRate = item.sent > 0 ? ((item.sent / (item.sent + item.failed)) * 100).toFixed(1) : '0.0';
              const dateLabel = index === 0 ? 'Recent' : 
                               index === 1 ? 'Previous' : 
                               date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              return (
                <div key={item.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{dateLabel}</p>
                    <p className="text-sm text-gray-600">{item.sent} emails sent</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{deliveryRate}% delivery rate</p>
                    <p className="text-sm text-gray-600">{item.failed} failed</p>
                  </div>
                </div>
              );
            })
          ) : (
            // Show demo recent performance data
            <>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Today</p>
                  <p className="text-sm text-gray-600">47 emails sent</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">97.9% delivery rate</p>
                  <p className="text-sm text-gray-600">1 failed</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Yesterday</p>
                  <p className="text-sm text-gray-600">89 emails sent</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">95.5% delivery rate</p>
                  <p className="text-sm text-gray-600">4 failed</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Last 7 days</p>
                  <p className="text-sm text-gray-600">432 emails sent</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">96.3% delivery rate</p>
                  <p className="text-sm text-gray-600">16 failed</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function meta() {
  return [
    { title: "Analytics - Email EZ" },
    { name: "description", content: "View email analytics and performance metrics" },
  ];
}

export default function DashboardAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Analytics
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Track your email performance and delivery metrics.
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Time Range:
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Nunito, sans-serif' }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Total Sent
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            0
          </div>
          <div className="text-sm text-green-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            +0% from last period
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Delivered
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            0
          </div>
          <div className="text-sm text-blue-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            +0% from last period
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Bounced
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            0
          </div>
          <div className="text-sm text-red-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            +0% from last period
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Delivery Rate
            </div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            0%
          </div>
          <div className="text-sm text-purple-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            +0% from last period
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Email Volume
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Chart placeholder - No data available
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Delivery Performance
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Chart placeholder - No data available
          </div>
        </div>
      </div>
    </div>
  );
}

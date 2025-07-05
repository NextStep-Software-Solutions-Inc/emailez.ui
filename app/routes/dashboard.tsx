import { useUser } from '@clerk/react-router';

export function meta() {
  return [
    { title: "Dashboard - Email EZ" },
    { name: "description", content: "Manage your email configurations and analytics" },
  ];
}

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Welcome back, {user?.firstName || 'User'}! Here's your email service overview.
        </p>
      </div>

      {/* Stats Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder stat cards */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Total Emails Sent
            </div>
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              --
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Active Configurations
            </div>
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              --
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Success Rate
            </div>
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              --%
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              This Month
            </div>
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              --
            </div>
          </div>
        </div>
      </section>

      {/* Email Configurations Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Email Configurations
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Add Configuration
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 text-center text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
            No configurations yet. Add your first SMTP configuration to get started.
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 text-center text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
            No recent activity to display.
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Analytics
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 text-center text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Analytics charts will appear here.
          </div>
        </div>
      </section>
    </div>
  );
}

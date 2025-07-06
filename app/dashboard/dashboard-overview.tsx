import { useUser } from '@clerk/react-router';
import { Link } from 'react-router';
import type { EmailDto, EmailConfiguration, Workspace } from '@/types/index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardOverviewProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  recentEmails: EmailDto[];
  emailConfigurations: EmailConfiguration[];
}

export function DashboardOverview({ 
  workspaces, 
  currentWorkspace, 
  recentEmails, 
  emailConfigurations 
}: DashboardOverviewProps) {
  const { user } = useUser();

  if (!currentWorkspace) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No workspace found</p>
      </div>
    );
  }

  // Calculate basic stats from email data
  const totalEmails = recentEmails.length;
  const sentEmails = recentEmails.filter(email => email.status === 'Sent').length;
  const failedEmails = recentEmails.filter(email => email.status === 'Failed').length;
  const queuedEmails = recentEmails.filter(email => email.status === 'Queued').length;
  
  const successRate = totalEmails > 0 ? Math.round((sentEmails / totalEmails) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back, {user?.firstName || 'User'}! Here's your {currentWorkspace.name} overview.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            currentWorkspace.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {currentWorkspace.isActive ? 'Active' : 'Inactive'}
          </span>
          <div className="flex space-x-2">
            <Button 
              asChild
              className="w-full sm:w-auto"
            >
              <Link to={`/workspace/${currentWorkspace.workspaceId}/compose`}>
                ✉️ Compose Email
              </Link>
            </Button>
            <Button 
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to={`/workspace/${currentWorkspace.workspaceId}/configurations`}>
                ⚙️ Manage Configs
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">📧</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Emails</p>
                <p className="text-2xl font-bold text-gray-900">{totalEmails}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sent</p>
                <p className="text-2xl font-bold text-gray-900">{sentEmails}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-600 font-medium">+12%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-lg">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Queued</p>
                <p className="text-2xl font-bold text-gray-900">{queuedEmails}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Processing</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-red-600 text-lg">❌</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{failedEmails}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-red-600 font-medium">-5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Rate and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Success Rate
          </h3>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div 
                className={cn(
                  "h-4 rounded-full transition-all duration-300",
                  successRate >= 90 ? "bg-green-500" : successRate >= 70 ? "bg-yellow-500" : "bg-red-500"
                )}
                style={{ width: `${successRate}%` }}
              />
            </div>
            <span className="ml-4 text-3xl font-bold text-gray-900">{successRate}%</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {successRate >= 90 ? "Excellent delivery rate!" : successRate >= 70 ? "Good performance" : "Needs attention"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button 
              asChild 
              variant="outline" 
              className="w-full justify-start"
            >
              <Link to={`/workspace/${currentWorkspace.workspaceId}/compose`}>
                <span className="mr-2">✉️</span>
                Send Email
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="w-full justify-start"
            >
              <Link to={`/workspace/${currentWorkspace.workspaceId}/configurations`}>
                <span className="mr-2">⚙️</span>
                Add Configuration
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="w-full justify-start"
            >
              <Link to={`/workspace/${currentWorkspace.workspaceId}/analytics`}>
                <span className="mr-2">📊</span>
                View Analytics
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Emails */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-3 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Recent Emails
            </h3>
            <Button 
              asChild 
              variant="link" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium self-start sm:self-auto p-0"
            >
              <Link to={`/workspace/${currentWorkspace.workspaceId}/activity`}>
                View all →
              </Link>
            </Button>
          </div>
        </div>
        
        {recentEmails.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-400">📧</span>
            </div>
            <p className="text-gray-500 mb-4">No emails sent yet</p>
            <Button asChild>
              <Link to={`/workspace/${currentWorkspace.workspaceId}/compose`}>
                Send your first email
              </Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentEmails.map((email) => (
              <div key={email.id} className="px-3 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium self-start",
                        email.status === 'Sent' 
                          ? 'bg-green-100 text-green-800'
                          : email.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      )}>
                        {email.status === 'Sent' ? '✅' : email.status === 'Failed' ? '❌' : '⏳'}
                        <span className="ml-1">{email.status}</span>
                      </span>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {email.subject}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <span className="truncate">To: {email.toAddresses?.[0]}</span>
                      <span className="truncate">From: {email.fromAddress}</span>
                      <span className="whitespace-nowrap">
                        {new Date(email.queuedAt).toLocaleDateString()} at{' '}
                        {new Date(email.queuedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    {email.bodySnippet && (
                      <p className="text-sm text-gray-600 truncate">
                        {email.bodySnippet}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                    {email.errorMessage && (
                      <span className="text-xs text-red-600 break-words sm:truncate max-w-xs" title={email.errorMessage}>
                        Error: {email.errorMessage}
                      </span>
                    )}
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap p-0 h-auto"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email Configurations Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Email Configurations
          </h3>
          <Button 
            asChild 
            variant="link" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium p-0"
          >
            <Link to={`/workspace/${currentWorkspace.workspaceId}/configurations`}>
              Manage →
            </Link>
          </Button>
        </div>
        
        {emailConfigurations.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-400">⚙️</span>
            </div>
            <p className="text-gray-500 mb-4">No email configurations set up yet</p>
            <Button asChild>
              <Link to={`/workspace/${currentWorkspace.workspaceId}/configurations`}>
                Add your first configuration
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {emailConfigurations.map((config) => (
              <div key={config.emailConfigurationId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {config.displayName?.charAt(0).toUpperCase() || 'C'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{config.displayName}</p>
                    <p className="text-sm text-gray-600">{config.fromEmail} via {config.smtpHost}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded font-medium">
                    ✅ Active
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    asChild
                  >
                    <Link to={`/workspace/${currentWorkspace.workspaceId}/configurations`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

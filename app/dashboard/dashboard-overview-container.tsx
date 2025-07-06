import { useEffect, useState } from 'react';
import { useWorkspace } from '@/lib/contexts/WorkspaceContext';
import { getDashboardData } from '@/lib/data/dashboardData';
import { DashboardOverview } from './dashboard-overview';
import type { EmailDto, EmailConfiguration } from '@/types/index';
import { Button } from '@/components/ui/button';

export function DashboardOverviewContainer() {
  const { currentWorkspace } = useWorkspace();
  const [recentEmails, setRecentEmails] = useState<EmailDto[]>([]);
  const [emailConfigurations, setEmailConfigurations] = useState<EmailConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!currentWorkspace) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getDashboardData(currentWorkspace.workspaceId);
        setRecentEmails(data.recentEmails);
        setEmailConfigurations(data.emailConfigurations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentWorkspace]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-semibold">Error loading dashboard</p>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <DashboardOverview
      recentEmails={recentEmails}
      emailConfigurations={emailConfigurations}
    />
  );
}

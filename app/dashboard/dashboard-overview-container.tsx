import { DashboardOverview } from './dashboard-overview';
import type { EmailDto, EmailConfiguration, Workspace } from '@/types/index';

interface DashboardOverviewContainerProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  recentEmails: EmailDto[];
  emailConfigurations: EmailConfiguration[];
}

export function DashboardOverviewContainer({ 
  workspaces, 
  currentWorkspace, 
  recentEmails, 
  emailConfigurations 
}: DashboardOverviewContainerProps) {
  console.log('DashboardOverviewContainer received:', {
    workspaces: workspaces?.length || 0,
    currentWorkspace: currentWorkspace?.name,
    recentEmails: recentEmails?.length || 0,
    emailConfigurations: emailConfigurations?.length || 0
  });

  // Loading state for when workspace is being fetched
  if (!currentWorkspace && workspaces.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DashboardOverview
      workspaces={workspaces}
      currentWorkspace={currentWorkspace}
      recentEmails={recentEmails}
      emailConfigurations={emailConfigurations}
    />
  );
}

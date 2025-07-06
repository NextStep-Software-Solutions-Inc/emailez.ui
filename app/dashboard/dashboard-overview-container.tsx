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

  // No need for loading state since data comes from loader
  return (
    <DashboardOverview
      workspaces={workspaces}
      currentWorkspace={currentWorkspace}
      recentEmails={recentEmails}
      emailConfigurations={emailConfigurations}
    />
  );
}

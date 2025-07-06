import { HttpClient, workspaceApi, emailConfigApi, emailApi } from "@/lib/services";
import type { Route } from "./+types/index";
import { DashboardOverviewContainer } from "@/dashboard/dashboard-overview-container";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Dashboard - Email EZ" },
    { name: "description", content: "Multi-workspace email service dashboard overview" },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = HttpClient.getTokenFromRequest(request);
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const { workspaceId } = params;
  if (!workspaceId) {
    throw new Response("Workspace ID is required", { status: 400 });
  }

  try {
    // Set the token for API calls
    workspaceApi.setAuthToken(token);
    emailApi.setAuthToken(token);
    emailConfigApi.setAuthToken(token);
    
    // Fetch workspaces first to validate the workspace exists
    const workspaces = await workspaceApi.getUserWorkspaces();
    
    if (!workspaces || workspaces.length === 0) {
      return {
        workspaces: [],
        currentWorkspace: null,
        recentEmails: [],
        emailConfigurations: [],
        error: 'No workspaces found'
      };
    }

    // Find the current workspace from URL params
    const currentWorkspace = workspaces.find(w => w.workspaceId === workspaceId);
    if (!currentWorkspace) {
      // Workspace not found, redirect to first available workspace
      const firstWorkspace = workspaces[0];
      throw new Response("", {
        status: 302,
        headers: {
          Location: `/workspace/${firstWorkspace.workspaceId}`
        }
      });
    }
    
    // Fetch dashboard data in parallel
    const [recentEmailsResult, emailConfigsResult] = await Promise.allSettled([
      // Get recent emails for the workspace
      emailApi.getEmailsForWorkspace(currentWorkspace.workspaceId, { 
        pageNumber: 1, 
        pageSize: 10 
      }),
      // Get email configurations for the workspace
      emailConfigApi.getAllEmailConfigurations(currentWorkspace.workspaceId)
    ]);

    // Extract results with fallbacks
    const recentEmails = recentEmailsResult.status === 'fulfilled' 
      ? recentEmailsResult.value.items || []
      : [];
      
    const emailConfigurations = emailConfigsResult.status === 'fulfilled'
      ? emailConfigsResult.value
      : [];

    return {
      workspaces,
      currentWorkspace,
      recentEmails,
      emailConfigurations,
    };

  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirects
    }
    console.error('Dashboard loader error:', error);
    return {
      workspaces: [],
      currentWorkspace: null,
      recentEmails: [],
      emailConfigurations: [],
      error: error instanceof Error ? error.message : 'Failed to load dashboard data'
    };
  }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  console.log('Dashboard component received loader data:', loaderData);
  
  if ('error' in loaderData && loaderData.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {loaderData.error}</p>
      </div>
    );
  }
  
  return (
    <DashboardOverviewContainer 
      workspaces={loaderData.workspaces}
      currentWorkspace={loaderData.currentWorkspace}
      recentEmails={loaderData.recentEmails}
      emailConfigurations={loaderData.emailConfigurations}
    />
  );
}

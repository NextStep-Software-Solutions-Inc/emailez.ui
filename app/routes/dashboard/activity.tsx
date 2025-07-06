import type { Route } from "./+types/activity";
import { Activity } from "@/activity/activity";
import { HttpClient, workspaceApi, emailApi } from "@/lib/services";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Activity - Email EZ" },
    { name: "description", content: "View recent email activity and logs" },
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
    
    // Fetch workspace and emails data in parallel
    const [workspaces, emailsData] = await Promise.allSettled([
      workspaceApi.getUserWorkspaces(),
      emailApi.getEmailsForWorkspace(workspaceId, { 
        pageNumber: 1, 
        pageSize: 50, 
        sortOrder: 'desc' 
      })
    ]);

    const userWorkspaces = workspaces.status === 'fulfilled' ? workspaces.value : [];
    const currentWorkspace = userWorkspaces.find(w => w.workspaceId === workspaceId);
    
    if (!currentWorkspace) {
      throw new Response("Workspace not found", { status: 404 });
    }

    const emails = emailsData.status === 'fulfilled' ? emailsData.value : null;

    return {
      workspace: currentWorkspace,
      emails,
    };

  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error('Activity loader error:', error);
    return {
      workspace: null,
      emails: null,
      error: error instanceof Error ? error.message : 'Failed to load activity data'
    };
  }
}

export default function DashboardActivity({ loaderData }: Route.ComponentProps) {
  if ('error' in loaderData && loaderData.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {loaderData.error}</p>
      </div>
    );
  }

  if (!loaderData.workspace) {
    return <div>Loading...</div>;
  }
  
  return <Activity workspace={loaderData.workspace} emails={loaderData.emails} />;
}


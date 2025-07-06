import { Analytics } from "@/analytics/analytics";
import { HttpClient, workspaceApi } from "@/lib/services";
import type { Route } from "./+types/analytics";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Analytics - Email EZ" },
    { name: "description", content: "Email analytics and performance metrics" },
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
    
    // Fetch workspace data
    const userWorkspaces = await workspaceApi.getUserWorkspaces();
    const currentWorkspace = userWorkspaces.find(w => w.workspaceId === workspaceId);
    
    if (!currentWorkspace) {
      throw new Response("Workspace not found", { status: 404 });
    }

    // TODO: Replace with real analytics API when available
    // For now, return null to indicate no analytics data
    const analytics = null;

    return {
      workspace: currentWorkspace,
      analytics,
    };

  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error('Analytics loader error:', error);
    return {
      workspace: null,
      analytics: null,
      error: error instanceof Error ? error.message : 'Failed to load analytics data'
    };
  }
}

export default function AnalyticsRoute({ loaderData }: Route.ComponentProps) {
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
  
  return <Analytics workspace={loaderData.workspace} analytics={loaderData.analytics} />;
}

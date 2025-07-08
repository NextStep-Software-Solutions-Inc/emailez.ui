import { Analytics } from "@/analytics/analytics";
import { HttpClient, workspaceApi } from "@/lib/services";
import type { Route } from "./+types/analytics";
import { useLocation, useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
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
    const url = new URL(request.url);
    const daysBack = url.searchParams.get("days") || "30";
    const analytics = await workspaceApi.getWorkspaceAnalytics(workspaceId, { daysBack });

    return {
      analytics,
    };

  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error('Analytics loader error:', error);
    return {
      analytics: null,
      error: error instanceof Error ? error.message : 'Failed to load analytics data'
    };
  }
}

export default function AnalyticsRoute({ loaderData }: Route.ComponentProps) {
   const navigate = useNavigate();
  const location = useLocation();
  if ('error' in loaderData && loaderData.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {loaderData.error}</p>
      </div>
    );
  }

  if (!loaderData.analytics) {
    return <div>Loading...</div>;
  }
  
   const daysBack = (days: number) => {
    const params = new URLSearchParams(location.search);
    params.set("days", String(days));
    navigate(`${location.pathname}?${params.toString()}`, { replace: false });
    // This will re-run the loader with the new ?days= param
  };

  return <Analytics analytics={loaderData.analytics} daysBack={daysBack} />;
}

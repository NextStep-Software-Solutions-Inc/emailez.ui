import { redirect } from 'react-router';
import { HttpClient, workspaceApi } from '@/lib/services';
import type { Route } from './+types/dashboard-redirect';

export async function loader({ request }: Route.LoaderArgs) {
  const token = HttpClient.getTokenFromRequest(request);
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  try {
    // Set the token for API calls
    workspaceApi.setAuthToken(token);
    
    // Fetch user workspaces
    const workspaces = await workspaceApi.getUserWorkspaces();
    if (!workspaces || workspaces.length === 0) {
      // No workspaces found, redirect to onboarding
      throw redirect('/onboarding');
    }

    // For now, always redirect to the first workspace
    // The workspace context will handle remembering the user's preference on the client side
    const targetWorkspace = workspaces[0];
    console.log({ workspaces, targetWorkspace });

    // Redirect to workspace-specific dashboard
    throw redirect(`/workspace/${targetWorkspace.workspaceId}`);
    
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirects
    }
    console.error('Dashboard redirect error:', error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export default function DashboardRedirect() {
  // This component should never render as the loader always redirects
  return null;
}

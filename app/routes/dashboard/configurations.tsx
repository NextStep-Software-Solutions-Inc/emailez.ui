import { Configurations } from "@/configurations/configurations";
import { HttpClient, workspaceApi, emailConfigApi } from "@/lib/services";
import type { Route } from "./+types/configurations";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Configurations - Email EZ" },
    { name: "description", content: "Manage email configurations and SMTP settings" },
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
    emailConfigApi.setAuthToken(token);
    
    // Fetch workspace and configurations in parallel
    const [workspaces, configurations] = await Promise.allSettled([
      workspaceApi.getUserWorkspaces(),
      emailConfigApi.getAllEmailConfigurations(workspaceId)
    ]);

    const userWorkspaces = workspaces.status === 'fulfilled' ? workspaces.value : [];
    const currentWorkspace = userWorkspaces.find(w => w.workspaceId === workspaceId);
    
    if (!currentWorkspace) {
      throw new Response("Workspace not found", { status: 404 });
    }

    const emailConfigurations = configurations.status === 'fulfilled' ? configurations.value : [];

    return {
      workspace: currentWorkspace,
      configurations: emailConfigurations,
    };

  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error('Configurations loader error:', error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}

export default function ConfigurationsRoute({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <div>Loading...</div>;
  }

  return <Configurations workspace={loaderData.workspace} configurations={loaderData.configurations} />;
}

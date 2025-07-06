import { HttpClient, workspaceApi } from "@/lib/services";
import type { Route } from "./+types/index";
import { DashboardOverviewContainer } from "@/dashboard/dashboard-overview-container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Email EZ" },
    { name: "description", content: "Multi-workspace email service dashboard overview" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = HttpClient.getTokenFromRequest(request);
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return {};
}
export default function Dashboard({loaderData}: Route.ComponentProps) {
  return <DashboardOverviewContainer />;
}

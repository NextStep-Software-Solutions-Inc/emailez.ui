import { Analytics } from "@/analytics/analytics";
import { getDashboardData } from "@/lib/data/dashboardData";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics - Email EZ" },
    { name: "description", content: "Email analytics and performance metrics" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // This would normally fetch analytics data from an API
  const data = await getDashboardData();
  return { tenant: data.tenant };
}

export default function AnalyticsRoute({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <div>Loading...</div>;
  }
  
  return <Analytics tenant={loaderData.tenant} />;
}

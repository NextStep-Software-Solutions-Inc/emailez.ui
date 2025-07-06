import type { Route } from "./+types/index";
import { DashboardOverview } from "@/dashboard/dashboard-overview";
import { getDashboardData } from "@/lib/data/dashboardData";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Email EZ" },
    { name: "description", content: "Multi-tenant email service dashboard overview" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // This would normally fetch from an API
  const data = await getDashboardData();
  return data;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { tenant, recentEmails, emailConfigurations } = loaderData;
  
  return (
    <DashboardOverview 
      tenant={tenant}
      recentEmails={recentEmails}
      emailConfigurations={emailConfigurations}
    />
  );
}

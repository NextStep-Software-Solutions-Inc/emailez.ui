import { Settings } from "@/settings/settings";
import { getDashboardData } from "@/lib/data/dashboardData";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Email EZ" },
    { name: "description", content: "Account and application settings" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // This would normally fetch user settings from an API
  const data = await getDashboardData();
  return { tenant: data.tenant };
}

export default function SettingsRoute({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <div>Loading...</div>;
  }
  
  return <Settings tenant={loaderData.tenant} />;
}

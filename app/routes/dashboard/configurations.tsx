import { Configurations } from "@/configurations/configurations";
import { getDashboardData } from "@/lib/data/dashboardData";
import type { Route } from "./+types/configurations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configurations - Email EZ" },
    { name: "description", content: "Manage email configurations and SMTP settings" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // This would normally fetch configurations from an API
  const data = await getDashboardData();
  return {
    tenant: data.tenant,
    configurations: data.emailConfigurations,
  };
}

export default function ConfigurationsRoute({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <div>Loading...</div>;
  }

  return <Configurations tenant={loaderData.tenant} configurations={loaderData.configurations} />;
}

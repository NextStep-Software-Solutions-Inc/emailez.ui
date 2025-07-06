import { HttpClient } from "@/lib/services";
import type { Route } from "./+types/index";
import { DashboardOverviewContainer } from "@/dashboard/dashboard-overview-container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Email EZ" },
    { name: "description", content: "Multi-workspace email service dashboard overview" },
  ];
}

export default function Dashboard() {
  return <DashboardOverviewContainer />;
}

import type { Route } from "./+types/activity";
import { Activity } from "@/activity/activity";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Activity - Email EZ" },
    { name: "description", content: "View recent email activity and logs" },
  ];
}

export default function DashboardActivity() {
  return <Activity />;
}


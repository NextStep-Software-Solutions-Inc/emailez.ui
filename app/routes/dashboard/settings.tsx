import { Settings } from "@/settings/settings";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Email EZ" },
    { name: "description", content: "Organization and application settings" },
  ];
}

export default function SettingsRoute() {
  return <Settings />;
}

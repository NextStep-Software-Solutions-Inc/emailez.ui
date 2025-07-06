import type { Route } from "./+types/compose";
import { ComposeEmail } from "@/compose/compose-email";
import { getEmailConfigurations } from "@/lib/data/composeData";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Compose Email - Email EZ" },
    { name: "description", content: "Send emails through your configured SMTP servers" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const configurations = await getEmailConfigurations();
  return { configurations };
}

export default function DashboardCompose({ loaderData }: Route.ComponentProps) {
  const { configurations } = loaderData;
  
  return <ComposeEmail configurations={configurations} />;
}

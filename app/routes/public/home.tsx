import { Welcome } from "@/welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email EZ - Simple, Powerful Email Sending Service" },
    { name: "description", content: "Multi-tenant subscription service for managing SMTP configurations and sending emails effortlessly across all your projects." },
  ];
}

export default function Home() {
  return <Welcome />;
}

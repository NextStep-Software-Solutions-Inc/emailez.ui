import { WorkspaceOnboarding } from "@/onboarding/workspace-onboarding";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/react-router';
import type { Route } from "./+types/onboarding";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onboarding - Email EZ" },
    { name: "description", content: "Set up your workspace to get started" },
  ];
}

export default function OnboardingRoute() {
  return (
    <>
      <SignedIn>
        <WorkspaceOnboarding />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

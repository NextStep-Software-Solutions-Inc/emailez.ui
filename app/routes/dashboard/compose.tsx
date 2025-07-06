import type { Route } from "./+types/compose";
import { ComposeEmail } from "@/compose/compose-email";
import { emailConfigApi } from "@/lib/services/email-config-api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Compose Email - Email EZ" },
    { name: "description", content: "Send emails through your configured SMTP servers" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const workspaceId = params.workspaceId;
  if (!workspaceId) {
    throw new Error("Workspace ID is required");
  }
  
  try {
    const configurations = await emailConfigApi.getAllEmailConfigurations(workspaceId);
    return { configurations, workspaceId };
  } catch (error) {
    console.error('Failed to load email configurations:', error);
    return { configurations: [], workspaceId };
  }
}

export default function DashboardCompose({ loaderData }: Route.ComponentProps) {
  const { configurations, workspaceId } = loaderData;
  
  // Handle case where there are no email configurations
  if (!configurations || configurations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Compose Email
          </h1>
          <p className="text-gray-600 mt-1">
            Send emails through your configured SMTP servers
          </p>
        </div>

        {/* No Configurations Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-amber-800 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                No Email Configurations Found
              </h3>
              <p className="text-amber-700 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                You need to set up at least one email configuration before you can send emails. 
                Email configurations define the SMTP settings for sending emails.
              </p>
              <div className="flex gap-3">
                <a
                  href={`/workspace/${workspaceId}/configurations`}
                  className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Email Configuration
                </a>
                <a
                  href={`/workspace/${workspaceId}`}
                  className="inline-flex items-center px-4 py-2 bg-white text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Back to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return <ComposeEmail configurations={configurations} />;
}

import { useWorkspace } from '@/lib/contexts/WorkspaceContext';
import { useAuth } from '@clerk/react-router';

export function WorkspaceDebugInfo() {
  const { isSignedIn, isLoaded } = useAuth();
  const { 
    currentWorkspace, 
    workspaces, 
    isLoading, 
    error, 
    hasCompletedOnboarding 
  } = useWorkspace();

  if (!isLoaded) {
    return <div>Loading auth...</div>;
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Workspace Debug Info</h3>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Has Completed Onboarding:</strong> {hasCompletedOnboarding ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        <div>
          <strong>Current Workspace:</strong> {currentWorkspace?.name || 'None'}
        </div>
        <div>
          <strong>Total Workspaces:</strong> {workspaces.length}
        </div>
        <div>
          <strong>Workspace List:</strong>
          <ul className="ml-4 mt-1">
            {workspaces.map(workspace => (
              <li key={workspace.workspaceId}>
                {workspace.name} ({workspace.workspaceId}) - {workspace.isActive ? 'Active' : 'Inactive'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

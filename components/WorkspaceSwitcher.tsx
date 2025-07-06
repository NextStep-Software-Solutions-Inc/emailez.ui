import { useState } from 'react';
import { useWorkspace } from '@/lib/contexts/WorkspaceContext';
import { cn } from '@/lib/utils';
import { CreateWorkspaceDialog } from '@/components/dialogs';
import { Button } from '@/components/ui/button';

export function WorkspaceSwitcher() {
  const { 
    currentWorkspace, 
    workspaces, 
    switchWorkspace, 
    isOperationLoading, 
    isSwitchingWorkspace 
  } = useWorkspace();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [switchingToWorkspaceId, setSwitchingToWorkspaceId] = useState<string | null>(null);

  const handleWorkspaceSwitch = async (workspaceId: string) => {
    try {
      setSwitchingToWorkspaceId(workspaceId);
      await switchWorkspace(workspaceId);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to switch workspace:', error);
    } finally {
      setSwitchingToWorkspaceId(null);
    }
  };

  if (!currentWorkspace) return null;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        variant="outline"
        className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors min-w-0 max-w-[280px]"
        disabled={isOperationLoading || isSwitchingWorkspace}
      >
        <div className={cn(
          "w-3 h-3 rounded-full",
          currentWorkspace.isActive ? "bg-green-500" : "bg-red-500"
        )}></div>
        <span className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[200px]" style={{ fontFamily: 'Nunito, sans-serif' }} title={currentWorkspace.name || undefined}>
          {isSwitchingWorkspace ? 'Switching...' : currentWorkspace.name}
        </span>
        {isSwitchingWorkspace ? (
          <svg 
            className="w-4 h-4 text-gray-500 animate-spin"
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg 
            className={cn(
              "w-4 h-4 text-gray-500 transition-transform duration-200",
              isDropdownOpen ? "rotate-180" : ""
            )}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Button>

      {isDropdownOpen && !isSwitchingWorkspace && (
        <div className="absolute top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-sm font-medium text-gray-700 px-3 py-2">
              Your Workspaces
            </div>
            <div className="space-y-1">
              {workspaces.map((workspace) => (
                <Button
                  key={workspace.workspaceId}
                  onClick={() => handleWorkspaceSwitch(workspace.workspaceId)}
                  variant="ghost"
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left justify-start h-auto",
                    currentWorkspace.workspaceId === workspace.workspaceId ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  )}
                  disabled={
                    switchingToWorkspaceId === workspace.workspaceId || 
                    isOperationLoading || 
                    currentWorkspace.workspaceId === workspace.workspaceId
                  }
                >
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    workspace.isActive ? "bg-green-500" : "bg-red-500"
                  )}></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate" title={workspace.name || undefined}>{workspace.name}</div>
                    <div className="text-sm text-gray-500 truncate" title={workspace.domain || undefined}>{workspace.domain}</div>
                  </div>
                  {switchingToWorkspaceId === workspace.workspaceId ? (
                    <svg 
                      className="w-4 h-4 text-blue-600 animate-spin"
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : currentWorkspace.workspaceId === workspace.workspaceId && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Button>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <Button
                onClick={() => {
                  setShowCreateModal(true);
                  setIsDropdownOpen(false);
                }}
                variant="ghost"
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left justify-start h-auto text-gray-700"
                disabled={isOperationLoading}
              >
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg className="w-2 h-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">Create New Workspace</div>
                  <div className="text-sm text-gray-500">Start a new workspace</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isDropdownOpen && !isSwitchingWorkspace && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Create Workspace Dialog */}
      <CreateWorkspaceDialog
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}

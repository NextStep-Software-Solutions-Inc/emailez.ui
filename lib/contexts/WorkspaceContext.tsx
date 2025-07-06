import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/react-router';
import { useParams, useNavigate } from 'react-router';
import type { ReactNode } from 'react';
import type { Workspace, CreateWorkspaceCommand, CreateWorkspaceResponse } from '@/types/index';
import { workspaceApi } from '@/lib/services';

interface WorkspaceContextType {
  // Current active workspace
  currentWorkspace: Workspace | null;
  // All workspaces for the user
  workspaces: Workspace[];
  isLoading: boolean;
  isOperationLoading: boolean; // For create/update/switch operations
  error: string | null;
  hasCompletedOnboarding: boolean;
  // Workspace management
  createWorkspace: (data: CreateWorkspaceCommand) => Promise<CreateWorkspaceResponse>;
  updateWorkspace: (data: CreateWorkspaceCommand) => Promise<void>;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

interface WorkspaceProviderProps {
  children: ReactNode;
}

export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const currentWorkspaceId = params.workspaceId;
  
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const fetchUserWorkspaces = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the auth token from Clerk
      const token = await getToken();
      if (!token) {
        // User not authenticated, set empty state
        setWorkspaces([]);
        setCurrentWorkspace(null);
        setHasCompletedOnboarding(false);
        return;
      }
      
      // Set the token for API calls
      workspaceApi.setAuthToken(token);
      
      // Fetch workspaces from API
      const userWorkspaces = await workspaceApi.getUserWorkspaces();
      
      if (userWorkspaces && userWorkspaces.length > 0) {
        setWorkspaces(userWorkspaces);
        
        // Find current workspace from URL
        if (currentWorkspaceId) {
          const activeWorkspace = userWorkspaces.find(w => w.workspaceId === currentWorkspaceId);
          if (activeWorkspace) {
            setCurrentWorkspace(activeWorkspace);
            setHasCompletedOnboarding(true);
          } else {
            // Workspace ID in URL doesn't exist, redirect to first workspace
            const firstWorkspace = userWorkspaces[0];
            navigate(`/workspace/${firstWorkspace.workspaceId}`, { replace: true });
            return;
          }
        } else {
          // No workspace in URL, redirect to first workspace
          const firstWorkspace = userWorkspaces[0];
          navigate(`/workspace/${firstWorkspace.workspaceId}`, { replace: true });
          return;
        }
        
        setHasCompletedOnboarding(true);
      } else {
        setWorkspaces([]);
        setCurrentWorkspace(null);
        setHasCompletedOnboarding(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workspaces');
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkspace = async (data: CreateWorkspaceCommand): Promise<CreateWorkspaceResponse> => {
    try {
      setIsOperationLoading(true);
      setError(null);
      
      // Get the auth token from Clerk
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      // Set the token for API calls
      workspaceApi.setAuthToken(token);
      
      // Create workspace via API
      const response = await workspaceApi.createWorkspace(data);
      
      // Create workspace object from response
      const newWorkspace: Workspace = {
        workspaceId: response.workspaceId,
        name: response.name,
        domain: response.domain,
        isActive: true,
        createdAtUtc: new Date().toISOString(),
      };
      
      // Add to workspaces array
      const updatedWorkspaces = [...workspaces, newWorkspace];
      setWorkspaces(updatedWorkspaces);
      setCurrentWorkspace(newWorkspace);
      setHasCompletedOnboarding(true);
      
      // Navigate to the new workspace
      navigate(`/workspace/${newWorkspace.workspaceId}` , {
        replace: true
      });
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workspace');
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  const updateWorkspace = async (data: CreateWorkspaceCommand): Promise<void> => {
    if (!currentWorkspace) return;
    
    try {
      setIsOperationLoading(true);
      setError(null);
      
      // Get the auth token from Clerk
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      // Set the token for API calls
      workspaceApi.setAuthToken(token);
      
      // Convert to UpdateWorkspaceCommand
      const updateData = {
        id: currentWorkspace.workspaceId,
        name: data.name,
        domain: data.domain,
        isActive: currentWorkspace.isActive,
      };
      
      // Update workspace via API
      await workspaceApi.updateWorkspace(currentWorkspace.workspaceId, updateData);
      
      const updatedWorkspace: Workspace = {
        ...currentWorkspace,
        name: data.name,
        domain: data.domain,
      };
      
      // Update current workspace
      setCurrentWorkspace(updatedWorkspace);
      
      // Update in workspaces array
      const updatedWorkspaces = workspaces.map(w => 
        w.workspaceId === currentWorkspace.workspaceId ? updatedWorkspace : w
      );
      setWorkspaces(updatedWorkspaces);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workspace');
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  const switchWorkspace = async (workspaceId: string): Promise<void> => {
    try {
      setIsOperationLoading(true);
      setError(null);
      
      const targetWorkspace = workspaces.find(w => w.workspaceId === workspaceId);
      if (!targetWorkspace) {
        throw new Error('Workspace not found');
      }
      
      // Navigate to the new workspace URL
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');
      
      // Replace the workspace ID in the URL
      if (pathSegments.length >= 3 && pathSegments[1] === 'workspace') {
        pathSegments[2] = workspaceId;
        const newPath = pathSegments.join('/');
        navigate(newPath, {
          replace: true,
        });
      } else {
        // Fallback to dashboard
        navigate(`/workspace/${workspaceId}`, {
          replace: true,
        });
      }
      
      setCurrentWorkspace(targetWorkspace);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch workspace');
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  const refreshWorkspaces = async () => {
    await fetchUserWorkspaces();
  };

  useEffect(() => {
    fetchUserWorkspaces();
  }, []);

  // Effect to sync current workspace when URL changes
  useEffect(() => {
    if (workspaces.length > 0 && currentWorkspaceId) {
      const workspace = workspaces.find(w => w.workspaceId === currentWorkspaceId);
      if (workspace && workspace.workspaceId !== currentWorkspace?.workspaceId) {
        setCurrentWorkspace(workspace);
      }
    }
  }, [currentWorkspaceId, workspaces, currentWorkspace]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        isLoading,
        error,
        isOperationLoading,
        hasCompletedOnboarding,
        createWorkspace,
        updateWorkspace,
        switchWorkspace,
        refreshWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

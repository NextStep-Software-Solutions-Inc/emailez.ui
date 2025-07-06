import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Workspace, CreateWorkspaceCommand, CreateWorkspaceResponse } from '@/types/index';

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
      
      // TODO: Replace with actual API call to get current user's workspaces
      // const response = await fetch('/api/v1/user/workspaces', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });
      
      // Simulate API call - check if user has workspaces
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock: Get user's workspaces from localStorage
      const userWorkspaces = localStorage.getItem('userWorkspaces');
      const currentWorkspaceId = localStorage.getItem('currentWorkspaceId');
      
      if (userWorkspaces) {
        const mockWorkspaces: Workspace[] = JSON.parse(userWorkspaces);
        setWorkspaces(mockWorkspaces);
        
        // Set current workspace
        if (currentWorkspaceId) {
          const activeWorkspace = mockWorkspaces.find(w => w.workspaceId === currentWorkspaceId);
          if (activeWorkspace) {
            setCurrentWorkspace(activeWorkspace);
          } else {
            // If stored workspace ID doesn't exist, use first workspace
            setCurrentWorkspace(mockWorkspaces[0] || null);
          }
        } else {
          // No current workspace set, use first one
          setCurrentWorkspace(mockWorkspaces[0] || null);
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
      
      // TODO: Replace with actual API call
      // const response = await api.workspaces.createWorkspace(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newWorkspace: Workspace = {
        workspaceId: `workspace-${Date.now()}`,
        name: data.name,
        domain: data.domain,
        isActive: true,
        createdAtUtc: new Date().toISOString(),
      };
      
      const response: CreateWorkspaceResponse = {
        workspaceId: newWorkspace.workspaceId,
        name: newWorkspace.name,
        domain: newWorkspace.domain,
        apiKey: `api-key-${Date.now()}`,
        isSuccess: true,
        message: 'Workspace created successfully',
      };
      
      // Add to workspaces array
      const updatedWorkspaces = [...workspaces, newWorkspace];
      setWorkspaces(updatedWorkspaces);
      setCurrentWorkspace(newWorkspace);
      setHasCompletedOnboarding(true);
      
      // Store in localStorage for demo purposes
      localStorage.setItem('userWorkspaces', JSON.stringify(updatedWorkspaces));
      localStorage.setItem('currentWorkspaceId', newWorkspace.workspaceId);
      
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
      
      // TODO: Replace with actual API call
      // await api.workspaces.updateWorkspace(currentWorkspace.workspaceId, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      
      localStorage.setItem('userWorkspaces', JSON.stringify(updatedWorkspaces));
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
      
      setCurrentWorkspace(targetWorkspace);
      localStorage.setItem('currentWorkspaceId', workspaceId);
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

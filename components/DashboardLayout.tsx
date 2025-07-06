import UserAvatar from "./UserAvatar";
import { SignedIn } from '@clerk/react-router';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { cn } from '@/utils';
import { useWorkspace } from '@/lib/contexts/WorkspaceContext';
import { WorkspaceOnboarding } from '@/onboarding/workspace-onboarding';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { 
    path: "", 
    label: "Overview", 
    icon: "📊"
  },
  { 
    path: "/compose", 
    label: "Compose", 
    icon: "✉️"
  },
  { 
    path: "/configurations", 
    label: "Configurations", 
    icon: "⚙️"
  },
  { 
    path: "/analytics", 
    label: "Analytics", 
    icon: "📈"
  },
  { 
    path: "/activity", 
    label: "Activity", 
    icon: "📋"
  },
  { 
    path: "/settings", 
    label: "Settings", 
    icon: "🔧"
  }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentWorkspace, workspaces, isLoading, hasCompletedOnboarding } = useWorkspace();
  const location = useLocation();

  const isActive = (path: string) => {
    if (!currentWorkspace) return false;
    
    const fullPath = `/workspace/${currentWorkspace.workspaceId}${path}`;
    if (path === '') {
      return location.pathname === `/workspace/${currentWorkspace.workspaceId}`;
    }
    return location.pathname.startsWith(fullPath);
  };

  const getNavigationUrl = (path: string) => {
    if (!currentWorkspace) return '#';
    return `/workspace/${currentWorkspace.workspaceId}${path}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your organization...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if user hasn't completed it
  if (!hasCompletedOnboarding || !currentWorkspace) {
    return <WorkspaceOnboarding />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Mobile Menu Button and Logo */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                "lg:w-0 lg:opacity-0",
                "w-12 opacity-100"
              )}>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 relative">
                    <svg 
                      className={cn(
                        "w-6 h-6 absolute inset-0 transition-opacity duration-300 ease-in-out",
                        isSidebarOpen ? "opacity-0" : "opacity-100"
                      )}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" strokeWidth="2"/>
                      <path d="M9 4v16" strokeWidth="2"/>
                    </svg>
                    
                    <svg 
                      className={cn(
                        "w-6 h-6 absolute inset-0 transition-opacity duration-300 ease-in-out",
                        isSidebarOpen ? "opacity-100" : "opacity-0"
                      )}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Logo */}
              <a href="/" className={cn(
                "flex items-center space-x-3 transition-all duration-300 ease-in-out",
                "lg:ml-0",
                "ml-4"
              )}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Email EZ
                </span>
              </a>
            </div>

            {/* Center - Workspace Switcher */}
            <div className="hidden md:flex items-center">
              <WorkspaceSwitcher />
            </div>

            {/* Right side - User Menu */}
            <div className="flex items-center space-x-4">
              <SignedIn>
                <UserAvatar />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main layout container with top padding for fixed header */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className={cn(
          "fixed top-16 bottom-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200",
          "transition-transform duration-500 ease-in-out",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Current Workspace Info (Mobile) */}
            <div className="md:hidden p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  currentWorkspace.isActive ? "bg-green-500" : "bg-red-500"
                )}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {currentWorkspace.name}
                  </div>
                  <div className="text-sm text-gray-500">{currentWorkspace.domain}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => (
                <a
                  key={item.path}
                  href={getNavigationUrl(item.path)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group",
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
              <a
                href="/"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <span className="text-lg">🏠</span>
                <span className="font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Back to Home
                </span>
              </a>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile - provides visual feedback but doesn't block content */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/10 z-40 lg:hidden pointer-events-none",
            "transition-opacity duration-500 ease-in-out",
            isSidebarOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Main content */}
        <main className="flex-1 w-full lg:ml-64 overflow-y-auto transition-all duration-500 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

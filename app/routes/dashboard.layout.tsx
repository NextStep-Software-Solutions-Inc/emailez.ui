import { Outlet } from 'react-router';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/react-router';
import DashboardLayout from '../../components/DashboardLayout';
import { WorkspaceProvider } from '@/lib/contexts/WorkspaceContext';

export default function DashboardLayoutRoute() {
  return (
    <>
      <SignedIn>
        <WorkspaceProvider>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </WorkspaceProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

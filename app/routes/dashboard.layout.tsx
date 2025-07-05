import { Outlet } from 'react-router';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/react-router';
import DashboardLayout from '../../components/DashboardLayout';

export default function DashboardLayoutRoute() {
  return (
    <>
      <SignedIn>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

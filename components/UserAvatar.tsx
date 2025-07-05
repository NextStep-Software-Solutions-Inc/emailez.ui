import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/react-router';
import { cn } from '../lib/utils';

export default function UserAvatar() {
  const { isLoaded, user } = useUser();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      // Add a small delay to prevent flickering
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!isLoaded) {
      setShowSkeleton(true);
    }
  }, [isLoaded, user]);

  return (
    <div className="relative w-8 h-8">
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300",
        showSkeleton ? "opacity-100" : "opacity-0"
      )}>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300",
        showSkeleton ? "opacity-0" : "opacity-100"
      )}>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonPopoverCard: "shadow-xl border border-gray-200",
              userButtonPopoverActionButton: "hover:bg-gray-100"
            }
          }}
        />
      </div>
    </div>
  );
}

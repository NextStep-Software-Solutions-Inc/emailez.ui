import NavigationLink from "./NavigationLink";
import Button from "./Button";
import UserAvatar from "./UserAvatar";
import { SignedIn, SignedOut, SignInButton } from '@clerk/react-router';
import { cn } from '@/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/support", label: "Support" }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div 
      className={cn(
        "md:hidden mt-4 pb-4 border-t border-gray-100 overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <nav className="flex flex-col space-y-4 pt-4">
        {navigationItems.map((item, index) => (
          <NavigationLink 
            key={item.href}
            href={item.href} 
            onClick={onClose}
            className={cn(
              "px-2 py-1 transition-all duration-300 ease-in-out",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
            }}
          >
            {item.label}
          </NavigationLink>
        ))}
        
        {/* Mobile Auth Buttons */}
        <div 
          className={cn(
            "flex flex-col space-y-3 pt-4 border-t border-gray-100",
            "transition-all duration-300 ease-in-out",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{
            transitionDelay: isOpen ? `${navigationItems.length * 50}ms` : '0ms'
          }}
        >
          <SignedOut>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-left px-2 py-1 justify-start"
            >
              <SignInButton mode="modal">
                Sign In
              </SignInButton>
            </Button>
            <Button 
              variant="primary" 
              onClick={onClose}
            >
              <SignInButton mode="modal">
                Get Started
              </SignInButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center space-x-3 px-2 py-2">
              <UserAvatar />
              <span className="text-gray-700 font-medium text-sm"  >
                Welcome back!
              </span>
            </div>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-left px-2 py-1 justify-start"
            >
              <a href="/dashboard"  >
                Dashboard
              </a>
            </Button>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

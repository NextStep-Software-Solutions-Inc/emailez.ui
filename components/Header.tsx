import BrandLogo from "./BrandLogo";
import Button from "./Button";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import UserAvatar from "./UserAvatar";
import { useState, useRef } from "react";
import { useHeaderScroll } from "hooks/useHeaderScroll";
import { useClickOutside } from "hooks/useClickOutside";
import { SignedIn, SignedOut, SignInButton } from '@clerk/react-router';
import { cn } from '../lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { isVisible } = useHeaderScroll({ threshold: 100 });

  useClickOutside(headerRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className={cn(
        "bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50",
        "border-b border-gray-100 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <BrandLogo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <DesktopNavigation />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Button variant="ghost">
                <SignInButton mode="modal">
                  Sign In
                </SignInButton>
              </Button>
              <Button variant="primary">
                <SignInButton mode="modal">
                  Get Started
                </SignInButton>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button variant="ghost">
                <a href="/dashboard">
                  Dashboard
                </a>
              </Button>
              <UserAvatar />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isOpen={isMobileMenuOpen} 
            onClick={toggleMobileMenu} 
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
      </div>
    </header>
  );
}
import BrandLogo from "./BrandLogo";
import Button from "./Button";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import { useState, useRef } from "react";
import { useHeaderScroll } from "hooks/useHeaderScroll";
import { useClickOutside } from "hooks/useClickOutside";

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
      className={`bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <BrandLogo />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Desktop Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:block">
              Sign In
            </Button>
            <Button variant="primary">
              Get Started
            </Button>
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
import NavigationLink from "./NavigationLink";
import Button from "./Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#docs", label: "Docs" },
  { href: "#support", label: "Support" }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
      <nav className="flex flex-col space-y-4 pt-4">
        {navigationItems.map((item) => (
          <NavigationLink 
            key={item.href}
            href={item.href} 
            onClick={onClose}
            className="px-2 py-1"
          >
            {item.label}
          </NavigationLink>
        ))}
        
        {/* Mobile Auth Buttons */}
        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-left px-2 py-1 justify-start"
          >
            Sign In
          </Button>
          <Button 
            variant="primary" 
            onClick={onClose}
          >
            Get Started
          </Button>
        </div>
      </nav>
    </div>
  );
}

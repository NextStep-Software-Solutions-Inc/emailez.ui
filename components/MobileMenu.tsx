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
  return (
    <div 
      className={`md:hidden mt-4 pb-4 border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}
    >
      <nav className="flex flex-col space-y-4 pt-4">
        {navigationItems.map((item, index) => (
          <NavigationLink 
            key={item.href}
            href={item.href} 
            onClick={onClose}
            className={`px-2 py-1 transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-2 opacity-0'
            }`}
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
            }}
          >
            {item.label}
          </NavigationLink>
        ))}
        
        {/* Mobile Auth Buttons */}
        <div 
          className={`flex flex-col space-y-3 pt-4 border-t border-gray-100 transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-2 opacity-0'
          }`}
          style={{
            transitionDelay: isOpen ? `${navigationItems.length * 50}ms` : '0ms'
          }}
        >
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

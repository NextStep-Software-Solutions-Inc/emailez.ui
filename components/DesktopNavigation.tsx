import NavigationLink from "./NavigationLink";

const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#docs", label: "Docs" },
  { href: "#support", label: "Support" }
];

export default function DesktopNavigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <NavigationLink key={item.href} href={item.href}>
          {item.label}
        </NavigationLink>
      ))}
    </nav>
  );
}

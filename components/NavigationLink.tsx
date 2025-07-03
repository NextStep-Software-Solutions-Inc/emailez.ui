interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function NavigationLink({ href, children, onClick, className = "" }: NavigationLinkProps) {
  return (
    <a 
      href={href} 
      className={`text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 ${className}`}
      style={{ fontFamily: 'Nunito, sans-serif' }}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

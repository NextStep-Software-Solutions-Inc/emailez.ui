interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = "",
  size = 'md'
}: ButtonProps) {
  const baseClasses = "font-semibold transition-all duration-300 rounded-lg";
  const fontFamily = { fontFamily: 'Nunito, sans-serif' };
  
  const sizeClasses = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-gray-700 hover:text-blue-600 font-medium"
  };

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={fontFamily}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

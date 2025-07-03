interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button 
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative w-10 h-10 flex items-center justify-center"
      onClick={onClick}
      aria-label="Toggle mobile menu"
    >
      <div className="w-6 h-6 relative">
        {/* Top line */}
        <span 
          className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
            isOpen ? 'top-3 rotate-45' : 'top-1'
          }`}
        />
        
        {/* Middle line */}
        <span 
          className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        />
        
        {/* Bottom line */}
        <span 
          className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
            isOpen ? 'top-3 -rotate-45' : 'top-5'
          }`}
        />
      </div>
    </button>
  );
}

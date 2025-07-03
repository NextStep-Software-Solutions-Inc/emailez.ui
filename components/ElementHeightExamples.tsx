import { useRef } from 'react';
import { useElementHeight } from 'hooks/useElementHeight';

/**
 * Example component demonstrating different ways to use the generic useElementHeight hook
 */
export function ElementHeightExamples() {
  const headerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Method 1: Using with a ref object
  const headerHeight = useElementHeight(headerRef, undefined, 80);
  
  // Method 2: Using with a CSS selector
  const navHeight = useElementHeight(null, 'nav', 60);
  
  // Method 3: Using with a more specific selector
  const mainContentHeight = useElementHeight(null, '.main-content', 400);
  
  // Method 4: Using with a ref and custom default
  const sidebarHeight = useElementHeight(sidebarRef, undefined, 200);
  
  // Method 5: Using with both ref and fallback selector
  const footerHeight = useElementHeight(footerRef, 'footer', 100);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Element Height Examples</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="font-semibold">Header (using ref)</h3>
          <p>Height: {headerHeight}px</p>
          <header ref={headerRef} className="bg-blue-600 text-white p-4 mt-2">
            Header Content
          </header>
        </div>

        <div className="p-4 bg-green-100 rounded">
          <h3 className="font-semibold">Navigation (using selector)</h3>
          <p>Height: {navHeight}px</p>
          <nav className="bg-green-600 text-white p-3 mt-2">
            Navigation Content
          </nav>
        </div>

        <div className="p-4 bg-purple-100 rounded">
          <h3 className="font-semibold">Sidebar (using ref)</h3>
          <p>Height: {sidebarHeight}px</p>
          <div ref={sidebarRef} className="bg-purple-600 text-white p-6 mt-2">
            Sidebar Content
          </div>
        </div>

        <div className="p-4 bg-orange-100 rounded">
          <h3 className="font-semibold">Footer (ref + fallback selector)</h3>
          <p>Height: {footerHeight}px</p>
          <footer ref={footerRef} className="bg-orange-600 text-white p-3 mt-2">
            Footer Content
          </footer>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Main Content (using class selector)</h3>
        <p>Height: {mainContentHeight}px</p>
        <div className="main-content bg-gray-600 text-white p-8 mt-2">
          Main Content Area
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800">Usage Examples:</h3>
        <pre className="text-sm text-yellow-700 mt-2">
{`// Method 1: Using with ref
const elementRef = useRef<HTMLDivElement>(null);
const height = useElementHeight(elementRef, undefined, 100);

// Method 2: Using with selector
const height = useElementHeight(null, '.my-element', 50);

// Method 3: Using with both (ref takes priority)
const height = useElementHeight(elementRef, '.fallback-selector', 75);`}
        </pre>
      </div>
    </div>
  );
}

export default ElementHeightExamples;

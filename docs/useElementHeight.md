# useElementHeight Hook Documentation

A generic React hook for dynamically measuring element heights with automatic updates when elements resize.

## Hooks Available

### `useElementHeight<T>(elementRef?, selector?, defaultHeight?)`

Generic hook that can measure the height of any element using either a ref or CSS selector.

#### Parameters

- `elementRef` (optional): A React ref object pointing to the element
- `selector` (optional): CSS selector string to find the element
- `defaultHeight` (optional): Default height to use before measurement (default: 0)

#### Returns

- `number`: The current height of the element in pixels

### `useHeaderHeight()`

Specialized hook for measuring header height with fallback to CSS custom properties.

#### Returns

- `number`: The current header height in pixels (default: 80px)

## Usage Examples

### 1. Using with a React Ref

```tsx
import { useRef } from "react";
import { useElementHeight } from "hooks/useHeaderHeight";

function MyComponent() {
  const elementRef = useRef<HTMLDivElement>(null);
  const height = useElementHeight(elementRef, undefined, 100);

  return (
    <div>
      <div
        ref={elementRef}
        className="measured-element"
      >
        Content here
      </div>
      <p>Element height: {height}px</p>
    </div>
  );
}
```

### 2. Using with a CSS Selector

```tsx
import { useElementHeight } from "hooks/useHeaderHeight";

function MyComponent() {
  const navHeight = useElementHeight(null, "nav", 60);
  const headerHeight = useElementHeight(null, ".main-header", 80);

  return (
    <div style={{ paddingTop: `${navHeight}px` }}>
      <p>Navigation height: {navHeight}px</p>
      <p>Header height: {headerHeight}px</p>
    </div>
  );
}
```

### 3. Using with Both Ref and Fallback Selector

```tsx
import { useRef } from "react";
import { useElementHeight } from "hooks/useHeaderHeight";

function MyComponent() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Will use ref if available, otherwise fall back to selector
  const height = useElementHeight(sidebarRef, ".sidebar", 200);

  return (
    <div>
      <div
        ref={sidebarRef}
        className="sidebar"
      >
        Sidebar content
      </div>
      <p>Sidebar height: {height}px</p>
    </div>
  );
}
```

### 4. Header Height (Backward Compatibility)

```tsx
import { useHeaderHeight } from "hooks/useHeaderHeight";

function MyComponent() {
  const headerHeight = useHeaderHeight();

  return (
    <div style={{ paddingTop: `${headerHeight}px` }}>
      Main content with header offset
    </div>
  );
}
```

## Features

- **Automatic Updates**: Uses `ResizeObserver` to detect element size changes
- **Fallback Support**: Falls back to `window.resize` events if `ResizeObserver` is not available
- **TypeScript Support**: Fully typed with generic support for different element types
- **Performance Optimized**: Minimal re-renders and efficient DOM observation
- **SSR Safe**: Works correctly in server-side rendering environments
- **Flexible**: Works with refs, selectors, or both

## Real-World Use Cases

1. **Dynamic Header Offset**: Adjust content padding based on header height
2. **Responsive Sidebars**: Calculate main content width based on sidebar height
3. **Modal Positioning**: Position modals relative to other elements
4. **Sticky Elements**: Calculate stick positions based on other element heights
5. **Layout Calculations**: Dynamic layouts that respond to content changes

## Performance Notes

- The hook uses `ResizeObserver` for optimal performance
- Includes debouncing through `setTimeout` to prevent excessive updates
- Only observes elements that exist in the DOM
- Automatically cleans up observers when components unmount

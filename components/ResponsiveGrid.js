import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

const DEFAULT_GAP = {
  mobile: '1rem',
  largeMobile: '1.25rem',
  tablet: '1.5rem',
  desktop: '1.75rem',
  largeDesktop: '2rem',
  extraLargeDesktop: '2.5rem'
};

/**
 * A responsive grid component that automatically adjusts columns based on screen size
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in grid
 * @param {number} [props.minWidth] - Minimum width of each grid item
 * @param {string} [props.gap] - Gap between grid items (CSS value)
 * @param {string} [props.rowGap] - Row gap between grid items (CSS value)
 * @param {string} [props.columnGap] - Column gap between grid items (CSS value)
 * @param {number} [props.maxColumns] - Maximum number of columns regardless of screen size
 * @param {Object} [props.style] - Additional styles to apply to grid container
 * @param {string} [props.className] - Additional class names to apply
 */
export function ResponsiveGrid({
  children,
  minWidth = 280,
  gap,
  rowGap,
  columnGap,
  maxColumns,
  style = {},
  className = '',
  ...rest
}) {
  const { breakpoint, gridColumns, isClient } = useResponsive();
  
  // Determine number of columns based on props and responsive hook
  const columns = maxColumns ? Math.min(gridColumns, maxColumns) : gridColumns;
  
  // Get appropriate gap based on breakpoint
  const responsiveGap = gap || DEFAULT_GAP[breakpoint] || DEFAULT_GAP.desktop;
  
  // For server-side rendering, set a reasonable default until client hydration
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: isClient
      ? `repeat(${columns}, minmax(${minWidth}px, 1fr))`
      : `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
    gap: responsiveGap,
    rowGap: rowGap || responsiveGap,
    columnGap: columnGap || responsiveGap,
    width: '100%',
    ...style
  };

  return (
    <div className={`responsive-grid ${className}`} style={gridStyles} {...rest}>
      {children}
    </div>
  );
}

/**
 * A responsive grid item that maintains consistent aspect ratio
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child content
 * @param {number} [props.aspectRatio] - Aspect ratio of the item (width/height)
 * @param {string} [props.className] - Additional class names
 * @param {number} [props.colSpan] - Number of columns this item should span
 * @param {number} [props.rowSpan] - Number of rows this item should span
 * @param {Object} [props.style] - Additional styles
 */
export function GridItem({
  children,
  aspectRatio,
  className = '',
  colSpan = 1,
  rowSpan = 1,
  style = {},
  ...rest
}) {
  const { breakpoint, isMobileAny } = useResponsive();
  
  // On mobile, don't allow items to span multiple columns
  const responsiveColSpan = isMobileAny ? 1 : colSpan;
  
  const itemStyles = {
    gridColumn: `span ${responsiveColSpan}`,
    gridRow: `span ${rowSpan}`,
    ...style
  };
  
  // If aspect ratio is specified, wrap content in aspect ratio container
  if (aspectRatio) {
    return (
      <div className={`grid-item ${className}`} style={itemStyles} {...rest}>
        <div 
          className="aspect-ratio-container" 
          style={{
            position: 'relative',
            paddingBottom: `${(1 / aspectRatio) * 100}%`,
            height: 0,
            width: '100%'
          }}
        >
          <div 
            className="aspect-ratio-content"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  // If no aspect ratio, render normally
  return (
    <div className={`grid-item ${className}`} style={itemStyles} {...rest}>
      {children}
    </div>
  );
}

/**
 * A section container with responsive padding and max-width constraints
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child content
 * @param {string} [props.className] - Additional class names
 * @param {Object} [props.style] - Additional styles
 * @param {string} [props.maxWidth] - Maximum width of the section
 * @param {string} [props.padding] - Padding override (default is responsive)
 */
export function ResponsiveSection({
  children,
  className = '',
  style = {},
  maxWidth = '1800px',
  padding,
  ...rest
}) {
  const { breakpoint } = useResponsive();
  
  // Define responsive padding based on breakpoint
  const getResponsivePadding = () => {
    if (padding) return padding; // Use override if provided
    
    switch (breakpoint) {
      case 'mobile': return 'clamp(1rem, 5vw, 1.25rem)';
      case 'largeMobile': return 'clamp(1.25rem, 6vw, 1.5rem)';
      case 'tablet': return 'clamp(1.5rem, 7vw, 2rem)';
      case 'desktop': return 'clamp(2rem, 8vw, 3rem)';
      case 'largeDesktop': return 'clamp(2.5rem, 9vw, 4rem)';
      case 'extraLargeDesktop': return 'clamp(3rem, 10vw, 5rem)';
      default: return 'clamp(2rem, 8vw, 3rem)';
    }
  };

  const responsivePadding = getResponsivePadding();
  
  const sectionStyles = {
    width: '100%',
    maxWidth,
    margin: '0 auto',
    padding: responsivePadding,
    boxSizing: 'border-box',
    ...style
  };

  return (
    <section className={`responsive-section ${className}`} style={sectionStyles} {...rest}>
      {children}
    </section>
  );
}

/**
 * A container that maintains consistent sizing constraints across devices
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child content
 * @param {string} [props.className] - Additional class names
 * @param {Object} [props.style] - Additional styles
 * @param {string} [props.width] - Width of the container (CSS value)
 * @param {boolean} [props.centerContent] - Whether to center content vertically and horizontally
 */
export function ResponsiveContainer({
  children,
  className = '',
  style = {},
  width = '100%',
  centerContent = false,
  ...rest
}) {
  const containerStyles = {
    width,
    maxWidth: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    ...(centerContent && {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }),
    ...style
  };

  return (
    <div className={`responsive-container ${className}`} style={containerStyles} {...rest}>
      {children}
    </div>
  );
}

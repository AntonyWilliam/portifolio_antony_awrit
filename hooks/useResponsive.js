import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for responsive design that provides:
 * - Current breakpoint
 * - Window dimensions
 * - Optimal grid columns for current viewport
 * - Whether device is touch-enabled
 */
export function useResponsive() {
  // Initialize state with server-compatible values
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  
  const [breakpoint, setBreakpoint] = useState('loading');
  const [gridColumns, setGridColumns] = useState(4);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Debounce function to limit rapid window resize events
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Calculate current breakpoint and grid columns based on window width
  const calculateBreakpoint = useCallback((width) => {
    if (width === 0) return 'loading'; // Initial server render
    if (width <= 480) return 'mobile';
    if (width <= 767) return 'largeMobile';
    if (width <= 1024) return 'tablet';
    if (width <= 1600) return 'desktop';
    if (width <= 2000) return 'largeDesktop';
    return 'extraLargeDesktop';
  }, []);

  // Calculate optimal grid columns based on breakpoint
  const calculateGridColumns = useCallback((breakpoint) => {
    switch (breakpoint) {
      case 'mobile': return 1;
      case 'largeMobile': return 2;
      case 'tablet': return 3;
      case 'desktop': return 4;
      case 'largeDesktop': return 5;
      case 'extraLargeDesktop': return 6;
      default: return 4;
    }
  }, []);

  // Handle resize with debounce to improve performance
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      
      const newBreakpoint = calculateBreakpoint(width);
      setBreakpoint(newBreakpoint);
      
      const newGridColumns = calculateGridColumns(newBreakpoint);
      setGridColumns(newGridColumns);
    }, 100);
    
    // Detect touch device once on mount
    setIsTouchDevice(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      navigator.msMaxTouchPoints > 0
    );
    
    // Initial calculation
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateBreakpoint, calculateGridColumns]);

  // Return viewport details and responsive values
  return {
    windowSize,
    breakpoint,
    gridColumns,
    isTouchDevice,
    isClient: windowSize.width > 0, // Helps detect if we're on client side
    // Convenient boolean flags for breakpoint checks
    isMobile: breakpoint === 'mobile',
    isLargeMobile: breakpoint === 'largeMobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isLargeDesktop: breakpoint === 'largeDesktop',
    isExtraLargeDesktop: breakpoint === 'extraLargeDesktop',
    // Convenient combined checks
    isMobileAny: ['mobile', 'largeMobile'].includes(breakpoint),
    isTabletUp: !['mobile', 'largeMobile'].includes(breakpoint),
    isDesktopUp: ['desktop', 'largeDesktop', 'extraLargeDesktop'].includes(breakpoint),
    isLargeDesktopUp: ['largeDesktop', 'extraLargeDesktop'].includes(breakpoint),
  };
}
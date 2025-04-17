/**
 * Page transition script for smooth navigation between pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create transition overlay element
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target]), a[href^="http://"]:not([target]), a[href^="https://"]:not([target])');
    
    // Get more specific internal links
    const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target]), a[href$="/"]:not([target]):not([href^="http"])');
    
    // Combine all the links we want to add transitions to
    const allTransitionLinks = [...navLinks, ...internalLinks].filter(link => {
        // Only include links to pages on our site, not external links
        const href = link.getAttribute('href');
        
        // Skip dropdown menu toggles and hash links (that stay on the same page)
        if (link.classList.contains('dropdown-toggle') || 
            (href && href.startsWith('#')) ||
            link.hasAttribute('target')) {
            return false;
        }
        
        // Skip if href contains a different domain
        if (href && (href.includes('http') || href.includes('https'))) {
            const currentUrl = window.location.hostname;
            if (!href.includes(currentUrl)) {
                return false;
            }
        }
        
        return true;
    });
    
    // Get the main content element
    const mainContent = document.querySelector('main') || document.querySelector('.container');
    
    // Add click event listeners to all links
    allTransitionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a dropdown toggle or hash link
            if (this.classList.contains('dropdown-toggle') || (href && href.startsWith('#'))) {
                return;
            }
            
            // Skip external links
            if (href && (href.includes('http://') || href.includes('https://'))) {
                if (!href.includes(window.location.hostname)) {
                    return;
                }
            }
            
            e.preventDefault();
            
            // Start transition
            if (mainContent) {
                mainContent.classList.add('fade-out');
            }
            
            // Show overlay
            transitionOverlay.classList.add('active');
            
            // Navigate to the new page after a delay
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
    
    // Handle page load to fade in content
    window.addEventListener('load', function() {
        // Hide overlay when page has loaded
        transitionOverlay.classList.remove('active');
        
        // Ensure content is visible
        if (mainContent) {
            mainContent.classList.remove('fade-out');
        }
    });
});
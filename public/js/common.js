/**
 * Common JavaScript functions for the portfolio site
 */

// Function to handle opening sample categories from the navbar
window.openSampleCategory = function(category) {
    // Store the category in sessionStorage so it can be accessed when the samples page loads
    sessionStorage.setItem('selectedSampleCategory', category);
}

// Load common header and hero-section into pages
document.addEventListener('DOMContentLoaded', function() {
    // Find the header placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    const heroPlaceholder = document.getElementById('hero-placeholder');
    
    // Load header
    if (headerPlaceholder) {
        // Fetch the header content
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                // Insert the header HTML
                headerPlaceholder.innerHTML = data;
                
                // Execute any scripts in the header
                const scripts = headerPlaceholder.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
                
                // Make sure particles animation still works
                const particlesElement = document.getElementById('particles-js');
                if (particlesElement && typeof tsParticles !== 'undefined') {
                    // If we're on a page with particles, make sure the animation continues to work
                    const currentTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
                    if (window.updateParticlesTheme) {
                        window.updateParticlesTheme(currentTheme);
                    }
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }
    
    // Load hero section (only on index page)
    if (heroPlaceholder) {
        fetch('hero-section.html')
            .then(response => response.text())
            .then(data => {
                // Insert the hero HTML
                heroPlaceholder.innerHTML = data;
                
                // Execute any scripts
                const scripts = heroPlaceholder.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
                
                // Make sure the hero section's animation and styles are applied
                setTimeout(() => {
                    // Don't automatically open the first menu item
                    // Removed auto-open of first dropdown
                    
                    // Add functionality to expand hero height when dropdown is opened
                    const heroSection = document.querySelector('.hero');
                    document.querySelectorAll('.menu-item').forEach(item => {
                        const header = item.querySelector('.menu-header');
                        if (header) {
                            header.addEventListener('click', (e) => {
                                e.stopPropagation();
                                const wasActive = item.classList.contains('active');
                                
                                // Close all dropdowns first
                                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                                
                                if (!wasActive) {
                                    // Add active class to open dropdown
                                    item.classList.add('active');
                                    
                                    // Increase hero height and padding to accommodate dropdown
                                    if (heroSection) {
                                        heroSection.style.minHeight = 'max(700px, 80vh)';
                                        heroSection.style.padding = 'clamp(5rem, 8vw, 8rem) 0';
                                    }
                                } else {
                                    // Return to normal height and padding when closing
                                    if (heroSection) {
                                        heroSection.style.minHeight = '';
                                        heroSection.style.padding = '';
                                    }
                                }
                            });
                        }
                    });
                    
                    // Close dropdowns when clicking outside of them
                    document.addEventListener('click', (e) => {
                        if (!e.target.closest('.menu-item')) {
                            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                            
                            // Reset hero height and padding when closing all dropdowns
                            const heroSection = document.querySelector('.hero');
                            if (heroSection) {
                                heroSection.style.minHeight = '';
                                heroSection.style.padding = '';
                            }
                        }
                    });
                    
                    // Make sure particles animation is initialized properly
                    if (typeof tsParticles !== 'undefined' && typeof window.updateParticlesTheme === 'function') {
                        const theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
                        window.updateParticlesTheme(theme);
                    }
                }, 500); // Small delay to ensure DOM is ready
            })
            .catch(error => {
                console.error('Error loading hero section:', error);
            });
    }
});
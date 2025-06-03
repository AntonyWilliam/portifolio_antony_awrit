/**
 * Common JavaScript functions for the portfolio site
 */

// Function to handle opening sample categories from the navbar
window.openSampleCategory = function(category) {
    // Store the category in sessionStorage so it can be accessed when the samples page loads
    sessionStorage.setItem('selectedSampleCategory', category);
}

// Apply the saved theme on page load
function applyThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.body.style.backgroundColor = '#f5f5f5'; // Light theme background
        document.body.style.color = '#333333'; // Light theme text
    } else {
        document.documentElement.classList.remove('light-theme');
        document.body.style.backgroundColor = '#0A0A0A'; // Dark theme background
        document.body.style.color = '#9D9D9D'; // Dark theme text
    }
    
    // Force update any components that may not respond to CSS variable changes
    refreshThemeComponents(savedTheme === 'light' ? 'light' : 'dark');
}

// Function to refresh components that may need explicit updates
function refreshThemeComponents(theme) {
    // Update contact form containers if they exist
    const contactFormContainers = document.querySelectorAll('.contact-form-container, .contact-card, .contact-social');
    if (contactFormContainers.length > 0) {
        contactFormContainers.forEach(container => {
            if (theme === 'light') {
                container.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                container.style.borderColor = 'rgba(0, 0, 0, 0.05)';
            } else {
                container.style.backgroundColor = 'rgba(20, 20, 20, 0.5)';
                container.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
        });
    }
    
    // Update form controls
    const formControls = document.querySelectorAll('.form-control');
    if (formControls.length > 0) {
        formControls.forEach(control => {
            if (theme === 'light') {
                control.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                control.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                control.style.color = '#333';
            } else {
                control.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                control.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                control.style.color = '#fff';
            }
        });
    }
    
    // Update title and heading text colors
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .contact-title');
    if (headings.length > 0) {
        headings.forEach(heading => {
            if (theme === 'light') {
                heading.style.color = '#333';
            } else {
                heading.style.color = '#fff';
            }
        });
    }
    
    // Force background color updates on main sections
    const mainSections = document.querySelectorAll('main, .contact-section, section');
    if (mainSections.length > 0) {
        mainSections.forEach(section => {
            section.style.backgroundColor = theme === 'light' ? '#f5f5f5' : '#0A0A0A';
        });
    }
    
    // Update navbar background and styles
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (theme === 'light') {
            navbar.style.backgroundColor = 'rgba(245, 245, 245, 0.75)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.75)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Fix the "4 ways I can help" section
    updateHelpSection(theme);
}

// Special function to handle the "4 ways I can help" section
function updateHelpSection(theme) {
    // Update the "I create" text
    const iCreateText = document.querySelector('.i-create-text');
    if (iCreateText) {
        iCreateText.style.color = theme === 'light' ? '#555555' : '#ADADAD';
    }
    
    // Update the typing text
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        typingText.style.color = theme === 'light' ? '#000000' : '#EFEFEF';
    }
    
    // Update menu items
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            // Update menu headers
            const menuHeader = item.querySelector('.menu-header');
            if (menuHeader) {
                if (theme === 'light') {
                    menuHeader.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                    menuHeader.style.color = '#333';
                } else {
                    menuHeader.style.backgroundColor = 'transparent';
                    menuHeader.style.color = '#9D9D9D';
                }
                
                // Update text inside menu header
                const menuText = menuHeader.querySelector('.text');
                if (menuText) {
                    menuText.style.color = theme === 'light' ? '#333' : '#9D9D9D';
                }
                
                // Update number inside menu header
                const numberElem = menuHeader.querySelector('.number');
                if (numberElem) {
                    numberElem.style.color = theme === 'light' ? '#555' : '#ADADAD';
                }
                
                // Update arrow
                const arrowElem = menuHeader.querySelector('.arrow');
                if (arrowElem) {
                    arrowElem.style.color = theme === 'light' ? '#555' : '#9D9D9D';
                }
            }
            
            // Update dropdowns
            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                if (theme === 'light') {
                    dropdown.style.backgroundColor = 'rgba(245, 245, 245, 0.95)';
                    dropdown.style.borderTop = '1px solid rgba(0, 0, 0, 0.05)';
                } else {
                    dropdown.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
                    dropdown.style.borderTop = '1px solid rgba(255, 215, 0, 0.1)';
                }
                
                // Update text in dropdown
                const paragraphs = dropdown.querySelectorAll('p');
                if (paragraphs.length > 0) {
                    paragraphs.forEach(p => {
                        if (!p.querySelector('.metric')) { // Skip paragraphs that contain metric spans
                            p.style.color = theme === 'light' ? '#333' : '#9D9D9D';
                        }
                    });
                }
                
                // Update flashcards
                const flashcards = dropdown.querySelectorAll('.flashcard');
                if (flashcards.length > 0) {
                    flashcards.forEach(card => {
                        if (theme === 'light') {
                            card.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                            card.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                        } else {
                            card.style.backgroundColor = 'rgba(157, 157, 157, 0.03)';
                            card.style.borderColor = 'rgba(157, 157, 157, 0.05)';
                        }
                        
                        // Update flashcard headings
                        const cardHeading = card.querySelector('h3');
                        if (cardHeading) {
                            cardHeading.style.color = theme === 'light' ? '#333' : '#9D9D9D';
                        }
                        
                        // Update flashcard text
                        const cardText = card.querySelectorAll('p');
                        if (cardText.length > 0) {
                            cardText.forEach(p => {
                                if (!p.querySelector('.metric')) {
                                    p.style.color = theme === 'light' ? '#555' : '#AAAAAA';
                                }
                            });
                        }
                    });
                }
                
                // Update tags
                const tags = dropdown.querySelectorAll('.tags span');
                if (tags.length > 0) {
                    tags.forEach(tag => {
                        if (theme === 'light') {
                            tag.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                            tag.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                            tag.style.color = '#333';
                        } else {
                            tag.style.backgroundColor = 'rgba(157, 157, 157, 0.05)';
                            tag.style.borderColor = 'rgba(157, 157, 157, 0.08)';
                            tag.style.color = '#9D9D9D';
                        }
                        
                        // Update tag icons
                        const tagIcon = tag.querySelector('i');
                        if (tagIcon) {
                            tagIcon.style.color = theme === 'light' ? '#555' : '#ADADAD';
                        }
                    });
                }
            }
        });
    }
    
    // Update hero section elements
    const heroElements = document.querySelectorAll('.hero-container, .intro, .squares, .menu');
    if (heroElements.length > 0) {
        heroElements.forEach(element => {
            // Force background color update
            if (element.classList.contains('menu')) {
                if (theme === 'light') {
                    element.style.backgroundColor = 'rgba(245, 245, 245, 0.6)';
                    element.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                    element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                } else {
                    element.style.backgroundColor = 'rgba(5, 5, 5, 0.4)';
                    element.style.borderColor = 'rgba(157, 157, 157, 0.15)';
                    element.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
                }
            }
        });
    }
    
    // Update intro elements
    const introHeader = document.querySelector('.intro .header');
    if (introHeader) {
        introHeader.style.color = theme === 'light' ? '#555' : '#9D9D9D';
    }
    
    const introTitle = document.querySelector('.intro .title');
    if (introTitle) {
        introTitle.style.color = theme === 'light' ? '#333' : '#9D9D9D';
    }
    
    // Update squares
    const squares = document.querySelectorAll('.square');
    if (squares.length > 0) {
        squares.forEach(square => {
            if (theme === 'light') {
                square.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                square.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
            } else {
                square.style.borderColor = 'rgba(157, 157, 157, 0.3)';
                square.style.backgroundColor = 'rgba(10, 10, 10, 0.3)';
            }
        });
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply the saved theme immediately
    applyThemeFromStorage();
    
    // Apply theme again after a small delay to ensure all components are loaded
    setTimeout(() => {
        const theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
        refreshThemeComponents(theme);
    }, 300);
    
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
                
                // Set up theme toggle functionality manually after header is loaded
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    // Update the icon to match current theme
                    if (document.documentElement.classList.contains('light-theme')) {
                        themeToggle.querySelector('i').classList.remove('fa-moon');
                        themeToggle.querySelector('i').classList.add('fa-sun');
                    } else {
                        themeToggle.querySelector('i').classList.remove('fa-sun');
                        themeToggle.querySelector('i').classList.add('fa-moon');
                    }
                    
                    // Add click handler
                    themeToggle.addEventListener('click', function() {
                        document.documentElement.classList.toggle('light-theme');
                        
                        const isLight = document.documentElement.classList.contains('light-theme');
                        
                        if (isLight) {
                            localStorage.setItem('theme', 'light');
                            document.body.style.backgroundColor = '#f5f5f5';
                            document.body.style.color = '#333333';
                            themeToggle.querySelector('i').classList.remove('fa-moon');
                            themeToggle.querySelector('i').classList.add('fa-sun');
                            
                            // Force refresh components
                            refreshThemeComponents('light');
                            
                            document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'light' } }));
                        } else {
                            localStorage.setItem('theme', 'dark');
                            document.body.style.backgroundColor = '#0A0A0A';
                            document.body.style.color = '#9D9D9D';
                            themeToggle.querySelector('i').classList.remove('fa-sun');
                            themeToggle.querySelector('i').classList.add('fa-moon');
                            
                            // Force refresh components
                            refreshThemeComponents('dark');
                            
                            document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: 'dark' } }));
                        }
                    });
                }
                
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
                                        // Check if we're on mobile
                                        if (window.innerWidth <= 480) {
                                            heroSection.style.minHeight = 'max(1500px, 150vh)'; // Even taller on mobile
                                            heroSection.style.padding = 'clamp(5rem, 8vw, 8rem) 0 10rem 0'; // Extra bottom padding
                                            
                                            // Scroll to the active dropdown
                                            setTimeout(() => {
                                                const menuHeader = item.querySelector('.menu-header');
                                                if (menuHeader) {
                                                    menuHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }, 100);
                                        } else {
                                            heroSection.style.minHeight = 'max(900px, 90vh)';
                                            heroSection.style.padding = 'clamp(5rem, 8vw, 8rem) 0';
                                        }
                                    }
                                } else {
                                    // Return to normal height and padding when closing
                                    if (heroSection) {
                                        heroSection.style.minHeight = '';
                                        heroSection.style.padding = '';
                                        
                                        // On mobile, ensure minimum padding at the bottom
                                        if (window.innerWidth <= 480) {
                                            heroSection.style.paddingBottom = '8rem';
                                        }
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
                                
                                // On mobile, ensure minimum padding at the bottom
                                if (window.innerWidth <= 480) {
                                    heroSection.style.paddingBottom = '8rem';
                                }
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
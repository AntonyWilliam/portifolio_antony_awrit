/**
 * Fix to ensure particles animation continues to work after header changes
 * with performance optimizations for different screen sizes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page with particles
    const particlesElement = document.getElementById('particles-js');
    
    // Also add particle effect to the hero-right section
    const particleBackground = document.querySelector('.particle-background');
    
    if (!particlesElement && !particleBackground) return;

    // Detect if device is mobile/tablet for performance optimization
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

    // Adjust particle count based on device
    const particleCount = isMobile ? 40 : (isTablet ? 60 : 80);
    const particleSpeed = isMobile ? 0.4 : 0.6;
    const interactionDistance = isMobile ? 60 : 80;

    // Define particle configurations for both themes with responsive adjustments
    const darkThemeParticles = {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 500 } },
            color: { value: "#ffffff" },
            shape: { type: "triangle" },
            opacity: { value: 0.25, random: false },
            size: { value: 2.5, random: true },
            links: {
                enable: true,
                distance: 70,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: particleSpeed,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce",
                bounce: false
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: { 
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: interactionDistance,
                    duration: 0.4
                }
            }
        },
        detectRetina: true
    };
    
    const lightThemeParticles = {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 500 } },
            color: { 
                value: "#333333"
            },
            shape: { type: "triangle" },
            opacity: { value: 0.15, random: false },
            size: { value: 2.5, random: true },
            links: {
                enable: true,
                distance: 70,
                color: "#333333",
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: particleSpeed,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce",
                bounce: false
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: { 
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: interactionDistance,
                    duration: 0.4
                }
            }
        },
        detectRetina: true
    };
    
    // Listen for window resize to adjust particle count
    window.addEventListener('resize', function() {
        // Only reload particles if size category changes
        const newIsMobile = window.innerWidth <= 768;
        const newIsTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        if (newIsMobile !== isMobile || newIsTablet !== isTablet) {
            // Update the theme if necessary
            if (window.updateParticlesTheme) {
                const theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
                window.updateParticlesTheme(theme);
            }
        }
    });
    
    // Wait until tsParticles is loaded
    const checkParticlesLoaded = setInterval(function() {
        if (typeof tsParticles !== 'undefined') {
            clearInterval(checkParticlesLoaded);
            
            // Initialize particles
            const initialTheme = localStorage.getItem('theme') === 'light';
            tsParticles.load("particles-js", initialTheme ? lightThemeParticles : darkThemeParticles);
            
            // Register the theme toggle function for particles
            window.updateParticlesTheme = function(theme) {
                const isLightTheme = theme === 'light';
                try {
                    // Destroy existing particles instance
                    tsParticles.destroy("particles-js");
                    // Load new particles config
                    tsParticles.load("particles-js", isLightTheme ? lightThemeParticles : darkThemeParticles);
                } catch (e) {
                    console.error("Failed to update particles theme:", e);
                }
            };
            
            // Listen for theme changes from the header
            document.addEventListener('themeChanged', function(e) {
                if (window.updateParticlesTheme) {
                    window.updateParticlesTheme(e.detail.theme);
                }
            });
            
            // Use Intersection Observer to pause animations when not in view
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const container = tsParticles.domItem(0);
                        if (container) {
                            if (!entry.isIntersecting) {
                                // Pause animation when not in view
                                container.pause();
                            } else {
                                // Resume animation when in view
                                container.play();
                            }
                        }
                    });
                }, { threshold: 0.1 });
                
                observer.observe(particlesElement);
            }
        }
    }, 100);
});
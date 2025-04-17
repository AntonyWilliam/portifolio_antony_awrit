/**
 * Simple, reliable typing animation for the homepage
 */
window.addEventListener('load', function() {
    // Wait until page is fully loaded
    setTimeout(function() {
        // Get the typing element
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        // Define the phrases to display
        const phrases = [
            'technical documentation',
            'data-driven documentation',
            'prompt engineering solutions',
            'knowledge dissemination strategies',
            'API documentation',
            'user-friendly guides',
            'technical content that converts'
        ];
        
        // Create a new Typed instance with minimal settings for reliability
        const typed = new Typed('.typing-text', {
            strings: phrases,
            typeSpeed: 40,
            backSpeed: 25,
            backDelay: 1800,
            loop: true,
            cursorChar: '|',
        });
        
        // Style the cursor directly
        const cursor = document.querySelector('.typed-cursor');
        if (cursor) {
            cursor.style.color = '#FFD700';
            cursor.style.fontWeight = 'normal';
            cursor.style.opacity = '0.8';
        }
    }, 500); // Short delay to ensure DOM is ready
});
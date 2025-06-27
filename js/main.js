// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // Add active class to toggle button for animation
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const iconMoon = document.querySelector('.dark-mode-toggle .icon-moon');
    const iconSun = document.querySelector('.dark-mode-toggle .icon-sun');

    if (darkModeToggle && body && iconMoon && iconSun) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-mode') {
            body.classList.add('dark-mode');
            iconMoon.style.display = 'none';
            iconSun.style.display = 'inline-block';
        } else {
            iconMoon.style.display = 'inline-block';
            iconSun.style.display = 'none';
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Toggle icons based on dark mode state
            if (body.classList.contains('dark-mode')) {
                iconMoon.style.display = 'none';
                iconSun.style.display = 'inline-block';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                iconMoon.style.display = 'inline-block';
                iconSun.style.display = 'none';
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    // --- Add Intersection Observer for scroll animations (optional, but good for modern feel) ---
    // This will make sections fade in as they come into view.
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden'); // Ensure it's removed if it was hidden
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Initially hide sections
        sectionObserver.observe(section);
    });

    // Initialize Lucide icons on demand if not already called in HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
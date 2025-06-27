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

    // Intersection Observer for scroll animations
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
                // observer.unobserve(entry.target); // Optional: Stop observing once visible if you only want it to animate once
            } else {
                // If you want animation to re-play on scroll out/in, re-add hidden class
                // entry.target.classList.remove('section-visible');
                // entry.target.classList.add('section-hidden');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Initially hide sections for animation
        sectionObserver.observe(section);
    });

    // FAQ Accordion (for services.html and potentially other pages)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling; // The accordion-content div
            header.classList.toggle('active');

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px'; // Expand to full height
                content.style.paddingTop = '15px'; // Adjust padding after expansion
                content.style.paddingBottom = '15px';
            } else {
                content.style.maxHeight = '0';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
            }
        });
    });

    // Initialize Lucide icons on demand (ensure this is called after elements are in DOM)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
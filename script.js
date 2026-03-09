document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Background on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Very simple toggle for mobile (can be expanded with a proper menu overlay)
            const currentDisplay = navLinks.style.display;
            if (currentDisplay === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinks.style.padding = '2rem 5%';
                navLinks.style.borderBottom = '1px solid var(--clr-border)';
            }
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // If mobile menu is open, close it
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }

                // Scroll to target with offset for navbar
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Duplicate Marquee Content for Seamless Infinite Scroll
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const marqueeContent = document.querySelector('.marquee-content');
        // Clone the content multiple times to make sure it fills wide screens completely
        const clone1 = marqueeContent.cloneNode(true);
        const clone2 = marqueeContent.cloneNode(true);
        marqueeTrack.appendChild(clone1);
        marqueeTrack.appendChild(clone2);
    }

    // 5. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated if you only want it to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => animateOnScroll.observe(el));
});

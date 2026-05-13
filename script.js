/* TEG - The Education Group | Shared Scripts */

// Global Error Handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error('JavaScript Error:', { message, source, lineno, colno, error });
    // Optionally send error to analytics service
    return false;
};

// Performance: Initialize AOS with optimized settings
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: true,
                duration: 800,
                offset: 50,
                throttleDelay: 99
            });
        }
    } catch (error) {
        console.error('AOS initialization error:', error);
    }

    // Performance: Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Performance: Optimized Navbar Scroll Effect
    let lastScrollY = 0;
    const navbarHandler = throttle(() => {
        try {
            const navbar = document.getElementById('navbar');
            const currentScrollY = window.scrollY;
            
            if (navbar && Math.abs(currentScrollY - lastScrollY) > 5) {
                if (currentScrollY > 50) {
                    navbar.classList.add('nav-scrolled');
                    navbar.classList.remove('py-6');
                    navbar.classList.add('py-2');
                } else {
                    navbar.classList.remove('nav-scrolled');
                    navbar.classList.add('py-6');
                    navbar.classList.remove('py-2');
                }
                lastScrollY = currentScrollY;
            }
        } catch (error) {
            console.error('Navbar scroll handler error:', error);
        }
    }, 16); // ~60fps

    // Performance: Use passive event listeners
    window.addEventListener('scroll', navbarHandler, { passive: true });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        try {
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                const totalHeight = document.body.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / totalHeight) * 100;
                progressBar.style.width = progress + '%';
            }
        } catch (error) {
            console.error('Scroll progress bar error:', error);
        }
    }, { passive: true });

    // Mobile Menu Toggle with Enhanced Interactions
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            try {
                mobileMenu.classList.toggle('hidden');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.style.display = 'block';
                    // Trigger reflow for animation
                    mobileMenu.offsetHeight; 
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                }
            } catch (error) {
                console.error('Mobile menu toggle error:', error);
            }
        });
    }

    // Stats Counter Animation
    try {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseFloat(target.innerText.replace(/[^0-9.]/g, ''));
                    if (!isNaN(endValue)) {
                        let startValue = 0;
                        const duration = 2000;
                        const startTime = performance.now();
                        const originalText = target.innerText;
                        const suffix = originalText.replace(/[0-9.]/g, '');

                        function updateCounter(currentTime) {
                            try {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const easeProgress = 1 - Math.pow(1 - progress, 3);
                                const currentVal = Math.floor(easeProgress * endValue);
                                
                                target.innerText = currentVal + suffix;
                                
                                if (progress < 1) {
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    target.innerText = originalText;
                                }
                            } catch (error) {
                                console.error('Counter animation error:', error);
                            }
                        }
                        requestAnimationFrame(updateCounter);
                        statsObserver.unobserve(target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));
    } catch (error) {
        console.error('Stats observer error:', error);
    }

    // Performance: Smooth Scrolling with requestAnimationFrame
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                try {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            const targetY = target.offsetTop - 80;
                            const startY = window.pageYOffset;
                            const distance = targetY - startY;
                            const duration = 800;
                            let start = null;

                            function animation(currentTime) {
                                try {
                                    if (start === null) start = currentTime;
                                    const timeElapsed = currentTime - start;
                                    const progress = Math.min(timeElapsed / duration, 1);
                                    
                                    window.scrollTo(0, startY + distance * progress);
                                    
                                    if (timeElapsed < duration) {
                                        requestAnimationFrame(animation);
                                    }
                                } catch (error) {
                                    console.error('Smooth scroll animation error:', error);
                                }
                            }
                            
                            requestAnimationFrame(animation);
                            
                            // Close mobile menu if open
                            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                                mobileMenu.classList.add('hidden');
                            }
                        }
                    }
                } catch (error) {
                    console.error('Smooth scroll click handler error:', error);
                }
            });
        });
    } catch (error) {
        console.error('Smooth scroll initialization error:', error);
    }

    // Performance: Scroll Top Visibility with throttling
    const scrollTopHandler = throttle(() => {
        try {
            const scrollTop = document.getElementById('scroll-top');
            if (scrollTop) {
                if (window.scrollY > 500) {
                    scrollTop.classList.add('visible');
                } else {
                    scrollTop.classList.remove('visible');
                }
            }
        } catch (error) {
            console.error('Scroll top visibility handler error:', error);
        }
    }, 100);

    window.addEventListener('scroll', scrollTopHandler, { passive: true });

    // Performance: Intersection Observer for lazy elements
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Image Lightbox Functionality
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');
    const galleryImages = document.querySelectorAll('.preview-image');

    if (lightbox && lightboxImg && closeLightbox) {
        function openLightbox(src) {
            try {
                lightboxImg.src = src;
                lightbox.classList.remove('hidden');
                // Use a small timeout to allow display:flex to register before opacity change
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } catch (error) {
                console.error('Open lightbox error:', error);
            }
        }

        function hideLightbox() {
            try {
                lightbox.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    lightbox.classList.add('hidden');
                    lightboxImg.src = '';
                }, 500);
                document.body.style.overflow = ''; // Restore scrolling
            } catch (error) {
                console.error('Hide lightbox error:', error);
            }
        }

        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                openLightbox(img.src);
            });
        });

        closeLightbox.addEventListener('click', hideLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.closest('.relative') === null) {
                hideLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                hideLightbox();
            }
        });
    }
});

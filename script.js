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

    // Mobile Menu Toggle (Premium Overlay)
    const menuBtn = document.getElementById('mobile-menu-button');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menuContent = document.getElementById('menu-content');
    const closeMenuBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('#menu-content a');

    if (menuBtn && menuOverlay && menuContent) {
        const openMenu = () => {
            menuOverlay.classList.remove('hidden');
            setTimeout(() => {
                menuContent.classList.remove('translate-x-full');
                menuContent.classList.add('translate-x-0');
            }, 10);
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            menuContent.classList.remove('translate-x-0');
            menuContent.classList.add('translate-x-full');
            setTimeout(() => {
                menuOverlay.classList.add('hidden');
            }, 700);
            document.body.style.overflow = '';
        };

        menuBtn.addEventListener('click', openMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
        
        // Close on backdrop click
        const backdrop = document.getElementById('menu-backdrop');
        if (backdrop) backdrop.addEventListener('click', closeMenu);

        // Close on link click
        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
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

    // Clickable cards and route-prefilled navigation
    try {
        const isInteractiveElement = (element) => {
            return Boolean(element && element.closest('a, button, input, select, textarea, label, summary'));
        };

        const pageCountryMap = {
            'australia.html': 'Australia',
            'united-kingdom.html': 'United Kingdom',
            'usa.html': 'USA',
            'canada.html': 'Canada',
            'ireland.html': 'Ireland',
            'germany.html': 'Germany',
            'dubai.html': 'Dubai',
            'singapore.html': 'Singapore',
            'italy.html': 'Italy',
            'hungary.html': 'Hungary'
        };

        const scrollToHash = (hash) => {
            const target = document.querySelector(hash);
            if (!target) {
                return;
            }

            const targetY = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        };

        document.querySelectorAll('[data-href]').forEach((card) => {
            const href = card.getAttribute('data-href');
            if (!href) {
                return;
            }

            card.classList.add('cursor-pointer');
            card.setAttribute('role', 'link');
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }

            const navigate = () => {
                if (href.startsWith('#')) {
                    scrollToHash(href);
                    return;
                }

                if (href.startsWith('http')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            };

            card.addEventListener('click', (event) => {
                if (isInteractiveElement(event.target)) {
                    return;
                }
                navigate();
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate();
                }
            });
        });

        const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
        const prefCountry = pageCountryMap[currentPage];

        if (prefCountry) {
            document.querySelectorAll('#colleges .college-card-premium').forEach((card) => {
                if (card.hasAttribute('data-href')) {
                    return;
                }

                const title = card.querySelector('h3');
                if (!title) {
                    return;
                }

                const interest = title.textContent.trim();
                if (!interest) {
                    return;
                }

                card.setAttribute(
                    'data-href',
                    `contact.html?country=${encodeURIComponent(prefCountry)}&interest=${encodeURIComponent(interest)}#contact-form`
                );
            });
        }
    } catch (error) {
        console.error('Card navigation initialization error:', error);
    }

    // Highlight the active page tab in the shared navigation
    try {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            const path = window.location.pathname;
            let currentPage = path.split('/').pop().toLowerCase();
            
            // Handle directory paths (like '/' or '/about/')
            if (!currentPage || currentPage === '') {
                currentPage = 'index.html';
            }
            
            const navLinks = Array.from(navbar.querySelectorAll('a[href]')).filter((link) => {
                return !link.classList.contains('btn-brand') && !link.querySelector('img');
            });
            
            const activeRouteMap = {
                'index.html': ['index.html', 'index', '', '/'],
                'about.html': ['about.html', 'about'],
                'services.html': ['services.html', 'services', 'btec.html'],
                'btec.html': ['services.html', 'services', 'btec.html'],
                'study-abroad.html': ['study-abroad.html', 'study-abroad'],
                'happy-students.html': ['happy-students.html', 'happy-students', 'students']
            };

            // Find which logical page we are on
            let logicalPage = currentPage;
            for (const [key, aliases] of Object.entries(activeRouteMap)) {
                if (aliases.includes(currentPage) || currentPage === key) {
                    logicalPage = key;
                    break;
                }
            }

            const activeTargets = activeRouteMap[logicalPage] || [logicalPage];

            navLinks.forEach((link) => {
                link.classList.remove('nav-link-active');
                link.removeAttribute('aria-current');
                
                const rawHref = link.getAttribute('href').split('#')[0];
                const href = rawHref.split('/').pop().toLowerCase() || 'index.html';
                const isHome = href === 'index.html' || href === 'index' || href === '';
                
                // Check if this link matches the logical page or any of its aliases
                if (activeTargets.includes(href) || (logicalPage === 'index.html' && isHome)) {
                    link.classList.add('nav-link-active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        }
    } catch (error) {
        console.error('Navigation highlight error:', error);
    }

    // Prefill contact forms from route query parameters
    try {
        const params = new URLSearchParams(window.location.search);
        const prefCountry = params.get('country');
        const prefInterest = params.get('interest');

        if (prefCountry || prefInterest) {
            document.querySelectorAll('form#contact-form').forEach((form) => {
                const countryField = form.querySelector('[name="country"]');
                const interestField = form.querySelector('[name="interest"]');

                if (countryField && prefCountry) {
                    const countryValue = prefCountry.toLowerCase().trim();
                    const matchingOption = Array.from(countryField.options).find((option) => {
                        const optionValue = (option.value || '').toLowerCase().trim();
                        const optionLabel = (option.textContent || '').toLowerCase().trim();
                        return optionValue === countryValue || optionLabel === countryValue;
                    });

                    if (matchingOption) {
                        countryField.value = matchingOption.value;
                    }
                }

                if (interestField && prefInterest) {
                    interestField.value = prefInterest;
                }
            });
        }
    } catch (error) {
        console.error('Contact route prefill error:', error);
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

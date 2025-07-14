// ===========================
// ELEGANT BIB & TUCKER CAMPAIGN
// Enhanced JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ===========================
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                }
            }
        });
    });

    // ===========================
    // NAVBAR ENHANCEMENTS
    // ===========================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and background on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScroll = currentScroll;
    });

    // ===========================
    // INTERSECTION OBSERVER
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate children with stagger
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
    
    // Observe cards and elements
    const animateElements = document.querySelectorAll(
        '.ecosystem-card, .product-card, .investment-block, .timeline-phase, ' +
        '.benefit-card, .feature-card, .pillar, .deliverable, .benefit-item'
    );
    animateElements.forEach(element => {
        element.classList.add('animate-child');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // ===========================
    // COUNTER ANIMATION
    // ===========================
    const animateCounter = (element, target, duration = 2000, suffix = '') => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (suffix === '$') {
                    element.textContent = '$' + Math.floor(current).toLocaleString();
                } else if (suffix === 'M+') {
                    element.textContent = Math.floor(current) + 'M+';
                } else if (suffix === '%') {
                    element.textContent = Math.floor(current) + '%';
                } else if (suffix === 'K') {
                    element.textContent = '$' + Math.floor(current) + 'K';
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = element.getAttribute('data-target');
            }
        };
        
        updateCounter();
    };
    
    // Observe numbers
    const statNumbers = document.querySelectorAll(
        '.stat-number, .metric-number, .investment-amount, .stat-big'
    );
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const text = entry.target.textContent;
                entry.target.setAttribute('data-target', text);
                
                // Extract number and suffix
                let number = parseInt(text.replace(/[^0-9]/g, ''));
                let suffix = '';
                
                if (text.includes('$') && text.includes('K')) {
                    suffix = 'K';
                } else if (text.includes('$')) {
                    suffix = '$';
                } else if (text.includes('M+')) {
                    suffix = 'M+';
                } else if (text.includes('%')) {
                    suffix = '%';
                }
                
                if (!isNaN(number)) {
                    animateCounter(entry.target, number, 2000, suffix);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => numberObserver.observe(stat));

    // ===========================
    // PARALLAX EFFECT
    // ===========================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 1.5));
        }
    });

    // ===========================
    // HOVER EFFECTS
    // ===========================
    const addHoverEffect = (selector, scale = 1.02) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = `scale(${scale})`;
            });
            el.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    };
    
    addHoverEffect('.stat', 1.05);
    addHoverEffect('.partner-logo', 1.1);

    // ===========================
    // ACTIVE NAVIGATION
    // ===========================
    const navSections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // ===========================
    // MOBILE MENU
    // ===========================
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const menuButton = document.createElement('button');
            menuButton.className = 'mobile-menu-toggle';
            menuButton.innerHTML = '<span></span><span></span><span></span>';
            
            navContainer.appendChild(menuButton);
            
            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-active');
                menuButton.classList.toggle('active');
            });
        }
    };
    
    createMobileMenu();
    
    // Handle resize
    window.addEventListener('resize', () => {
        createMobileMenu();
        
        const menuButton = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth > 768) {
            if (menuButton) menuButton.style.display = 'none';
            navMenu.classList.remove('mobile-active');
        } else {
            if (menuButton) menuButton.style.display = 'flex';
        }
    });

    // ===========================
    // TIME-BASED CONTENT
    // ===========================
    const updateTimeBasedContent = () => {
        const hour = new Date().getHours();
        const heroOverlay = document.querySelector('.hero-overlay');
        
        if (hour >= 6 && hour < 12) {
            // Morning
            if (heroOverlay) {
                heroOverlay.style.background = 'radial-gradient(circle at center, transparent 0%, rgba(255,215,0,0.1) 100%)';
            }
        } else if (hour >= 12 && hour < 17) {
            // Afternoon
            if (heroOverlay) {
                heroOverlay.style.background = 'radial-gradient(circle at center, transparent 0%, rgba(255,140,0,0.1) 100%)';
            }
        } else {
            // Evening
            if (heroOverlay) {
                heroOverlay.style.background = 'radial-gradient(circle at center, transparent 0%, rgba(139,0,0,0.1) 100%)';
            }
        }
    };
    
    updateTimeBasedContent();

    // ===========================
    // PRINT FUNCTIONALITY
    // ===========================
    const addPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.className = 'print-button';
        printBtn.innerHTML = '🖨️ Print Proposal';
        printBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--bourbon-brown);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        printBtn.addEventListener('mouseenter', () => {
            printBtn.style.transform = 'translateY(-2px)';
            printBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        printBtn.addEventListener('mouseleave', () => {
            printBtn.style.transform = 'translateY(0)';
            printBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        
        document.body.appendChild(printBtn);
    };
    
    addPrintButton();

    // ===========================
    // LAZY LOAD IMAGES
    // ===========================
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });

    // ===========================
    // SMOOTH REVEAL ANIMATIONS
    // ===========================
    const revealElements = document.querySelectorAll(
        '.pillar-number, .phase-date, .product-badge, .redemption-badge'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1) rotate(0deg)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8) rotate(-10deg)';
        el.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        revealObserver.observe(el);
    });

    console.log('Bib & Tucker Campaign - Enhanced Experience Loaded');
});

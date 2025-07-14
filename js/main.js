// ===========================
// ELEGANT BIB & TUCKER CAMPAIGN
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
            }
        });
    });

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // ===========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
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
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
    
    // Observe cards and grid items
    const animateElements = document.querySelectorAll(
        '.ecosystem-card, .product-card, .investment-category, .timeline-item, .benefit'
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
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = element.textContent.includes('$') 
                    ? '$' + Math.floor(current).toLocaleString()
                    : element.textContent.includes('M')
                    ? Math.floor(current) + 'M+'
                    : element.textContent.includes('%')
                    ? Math.floor(current) + '%'
                    : Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = element.getAttribute('data-target');
            }
        };
        
        updateCounter();
    };
    
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat h3, .metric-value');
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const text = entry.target.textContent;
                entry.target.setAttribute('data-target', text);
                
                // Extract number from text
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(number)) {
                    animateCounter(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => numberObserver.observe(stat));

    // ===========================
    // PARALLAX EFFECT FOR HERO
    // ===========================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // ===========================
    // HOVER EFFECTS FOR CARDS
    // ===========================
    const cards = document.querySelectorAll('.product-card, .ecosystem-card, .investment-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===========================
    // TIME-BASED CONTENT HINT
    // ===========================
    const updateTimeBasedContent = () => {
        const hour = new Date().getHours();
        const heroBackground = document.querySelector('.hero');
        
        if (hour >= 6 && hour < 12) {
            // Morning theme
            heroBackground.style.background = 'linear-gradient(135deg, #FAF8F3 0%, #FFE4B5 100%)';
        } else if (hour >= 12 && hour < 17) {
            // Afternoon theme
            heroBackground.style.background = 'linear-gradient(135deg, #FAF8F3 0%, #FFDAB9 100%)';
        } else {
            // Evening theme
            heroBackground.style.background = 'linear-gradient(135deg, #FAF8F3 0%, #E8D5B7 100%)';
        }
    };
    
    updateTimeBasedContent();

    // ===========================
    // SMOOTH REVEAL FOR TIMELINE
    // ===========================
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        timelineObserver.observe(item);
    });

    // ===========================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ===========================
    const sections2 = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections2.forEach(section => {
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
    // MOBILE MENU TOGGLE (if needed)
    // ===========================
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '<span></span><span></span><span></span>';
        menuButton.style.display = window.innerWidth <= 768 ? 'block' : 'none';
        
        navContainer.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-active');
        });
    };
    
    // Check if mobile menu is needed
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        const menuButton = document.querySelector('.mobile-menu-toggle');
        if (menuButton) {
            menuButton.style.display = window.innerWidth <= 768 ? 'block' : 'none';
        }
    });

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

    console.log('Bib & Tucker Campaign site initialized successfully!');
});

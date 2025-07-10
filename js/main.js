// ===========================
// MAIN JAVASCRIPT
// ===========================

// DOM Elements - Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // PRELOADER
    // ===========================
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hide');
            }
            initializeAnimations();
        }, 1500);
    });
    
    // Fallback - hide preloader after 3 seconds regardless
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
            initializeAnimations();
        }
    }, 3000);
    
    // Get DOM elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const timeWidget = document.getElementById('currentTime');
    const heroBgs = document.querySelectorAll('.hero-bg');
    const navLinks = document.querySelectorAll('.nav-link');

    // ===========================
    // NAVIGATION
    // ===========================

    // Navbar Scroll Effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active Navigation Link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ===========================
    // TIME-BASED CONTENT
    // ===========================
    function updateTimeBasedContent() {
        const hour = new Date().getHours();
        let timeOfDay = 'Morning';
        let activeBg = 'morning';
        
        if (hour >= 6 && hour < 12) {
            timeOfDay = 'Morning';
            activeBg = 'morning';
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'Afternoon';
            activeBg = 'transition';
        } else {
            timeOfDay = 'Evening';
            activeBg = 'evening';
        }
        
        // Update time widget
        if (timeWidget) {
            timeWidget.textContent = timeOfDay;
        }
        
        // Update hero background
        heroBgs.forEach(bg => {
            bg.classList.remove('active');
            if (bg.classList.contains(activeBg)) {
                bg.classList.add('active');
            }
        });
    }

    // Update time-based content every minute
    updateTimeBasedContent();
    setInterval(updateTimeBasedContent, 60000);

    // ===========================
    // SMOOTH SCROLLING
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // PARALLAX EFFECT
    // ===========================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

}); // End of DOMContentLoaded

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===========================
// BUDGET CHART
// ===========================
function initializeBudgetChart() {
    const ctx = document.getElementById('budgetChart');
    
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Whisky Advocate', 'Trade & Events', 'Digital Experience'],
                datasets: [{
                    data: [321510, 86697, 41793],
                    backgroundColor: [
                        '#8B0000',
                        '#FFD700',
                        '#5c0000'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            color: '#ffffff',
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = '$' + context.parsed.toLocaleString();
                                const total = 450000;
                                const percentage = Math.round((context.parsed / total) * 100);
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}

// ===========================
// TILT EFFECT
// ===========================
function initializeTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===========================
// TIMELINE ANIMATION
// ===========================
function animateTimeline() {
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-progress')) {
                    entry.target.classList.add('animate');
                }
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (timelineProgress) {
        observer.observe(timelineProgress);
    }
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-fade-up, .animate-timeline');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// ===========================
// INITIALIZE ALL
// ===========================
function initializeAnimations() {
    animateCounters();
    initializeBudgetChart();
    initializeTiltEffect();
    animateTimeline();
    initializeScrollAnimations();
}

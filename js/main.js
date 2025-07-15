// Main JavaScript for Bib & Tucker Campaign

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    // Dynamic Time-Based Hero Overlay
    const heroOverlay = document.querySelector('.hero-overlay');
    
    function updateHeroOverlay() {
        const hour = new Date().getHours();
        
        if (hour >= 6 && hour < 12) {
            // Morning
            heroOverlay.style.background = 'linear-gradient(rgba(255, 215, 0, 0.3), rgba(0, 0, 0, 0.4))';
        } else if (hour >= 12 && hour < 17) {
            // Afternoon
            heroOverlay.style.background = 'linear-gradient(rgba(255, 165, 0, 0.3), rgba(0, 0, 0, 0.4))';
        } else if (hour >= 17 && hour < 23) {
            // Evening
            heroOverlay.style.background = 'linear-gradient(rgba(184, 115, 51, 0.3), rgba(0, 0, 0, 0.4))';
        } else {
            // Late Night
            heroOverlay.style.background = 'linear-gradient(rgba(75, 0, 130, 0.3), rgba(0, 0, 0, 0.4))';
        }
    }
    
    updateHeroOverlay();
    setInterval(updateHeroOverlay, 60000); // Update every minute
    
    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.ecosystem-card, .extension-card, .media-card, .timeline-item, .reporting-card, .objective-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('M+')) {
                element.textContent = Math.floor(current) + 'M+';
            } else if (element.textContent.includes('K')) {
                element.textContent = '$' + Math.floor(current) + 'K';
            } else if (element.textContent.includes('%')) {
                element.textContent = '≥' + Math.floor(current) + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 16);
    }
    
    // Trigger counter animation when stats are visible
    const statValues = document.querySelectorAll('.stat-value, .kpi-value');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const text = entry.target.textContent;
                let targetValue = 0;
                
                if (text.includes('479K')) targetValue = 479;
                else if (text.includes('12M+')) targetValue = 12;
                else if (text.includes('15,000+')) targetValue = 15000;
                else if (text.includes('25,000+')) targetValue = 25000;
                else if (text.includes('≥15%')) targetValue = 15;
                else if (text.includes('≥5%')) targetValue = 5;
                else if (text.includes('1M+')) targetValue = 1;
                
                if (targetValue > 0) {
                    animateCounter(entry.target, targetValue);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
        statObserver.observe(stat);
    });
    
    // Investment Chart Hover Effects
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Add active state to current nav item based on scroll
    window.addEventListener('scrol

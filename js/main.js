// ===========================
// BIB & TUCKER CAMPAIGN JAVASCRIPT
// Enhanced functionality for the time-intelligent campaign
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollEffects();
    initTimeBasedContent();
    initPrintFunctionality();
    initTimePartingShowcase();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
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
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat, .day-part, .tactic-card, .product-card, .result-card, .timeline-phase, .feature-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Time-based content functionality
function initTimeBasedContent() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    // Update hero content based on time of day
    updateHeroContent(currentHour);
    
    // Update time badges
    updateTimeBadges(currentHour);
}

function updateHeroContent(hour) {
    const heroDynamic = document.querySelector('.hero-dynamic');
    if (!heroDynamic) return;
    
    let timeMessage = '';
    let timeClass = '';
    
    if (hour >= 6 && hour < 12) {
        timeMessage = 'Early Ritual';
        timeClass = 'early';
    } else if (hour >= 12 && hour < 17) {
        timeMessage = 'Afternoon Transition';
        timeClass = 'afternoon';
    } else if (hour >= 17 && hour < 23) {
        timeMessage = 'Evening Excellence';
        timeClass = 'evening';
    } else {
        timeMessage = 'Night Cap';
        timeClass = 'night';
    }
    
    heroDynamic.textContent = timeMessage;
    heroDynamic.className = `hero-dynamic ${timeClass}`;
}

function updateTimeBadges(hour) {
    const timeBadges = document.querySelectorAll('.time-badge');
    
    timeBadges.forEach(badge => {
        const badgeText = badge.textContent;
        if (badgeText.includes('6 AM - 12 PM') && hour >= 6 && hour < 12) {
            badge.style.background = 'var(--aged-gold)';
            badge.style.color = 'var(--bourbon-brown)';
        } else if (badgeText.includes('12 PM - 5 PM') && hour >= 12 && hour < 17) {
            badge.style.background = 'var(--coffee-brown)';
            badge.style.color = 'var(--white)';
        } else if (badgeText.includes('5 PM - 11 PM') && hour >= 17 && hour < 23) {
            badge.style.background = 'var(--grill-char)';
            badge.style.color = 'var(--white)';
        }
    });
}

// Print functionality
function initPrintFunctionality() {
    // Add print button functionality
    const printButtons = document.querySelectorAll('.btn-secondary');
    
    printButtons.forEach(button => {
        if (button.textContent.includes('Print')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.print();
            });
        }
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

// Add hover effects for interactive elements
function initHoverEffects() {
    const interactiveElements = document.querySelectorAll('.stat, .day-part, .tactic-card, .product-card, .result-card, .feature-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initImageLoading();
    initHoverEffects();
    
    // Add current year to footer
    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-overlay');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const activeElements = document.querySelectorAll('.active, .open');
        activeElements.forEach(element => {
            element.classList.remove('active', 'open');
        });
    }
});

// Add touch support for mobile devices
function initTouchSupport() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger next section
                console.log('Swipe up detected');
            } else {
                // Swipe down - could trigger previous section
                console.log('Swipe down detected');
            }
        }
    }
}

// Initialize touch support
if ('ontouchstart' in window) {
    initTouchSupport();
}

// Add analytics tracking for campaign engagement
function trackEngagement(action, section) {
    // This would integrate with your analytics platform
    console.log(`Engagement tracked: ${action} in ${section}`);
    
    // Example: Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'campaign_engagement',
            'event_label': section
        });
    }
}

// Track section visibility for engagement metrics
function initEngagementTracking() {
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                trackEngagement('section_view', sectionId);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize engagement tracking
document.addEventListener('DOMContentLoaded', function() {
    initEngagementTracking();
});

// Add print-specific functionality
function prepareForPrint() {
    // Hide non-essential elements before printing
    const elementsToHide = document.querySelectorAll('.navbar, .hero-cta, .btn-primary, .btn-secondary');
    
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });
    
    // Ensure proper page breaks
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.pageBreakInside = 'avoid';
    });
}

// Listen for print events
window.addEventListener('beforeprint', prepareForPrint);

// Restore elements after printing
window.addEventListener('afterprint', function() {
    const elementsToShow = document.querySelectorAll('.navbar, .hero-cta, .btn-primary, .btn-secondary');
    
    elementsToShow.forEach(element => {
        element.style.display = '';
    });
});

// Export functions for global access
window.BibTuckerCampaign = {
    scrollToSection,
    trackEngagement,
    updateTimeBasedContent: initTimeBasedContent
};

// Time-Parting Showcase functionality
function initTimePartingShowcase() {
    const legendItems = document.querySelectorAll('.legend-item');
    const contentPreviews = document.querySelectorAll('.content-preview');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    
    if (!legendItems.length || !contentPreviews.length) return;
    
    // Define time periods array first
    const timePeriods = ['morning', 'midday', 'night', 'late-night'];
    let currentTimeIndex = 0;
    
    // Function to update slide
    function updateSlide(index) {
        currentTimeIndex = index;
        const selectedTime = timePeriods[index];
        
        // Update active legend item
        legendItems.forEach(item => item.classList.remove('active'));
        const activeLegendItem = legendItems[index];
        if (activeLegendItem) activeLegendItem.classList.add('active');
        
        // Update content display
        contentPreviews.forEach(preview => {
            preview.classList.remove('active');
            if (preview.getAttribute('data-time') === selectedTime) {
                preview.classList.add('active');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Track interaction
        trackEngagement('time_parting_switch', selectedTime);
    }
    
    // Add click event listeners to legend items
    legendItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateSlide(index);
        });
    });
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index);
        });
    });
    
    // Add navigation arrow functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentTimeIndex - 1 + timePeriods.length) % timePeriods.length;
            updateSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentTimeIndex + 1) % timePeriods.length;
            updateSlide(newIndex);
        });
    }
    
    // Auto-rotate through time periods (optional)
    function autoRotate() {
        const nextIndex = (currentTimeIndex + 1) % timePeriods.length;
        updateSlide(nextIndex);
    }
    
    // Auto-rotate every 3 seconds
    let autoRotateInterval = setInterval(autoRotate, 3000);
    
    // Pause auto-rotation on hover
    const showcase = document.querySelector('.time-parting-showcase');
    if (showcase) {
        showcase.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });
        
        showcase.addEventListener('mouseleave', () => {
            autoRotateInterval = setInterval(autoRotate, 3000);
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            
            if (e.key === 'ArrowLeft') {
                const newIndex = (currentTimeIndex - 1 + timePeriods.length) % timePeriods.length;
                updateSlide(newIndex);
            } else {
                const newIndex = (currentTimeIndex + 1) % timePeriods.length;
                updateSlide(newIndex);
            }
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    showcase.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    showcase.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                const newIndex = (currentTimeIndex + 1) % timePeriods.length;
                updateSlide(newIndex);
            } else {
                // Swipe right - previous
                const newIndex = (currentTimeIndex - 1 + timePeriods.length) % timePeriods.length;
                updateSlide(newIndex);
            }
        }
    }
}





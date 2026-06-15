// ========================================
// DOM ELEMENTS
// ========================================
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const scrollTopBtn = document.getElementById('scrollTop');
const quoteForm = document.getElementById('quoteForm');
const faqItems = document.querySelectorAll('.faq-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// ========================================
// HEADER SCROLL EFFECT
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollTopBtn.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        scrollTopBtn.classList.remove('visible');
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========================================
// SCROLL TO TOP
// ========================================
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL TO SECTIONS
// ========================================
function scrollToQuote() {
    document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
}

function scrollToProcess() {
    document.getElementById('process').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// ========================================
// BEFORE/AFTER SLIDER FUNCTIONALITY
// ========================================
document.querySelectorAll('.before-after-slider').forEach(slider => {
    const rangeInput = slider.querySelector('.slider');
    const beforeOverlay = slider.querySelector('.before-overlay');
    
    rangeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        beforeOverlay.style.width = `${value}%`;
    });
    
    // Touch support
    let isDragging = false;
    
    slider.addEventListener('mousedown', () => isDragging = true);
    slider.addEventListener('mouseup', () => isDragging = false);
    slider.addEventListener('mouseleave', () => isDragging = false);
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        const clamped = Math.max(0, Math.min(100, percentage));
        
        beforeOverlay.style.width = `${clamped}%`;
        rangeInput.value = clamped;
    });
});

// ========================================
// FAQ ACCORDION
// ========================================
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// GALLERY FILTER
// ========================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// INSTANT QUOTE CALCULATOR
// ========================================
const pricingData = {
    compact: {
        single: { economy: [299, 399], standard: [499, 599], premium: [799, 999], custom: [1099, 1399] },
        bumper: { economy: [249, 349], standard: [399, 499], premium: [699, 899], custom: [999, 1299] },
        partial: { economy: [599, 799], standard: [899, 1099], premium: [1399, 1699], custom: [1899, 2299] },
        full: { economy: [899, 1199], standard: [1499, 1899], premium: [2499, 2999], custom: [3499, 4299] },
        colorchange: { economy: [1199, 1499], standard: [1899, 2399], premium: [2999, 3699], custom: [4299, 5299] }
    },
    sedan: {
        single: { economy: [349, 449], standard: [599, 699], premium: [899, 1099], custom: [1299, 1599] },
        bumper: { economy: [299, 399], standard: [499, 599], premium: [799, 999], custom: [1199, 1499] },
        partial: { economy: [699, 899], standard: [1099, 1299], premium: [1699, 1999], custom: [2299, 2699] },
        full: { economy: [1099, 1399], standard: [1899, 2299], premium: [2999, 3499], custom: [4299, 5099] },
        colorchange: { economy: [1499, 1799], standard: [2399, 2899], premium: [3699, 4399], custom: [5299, 6299] }
    },
    suv: {
        single: { economy: [399, 499], standard: [699, 799], premium: [999, 1199], custom: [1499, 1799] },
        bumper: { economy: [349, 449], standard: [599, 699], premium: [899, 1099], custom: [1399, 1699] },
        partial: { economy: [799, 999], standard: [1299, 1499], premium: [1999, 2299], custom: [2699, 3099] },
        full: { economy: [1299, 1599], standard: [2199, 2599], premium: [3499, 3999], custom: [4999, 5799] },
        colorchange: { economy: [1799, 2099], standard: [2899, 3399], premium: [4399, 5099], custom: [6299, 7299] }
    },
    truck: {
        single: { economy: [449, 549], standard: [799, 899], premium: [1199, 1399], custom: [1699, 1999] },
        bumper: { economy: [399, 499], standard: [699, 799], premium: [1099, 1299], custom: [1599, 1899] },
        partial: { economy: [899, 1099], standard: [1499, 1699], premium: [2299, 2599], custom: [3099, 3499] },
        full: { economy: [1499, 1799], standard: [2499, 2899], premium: [3999, 4499], custom: [5699, 6499] },
        colorchange: { economy: [2099, 2399], standard: [3299, 3799], premium: [4999, 5699], custom: [7199, 8199] }
    },
    luxury: {
        single: { economy: [599, 699], standard: [999, 1199], premium: [1499, 1799], custom: [2199, 2599] },
        bumper: { economy: [499, 599], standard: [899, 1099], premium: [1399, 1699], custom: [2099, 2499] },
        partial: { economy: [1199, 1399], standard: [1899, 2199], premium: [2899, 3299], custom: [3999, 4499] },
        full: { economy: [1899, 2299], standard: [3199, 3699], premium: [4999, 5699], custom: [7199, 8199] },
        colorchange: { economy: [2599, 2999], standard: [4199, 4799], premium: [6399, 7199], custom: [9199, 10499] }
    }
};

const turnaroundTimes = {
    economy: '24-48 hours',
    standard: '48 hours',
    premium: '48-72 hours',
    custom: '72-96 hours'
};

function calculateQuote() {
    const vehicleSize = document.getElementById('vehicleSize').value;
    const serviceType = document.getElementById('serviceType').value;
    const paintQuality = document.getElementById('paintQuality').value;
    
    if (!vehicleSize || !serviceType) {
        return;
    }
    
    const price = pricingData[vehicleSize][serviceType][paintQuality];
    const time = turnaroundTimes[paintQuality];
    
    const priceRange = document.getElementById('priceRange');
    const timeEstimate = document.getElementById('timeEstimate');
    
    // Animate the price change
    priceRange.style.opacity = '0';
    setTimeout(() => {
        priceRange.textContent = `$${price[0]} - $${price[1]}`;
        timeEstimate.textContent = `Turnaround: ${time}`;
        priceRange.style.opacity = '1';
    }, 200);
}

// Add event listeners to calculator inputs
document.getElementById('vehicleSize').addEventListener('change', calculateQuote);
document.getElementById('serviceType').addEventListener('change', calculateQuote);
document.getElementById('paintQuality').addEventListener('change', calculateQuote);

// ========================================
// FORM SUBMISSION
// ========================================
quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Gather form data
    const formData = {
        vehicleSize: document.getElementById('vehicleSize').value,
        serviceType: document.getElementById('serviceType').value,
        paintQuality: document.getElementById('paintQuality').value,
        condition: document.getElementById('condition').value,
        notes: document.getElementById('additionalNotes').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };
    
    try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In production, you would send this to your server:
        // const response = await fetch('/api/quote', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
        
        // Show success message
        alert(`Thank you ${formData.name}! Your quote request has been received. We'll contact you at ${formData.phone} within 2 hours with your detailed estimate.`);
        
        // Reset form
        quoteForm.reset();
        document.getElementById('priceRange').textContent = '$0 - $0';
        document.getElementById('timeEstimate').textContent = 'Turnaround: --';
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error submitting your request. Please call us directly at (123) 456-7890.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});

// ========================================
// PACKAGE SELECTION
// ========================================
function selectPackage(packageType) {
    scrollToQuote();
    
    // Pre-select the package in the calculator
    const serviceType = document.getElementById('serviceType');
    const paintQuality = document.getElementById('paintQuality');
    
    if (packageType === 'economy') {
        paintQuality.value = 'economy';
    } else if (packageType === 'standard') {
        serviceType.value = 'full';
        paintQuality.value = 'standard';
    } else if (packageType === 'premium') {
        serviceType.value = 'full';
        paintQuality.value = 'premium';
    }
    
    // Trigger calculation
    calculateQuote();
    
    // Highlight the form
    const form = document.querySelector('.calculator-wrapper');
    form.style.transform = 'scale(1.02)';
    form.style.borderColor = 'var(--accent-red)';
    setTimeout(() => {
        form.style.transform = 'scale(1)';
        form.style.borderColor = 'var(--border-color)';
    }, 500);
}

// ========================================
// PHONE NUMBER FORMATTING
// ========================================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
    });
}

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ========================================
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

// ========================================
// ANALYTICS TRACKING (Google Analytics Example)
// ========================================
function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Log for debugging
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track CTA clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        trackEvent('CTA', 'Click', text);
    });
});

// Track form submissions
document.getElementById('quoteForm').addEventListener('submit', () => {
    trackEvent('Form', 'Submit', 'Quote Request');
});

// ========================================
// EMERGENCY MODE (Optional Feature)
// ========================================
// Uncomment to enable emergency/rush service banner
/*
function checkEmergencyMode() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // If it's Friday after 2 PM, show emergency banner
    if (day === 5 && hour >= 14) {
        const banner = document.createElement('div');
        banner.className = 'emergency-banner';
        banner.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Weekend Rush Available!</strong> 
            Book within the next 2 hours for Saturday service. 
            <button onclick="scrollToQuote()">Book Now</button>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
    }
}

// checkEmergencyMode();
*/

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Express AutoPaint website loaded successfully!');
    
    // Add any additional initialization code here
});

// ========================================
// SERVICE WORKER REGISTRATION (For PWA)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registration successful');
        //     })
        //     .catch(err => {
        //         console.log('ServiceWorker registration failed: ', err);
        //     });
    });
}
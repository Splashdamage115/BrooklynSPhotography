// Wedding Photography Website - JavaScript Functionality
// Lightbox and Mobile Navigation Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSimpleMobileMenu();
    initLightbox();
    initContactForm();
});

// ======================================================================
// NEW SIMPLE MOBILE MENU
// ======================================================================

function initSimpleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobilePanel = document.querySelector('.mobile-menu-panel');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileToggle || !mobilePanel || !mobileOverlay) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = mobilePanel.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when clicking X button
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside (keeping existing functionality)
    document.addEventListener('click', function(e) {
        if (mobilePanel.classList.contains('active') &&
            !mobileToggle.contains(e.target) &&
            !mobilePanel.contains(e.target) &&
            !mobileOverlay.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobilePanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        mobilePanel.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        if (mobileClose) {
            setTimeout(() => mobileClose.focus(), 100);
        }
    }

    function closeMobileMenu() {
        mobilePanel.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// ======================================================================
// LIGHTBOX FUNCTIONALITY
// ======================================================================

function initLightbox() {
    const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCounter = document.querySelector('.lightbox-counter');

    if (!lightbox || !lightboxImage || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.src,
        alt: item.alt || 'Gallery image'
    }));

    // Open lightbox when clicking gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Navigate images
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Close lightbox when clicking backdrop
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        if (lightboxClose) {
            lightboxClose.focus();
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPreviousImage() {
        currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateLightboxImage();
    }

    function showNextImage() {
        currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        const image = images[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        }
    }
}

// ======================================================================
// SMOOTH SCROLLING ENHANCEMENT
// ======================================================================

// Enhance smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ======================================================================
// PERFORMANCE OPTIMIZATIONS
// ======================================================================

// Lazy loading for images (if intersection observer is supported)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ======================================================================
// ACCESSIBILITY ENHANCEMENTS
// ======================================================================

// Add proper focus management for skip links
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
            target.addEventListener('blur', function() {
                target.removeAttribute('tabindex');
            }, { once: true });
        }
    });
}

// Improve button accessibility
document.querySelectorAll('button, [role="button"]').forEach(button => {
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ======================================================================
// EMAILJS CONTACT FORM FUNCTIONALITY
// ======================================================================

function initContactForm() {
    // EmailJS Configuration - Replace with your actual values
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_d4kaear',
        TEMPLATE_ID: 'template_fxi1pnk',
        PUBLIC_KEY: 'x8loTAwaMYs4YEDfW'
    };

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const submitButton = contactForm.querySelector('.submit-button');
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoading = submitButton.querySelector('.submit-loading');
    const formStatus = document.getElementById('form-status');
    const statusMessage = formStatus.querySelector('.status-message');

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Collect form data
            const formData = collectFormData();
            
            // Send email via EmailJS
            await sendEmail(formData);
            
            // Show success message
            showStatusMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showStatusMessage('error', 'Sorry, there was an error sending your message. Please try again or contact me directly at hello@brooklynsphoto.com');
        } finally {
            setLoadingState(false);
        }
    });

    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Required field validation
        const requiredFields = [
            { id: 'name', message: 'Please enter your name' },
            { id: 'email', message: 'Please enter your email address' },
            { id: 'message', message: 'Please enter your message' }
        ];

        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();
            
            if (!value) {
                showFieldError(field.id, field.message);
                isValid = false;
            }
        });

        // Email format validation
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        if (emailValue && !isValidEmail(emailValue)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show field error
    function showFieldError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
            inputElement.setAttribute('aria-invalid', 'true');
        }
    }

    // Clear all form errors
    function clearFormErrors() {
        const errorElements = contactForm.querySelectorAll('.error-message');
        const inputElements = contactForm.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
            element.removeAttribute('aria-invalid');
        });

        // Hide status message
        formStatus.style.display = 'none';
    }

    // Collect form data
    function collectFormData() {
        const formData = new FormData(contactForm);
        const data = {};

        // Get basic form fields
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Map form field names to template variables
        return {
            name: data.name || '',
            partner_name: data['partner-name'] || '',
            email: data.email || '',
            phone: data.phone || '',
            wedding_date: data['event-date'] || '',
            wedding_venue: data.venue || '',
            guest_count: data['guest-count'] || '',
            message: data.message || '',
            how_heard: data['how-heard'] || ''
        };
    }

    // Send email via EmailJS
    async function sendEmail(templateParams) {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
    }

    // Set loading state
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitText.style.display = 'none';
            submitLoading.style.display = 'inline';
            submitButton.classList.add('loading');
        } else {
            submitButton.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
            submitButton.classList.remove('loading');
        }
    }

    // Show status message
    function showStatusMessage(type, message) {
        statusMessage.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Scroll to message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Real-time validation for better UX
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            // Clear previous error for this field
            const errorElement = document.getElementById(`${fieldId}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            this.classList.remove('error');
            this.removeAttribute('aria-invalid');

            // Validate if field is required
            if (fieldId === 'name' && !value) {
                showFieldError(fieldId, 'Please enter your name');
            } else if (fieldId === 'email') {
                if (!value) {
                    showFieldError(fieldId, 'Please enter your email address');
                } else if (!isValidEmail(value)) {
                    showFieldError(fieldId, 'Please enter a valid email address');
                }
            } else if (fieldId === 'message' && !value) {
                showFieldError(fieldId, 'Please enter your message');
            }
        });
    });
}

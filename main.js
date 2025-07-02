const navLinks = document.getElementById('nav-links');
const menuBtn = document.getElementById('menu-btn');
const menuBtnIcon = document.querySelector('i');

menuBtn.addEventListener('click', (e) => {
    navLinks.classList.toggle('open');

    const isOpen = navLinks.classList.contains('open');
    menuBtnIcon.setAttribute(
        'class',
        isOpen ? 'ri-close-line' : 'ri-menu-3-line'
    );
});

navLinks.addEventListener('click', (e) => {
    navLinks.classList.remove('open');
    menuBtnIcon.setAttribute('class', 'ri-menu-3-line');
});

const scrollRevealOptions = {
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
}

ScrollReveal().reveal('.header__content .section__description', {
    ...scrollRevealOptions,
    delay: 500,
});

ScrollReveal().reveal('.header__content .header__btn', {
    ...scrollRevealOptions,
    delay: 1000,
});

//about container
ScrollReveal().reveal('.about__content .section__header' , {
    ...scrollRevealOptions,
});

ScrollReveal().reveal('.about__content .section__description' , {
    ...scrollRevealOptions,
    delay: 500,
});

ScrollReveal().reveal('.about__content .about__btn' , {
    ...scrollRevealOptions,
    delay: 1000,
});

//services container
ScrollReveal().reveal('.services__content .section__header', {
    ...scrollRevealOptions,
});

ScrollReveal().reveal('.services__content .service__card', {
    ...scrollRevealOptions,
    interval: 200,
});

// //portfolio container
// ScrollReveal().reveal('.portfolio__card', {
//     duraçtion: 1000,
//     interval: 500,
// });

// ScrollReveal().reveal('.portfolio__content .section__description', {
//     ...scrollRevealOptions,
//     delay: 500,
// });

// ScrollReveal().reveal('.portfolio__content .portfolio__btn', {
//     ...scrollRevealOptions,
//     delay: 1000,
// });

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.form__btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Remove any existing messages
        const existingMessage = contactForm.querySelector('.form__message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Try to submit to Netlify
        const response = await fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
            // Show success message
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        // Show error message
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form__message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Add keyboard navigation support for mobile menu
menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuBtn.click();
    }
});

// Phone input validation - only allow numbers and plus sign
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    // Remove any characters that are not numbers or plus sign
    const originalValue = e.target.value;
    e.target.value = e.target.value.replace(/[^0-9+]/g, '');
    
    // Show warning message if letters were removed
    if (originalValue !== e.target.value && /[a-zA-Z]/.test(originalValue)) {
        showPhoneValidationMessage();
    }
});

phoneInput.addEventListener('keypress', (e) => {
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
        return;
    }
    // Allow numbers (0-9) and plus sign (+)
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || // 0-9 on main keyboard
          (e.keyCode >= 96 && e.keyCode <= 105) || // 0-9 on numpad
          e.keyCode === 43 || // plus sign
          (e.shiftKey && e.keyCode === 187))) { // plus sign with shift
        e.preventDefault();
        
        // Show warning message for invalid characters
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
            showPhoneValidationMessage();
        }
    }
});

function showPhoneValidationMessage() {
    // Remove existing phone validation message
    const existingMessage = document.querySelector('.phone__validation__message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new validation message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'phone__validation__message';
    messageDiv.textContent = 'Only numbers and + sign are allowed';
    
    const phoneGroup = phoneInput.closest('.form__group');
    phoneGroup.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// CV Download functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadCVBtn = document.querySelector('.about__btn a');
    
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            // Get the file path
            const filePath = this.getAttribute('href');
            
            // Create a temporary link element for download
            const link = document.createElement('a');
            link.href = filePath;
            link.download = 'Jean_Carlo_Ruiz_CV.pdf';
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Prevent default link behavior
            e.preventDefault();
        });
    }
});

// CV Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const cvModal = document.getElementById('cv-modal');
    const cvModalOverlay = document.getElementById('cv-modal-overlay');
    const cvModalClose = document.getElementById('cv-modal-close');
    const cvDownloadBtn = document.querySelector('.cv-download-btn');
    
    // Open CV modal
    function openCVModal() {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close CV modal
    function closeCVModal() {
        cvModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', openCVModal);
    }
    
    if (cvModalClose) {
        cvModalClose.addEventListener('click', closeCVModal);
    }
    
    if (cvModalOverlay) {
        cvModalOverlay.addEventListener('click', closeCVModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            closeCVModal();
        }
    });
});

// Data protection and obfuscation
const protectedData = {
    // Base64 encoded and split for basic obfuscation
    phone: atob('KzM0NjQ3ODI5NDQz'),
    email: atob('amNydWl6bTIyQGdtYWlsLmNvbQ=='),
    social: {
        twitter: atob('aHR0cHM6Ly94LmNvbS9qY3J1aXptMjI='),
        linkedin: atob('aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2plYW4tY2FybG8tcnVpei03ODQzNWIxYjIv'),
        instagram: atob('aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9qZWFuY2FydWl6Lw==')
    }
};

// Anti-bot protection
function isHuman() {
    // Simple bot detection
    return navigator.webdriver !== true && 
           !window.phantom && 
           !window._phantom &&
           typeof window.callPhantom === 'undefined';
}

// Contact handler with protection
function handleContact(type, value) {
    if (!isHuman()) {
        console.log('Automated access detected');
        return;
    }

    // Add slight delay to confuse scrapers
    setTimeout(() => {
        if (type === 'email') {
            window.location.href = `mailto:${value}`;
        } else if (type === 'phone') {
            window.location.href = `tel:${value}`;
        } else if (type === 'url') {
            window.open(value, '_blank', 'noopener,noreferrer');
        }
    }, Math.random() * 100 + 50);
}

// Social media handler
function handleSocialClick(platform) {
    if (!isHuman()) return;
    
    const url = protectedData.social[platform];
    if (url) {
        handleContact('url', url);
    }
}

// Contact trigger handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact buttons
    const contactTriggers = document.querySelectorAll('.contact-trigger');
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'call') {
                handleContact('phone', protectedData.phone);
            }
        });
    });

    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const contactType = this.getAttribute('data-contact');
            const socialType = this.getAttribute('data-social');
            
            if (contactType === 'email') {
                handleContact('email', protectedData.email);
            } else if (contactType === 'phone') {
                handleContact('phone', protectedData.phone);
            } else if (socialType) {
                handleSocialClick(socialType);
            }
        });
    });

    // Disable right-click on contact elements (basic protection)
    const protectedElements = document.querySelectorAll('.social-link, .contact-trigger');
    protectedElements.forEach(element => {
        element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });
});

// Additional scraper protection
function addNoiseToDOM() {
    // Add fake contact info to confuse scrapers
    const fakeContacts = [
        'fake@example.com',
        '+1234567890',
        'notreal@test.com'
    ];
    
    fakeContacts.forEach(fake => {
        const hiddenSpan = document.createElement('span');
        hiddenSpan.textContent = fake;
        hiddenSpan.style.display = 'none';
        hiddenSpan.style.visibility = 'hidden';
        hiddenSpan.style.position = 'absolute';
        hiddenSpan.style.left = '-9999px';
        document.body.appendChild(hiddenSpan);
    });
}

// Run protection on load
document.addEventListener('DOMContentLoaded', addNoiseToDOM);
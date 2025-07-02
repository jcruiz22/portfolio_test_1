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
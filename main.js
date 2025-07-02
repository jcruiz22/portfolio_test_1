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

//portfolio container
ScrollReveal().reveal('.portfolio__card', {
    duraçtion: 1000,
    interval: 500,
});

ScrollReveal().reveal('.portfolio__content .section__description', {
    ...scrollRevealOptions,
    delay: 500,
});

ScrollReveal().reveal('.portfolio__content .portfolio__btn', {
    ...scrollRevealOptions,
    delay: 1000,
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
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
        
        // Here you would typically send the data to your server
        // For now, we'll simulate the email sending process
        await simulateEmailSending(formObject);
        
        // Show success message
        showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
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

async function simulateEmailSending(formData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would integrate with your preferred email service
    // Examples: EmailJS, Formspree, Netlify Forms, or your own backend
    
    // For EmailJS integration, you would do something like:
    /*
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.description,
        to_email: 'your-email@example.com'
    });
    */
    
    console.log('Form Data:', formData);
    
    // Simulate random success/failure for demonstration
    if (Math.random() > 0.1) {
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Simulated error'));
    }
}

// Add keyboard navigation support for mobile menu
menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuBtn.click();
    }
});
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
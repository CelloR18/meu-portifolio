// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
    
    // Inicializa AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Inicializa particles.js
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'js/particles.json', function() {
            console.log('Particles.js loaded');
        });
    }
    
    // Inicializa Typed.js
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ["experiências digitais", "sites performáticos", "aplicações web", "soluções criativas"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }
});

// Menu mobile
document.querySelector('.mobile-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('active');
    document.querySelector('.menu-overlay').classList.toggle('active');
});

// Filtro de portfólio
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active class ao botão clicado
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Atualiza o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();
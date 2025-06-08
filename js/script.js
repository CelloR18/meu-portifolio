document.addEventListener('DOMContentLoaded', function() {
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            console.log('Dados do formulário:', formObject);
            
            // Criar feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular tempo de envio
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
                
                // Resetar após 2 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de aparecimento nas seções ao rolar
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar opacidade e posição
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Verificar ao carregar e ao rolar
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Verificar imediatamente para elementos já visíveis
    checkScroll();
    
    // Efeito de digitação no hero (opcional)
    const typedElements = document.querySelectorAll('.typed');
    if (typedElements.length > 0) {
        // Implementação de efeito de digitação pode ser adicionada aqui
        // Sugestão: usar a biblioteca Typed.js para esse efeito
    }
    // Lightbox para a galeria
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
        });
    });
    
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // ... outros códigos existentes ...
    
    initGalleryLightbox();
});

});
// Menu Mobile Aprimorado
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav ul');
const barsIcon = document.querySelector('.mobile-menu .fa-bars');
const timesIcon = document.querySelector('.mobile-menu .fa-times') || document.createElement('i');

// Cria o ícone de fechar se não existir
if (!document.querySelector('.mobile-menu .fa-times')) {
    timesIcon.className = 'fas fa-times';
    timesIcon.style.display = 'none';
    mobileMenuBtn.appendChild(timesIcon);
}

// Cria o overlay
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

mobileMenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    overlay.classList.toggle('active');
    
    // Alterna entre os ícones
    if (nav.classList.contains('active')) {
        barsIcon.style.display = 'none';
        timesIcon.style.display = 'block';
    } else {
        barsIcon.style.display = 'block';
        timesIcon.style.display = 'none';
    }
});

// Fechar menu ao clicar no overlay ou em um link
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

function closeMenu() {
    nav.classList.remove('active');
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('active');
    barsIcon.style.display = 'block';
    timesIcon.style.display = 'none';
}

// Fechar menu ao rolar
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 50) {
        closeMenu();
    }
    lastScroll = currentScroll;
});

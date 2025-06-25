document.addEventListener('DOMContentLoaded', function() {
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Menu Mobile Aprimorado
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    const menuOverlay = document.querySelector('.menu-overlay');
    const barsIcon = document.querySelector('.mobile-menu .fa-bars');
    const timesIcon = document.querySelector('.mobile-menu .fa-times');
    
    function toggleMenu() {
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Alternar ícones
        if (nav.classList.contains('active')) {
            barsIcon.style.display = 'none';
            timesIcon.style.display = 'block';
        } else {
            barsIcon.style.display = 'block';
            timesIcon.style.display = 'none';
        }
    }
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Fechar menu ao clicar no overlay ou em links
    menuOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Fechar menu ao rolar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScroll) > 50 && nav.classList.contains('active')) {
            toggleMenu();
        }
        lastScroll = currentScroll;
    });
    
    // Lightbox para galeria
    function initLightbox() {
        const galleryLinks = document.querySelectorAll('.gallery-link');
        if (galleryLinks.length === 0) return;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-img" src="" alt="">
                <div class="lightbox-caption"></div>
                <div class="lightbox-nav">
                    <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                    <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.close-lightbox');
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        
        let currentIndex = 0;
        const galleryItems = Array.from(galleryLinks);
        
        function openLightbox(index) {
            currentIndex = index;
            const item = galleryItems[currentIndex];
            lightboxImg.src = item.href;
            lightboxImg.alt = item.querySelector('img').alt;
            lightboxCaption.textContent = item.dataset.caption || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Atualizar navegação
            prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentIndex === galleryItems.length - 1 ? 'none' : 'flex';
        }
        
        function navigate(direction) {
            currentIndex += direction;
            if (currentIndex < 0) currentIndex = galleryItems.length - 1;
            if (currentIndex >= galleryItems.length) currentIndex = 0;
            openLightbox(currentIndex);
        }
        
        // Abrir lightbox ao clicar nos itens
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
        
        // Event listeners para controles
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        prevBtn.addEventListener('click', function() {
            navigate(-1);
        });
        
        nextBtn.addEventListener('click', function() {
            navigate(1);
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            }
            if (e.key === 'ArrowRight') {
                navigate(1);
            }
        });
    }
    
    initLightbox();
    
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
    checkScroll();
    
    // Botão "voltar ao topo"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const text = `👋 Olá, Marcelo!%0A%0A📌Meu Nome é: ${encodeURIComponent(name)}%0A📧 E-mail: ${encodeURIComponent(email)}%0A📝 Assunto: ${encodeURIComponent(subject)}%0A💬 Mensagem: ${encodeURIComponent(message)}`;

            const phone = '5518996193899';
            const url = `https://wa.me/${phone}?text=${text}`;

            window.open(url, '_blank');

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();

        });
    }
});
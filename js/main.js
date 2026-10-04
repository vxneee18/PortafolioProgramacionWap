document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto de Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        var windowHeight = window.innerHeight;
        var elementVisible = 150;

        reveals.forEach((element) => {
            var elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

    // 2. Navegación activa y Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Solo aplicar scroll suave si es un ancla a la misma página
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 120, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }

                // Update active class
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Actualizar nav al scrollear
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                link.classList.remove('active');
                if (href.substring(1) === current && current !== '') {
                    link.classList.add('active');
                }
            }
        });
    });

    // 3. Formulario y Modal (Respuesta automática)
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('response-modal');
    const closeBtn = document.querySelector('.close-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recargar la página
        
        // Simular envío
        const btn = this.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            // Mostrar modal
            modal.style.display = 'block';
            
            // Resetear formulario y botón
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });

    // Cerrar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Generación de fondo dinámico (estrellas)
    function createStars(elementId, count) {
        const container = document.getElementById(elementId);
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 2000}px`;
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.backgroundColor = '#fff';
            star.style.borderRadius = '50%';
            star.style.boxShadow = `0 0 ${Math.random() * 10}px #fff`;
            
            // Animación
            star.style.animation = `animStar ${50 + Math.random() * 100}s linear infinite`;
            
            container.appendChild(star);
        }
    }

    createStars('stars', 100);
    createStars('stars2', 50);
    createStars('stars3', 25);
});

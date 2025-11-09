// Smooth Scroll para navegação
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

// Interação 1: Efeito de hover na foto de perfil com rotação
const profileCircle = document.querySelector('.profile-circle');
const profileImage = document.querySelector('.profile-image');

if (profileCircle) {
    let rotationAngle = 0;
    
    profileCircle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 10px 40px rgba(37, 99, 235, 0.4)';
        if (profileImage) {
            profileImage.style.transform = 'scale(1.05)';
        }
    });
    
    profileCircle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = 'none';
        if (profileImage) {
            profileImage.style.transform = 'scale(1)';
        }
    });
    
    profileCircle.addEventListener('click', function() {
        rotationAngle += 360;
        this.style.transition = 'transform 0.6s ease';
        this.style.transform = `scale(1.1) rotate(${rotationAngle}deg)`;
        
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    });
}

// Interação 2: Carousel de projetos com animação
const projectCards = document.querySelectorAll('.projeto-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 2; // Começa no card central

function updateCarousel() {
    // Remove active de todos os cards
    projectCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Adiciona active ao card atual
    if (projectCards[currentIndex]) {
        projectCards[currentIndex].classList.add('active');
    }
    
    // Atualiza dots
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === Math.floor(currentIndex / 2)) {
            dot.classList.add('active');
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : projectCards.length - 1;
        updateCarousel();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < projectCards.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });
}

// Click nos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index * 2;
        updateCarousel();
    });
});

// Animação nos cards de projeto ao passar o mouse
projectCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (index === currentIndex) {
            this.style.transform = 'translateY(0) scale(1)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
    
    card.addEventListener('click', function() {
        currentIndex = index;
        updateCarousel();
    });
});

// Pausa o carousel ao passar o mouse
const projectsGrid = document.querySelector('.projetos-grid');
if (projectsGrid) {
    projectsGrid.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    projectsGrid.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Efeito de flutuação nos cards de habilidades
const habilidadesCards = document.querySelectorAll('.habilidades-card');

habilidadesCards.forEach((card, index) => {
    // Adiciona um atraso diferente para cada card
    const delay = index * 100;
    
    setTimeout(() => {
        card.style.animation = `float 3s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.2}s`;
    }, delay);
});

// Adiciona animação CSS para flutuação
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Efeito parallax simples na scrollagem
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY;
    
    // Efeito parallax no hero
    const hero = document.querySelector('.hero-content');
    if (hero && currentScrollY < 500) {
        hero.style.transform = `translateY(${currentScrollY * 0.3}px)`;
        hero.style.opacity = 1 - (currentScrollY / 500);
    }
    
    lastScrollY = currentScrollY;
});

// Animação de entrada para seções
const sections = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Destaca o link da navegação ativo
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#2563eb';
        } else {
            link.style.color = '#999999';
        }
    });
});

// Efeito de digitação no título 
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    
    // Scroll suave ao carregar
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Previne comportamento padrão dos botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Adiciona efeito ripple aos botões
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const rippleEffect = button.getElementsByClassName('ripple')[0];
    if (rippleEffect) {
        rippleEffect.remove();
    }

    button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.btn-contato, .carousel-btn, .btn-github');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// CSS para efeito ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(rippleStyle);

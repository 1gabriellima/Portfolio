// ========================================
// THEME TOGGLE (Modo Claro/Escuro)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Carrega o tema salvo
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
});

// ========================================
// TYPING EFFECT
// ========================================
const typingText = document.getElementById('typingText');
const text = 'Gabriel Fernandes Lima Moreira';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Inicia o efeito quando a página carrega
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ========================================
// PARALLAX EFFECT - Profile Photo
// ========================================
const profilePhoto = document.getElementById('profilePhoto');

window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    
    profilePhoto.style.transform = `translate(${x}px, ${y}px)`;
});

// ========================================
// ANIMATE ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ========================================
// SMOOTH SCROLL
// ========================================
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

// ========================================
// PROJECT CAROUSEL
// ========================================
const projectItems = document.querySelectorAll('.project-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.getElementById('carouselDots');

let currentProject = 0;
const totalProjects = 7;

// Criar dots do carousel
for (let i = 0; i < totalProjects; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToProject(i));
    carouselDots.appendChild(dot);
}

function updateCarousel() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentProject);
    });
    
    // Destaca o projeto atual
    projectItems.forEach((item, index) => {
        if (index === currentProject) {
            item.style.transform = 'scale(1.2)';
            item.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            item.style.zIndex = '100';
            item.style.borderColor = 'transparent';
            const svg = item.querySelector('svg');
            if (svg) svg.style.color = 'white';
        } else {
            item.style.transform = '';
            item.style.background = '';
            item.style.zIndex = '';
            item.style.borderColor = '';
            const svg = item.querySelector('svg');
            if (svg) svg.style.color = '';
        }
    });
}

function goToProject(index) {
    currentProject = index;
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    currentProject = (currentProject - 1 + totalProjects) % totalProjects;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentProject = (currentProject + 1) % totalProjects;
    updateCarousel();
});

// ========================================
// PROJECT MODAL
// ========================================
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

const projectData = {
    1: {
        title: 'Projeto 1',
        technologies: ['C#', 'Windows Forms', 'MySQL']
    },
    2: {
        title: 'Projeto 2',
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    3: {
        title: 'Projeto 3',
        technologies: ['JavaScript', 'Chart.js', 'CSS']
    },
    4: {
        title: 'Projeto 4',
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    5: {
        title: 'Projeto 5',
        technologies: ['C#', 'ASP.NET', 'MySQL']
    },
    6: {
        title: 'Projeto 6',
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    7: {
        title: 'Projeto 7',
        technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL']
    }
};

projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.getAttribute('data-project');
        const project = projectData[projectId];
        
        modalTitle.textContent = project.title;
        modalBody.innerHTML = `
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
                ${project.technologies.map(tech => 
                    `<span style="background: var(--bg-tertiary); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; border: 1px solid var(--border-color);">${tech}</span>`
                ).join('')}
            </div>
            
            <a href="#" class="github-link" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); text-decoration: none; transition: all 0.3s;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Ver Código
            </a>
        `;
        
        // Adiciona hover effect no link do GitHub
        const githubLink = modalBody.querySelector('.github-link');
        githubLink.addEventListener('mouseenter', function() {
            this.style.background = 'var(--accent-color)';
            this.style.borderColor = 'var(--accent-color)';
            this.style.color = 'white';
        });
        githubLink.addEventListener('mouseleave', function() {
            this.style.background = 'var(--bg-tertiary)';
            this.style.borderColor = 'var(--border-color)';
            this.style.color = 'var(--text-primary)';
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// FORM VALIDATION & MASKS
// ========================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const cpfInput = document.getElementById('cpf');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Máscara de Telefone
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    e.target.value = value;
});

// Máscara de CPF
cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
    e.target.value = value;
});

// Validação de Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Validação de Telefone
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
}

// Mostrar erro
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

// Limpar erro
function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorMessage.textContent = '';
}

// Validação em tempo real
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, 'Nome deve ter pelo menos 3 caracteres');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Email inválido');
    } else {
        clearError(emailInput);
    }
});

phoneInput.addEventListener('blur', () => {
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Telefone inválido');
    } else {
        clearError(phoneInput);
    }
});

cpfInput.addEventListener('blur', () => {
    if (cpfInput.value && !validateCPF(cpfInput.value)) {
        showError(cpfInput, 'CPF inválido');
    } else {
        clearError(cpfInput);
    }
});

subjectInput.addEventListener('blur', () => {
    if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Assunto deve ter pelo menos 3 caracteres');
    } else {
        clearError(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres');
    } else {
        clearError(messageInput);
    }
});

// Submit do formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validar todos os campos
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, 'Nome deve ter pelo menos 3 caracteres');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Email inválido');
        isValid = false;
    }
    
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Telefone inválido');
        isValid = false;
    }
    
    if (cpfInput.value && !validateCPF(cpfInput.value)) {
        showError(cpfInput, 'CPF inválido');
        isValid = false;
    }
    
    if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Assunto deve ter pelo menos 3 caracteres');
        isValid = false;
    }
    
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    if (isValid) {
        // Simulação de envio
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        contactForm.reset();
        
        // Limpar todos os erros
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
    }
});

// ========================================
// NAVBAR HIGHLIGHT ON SCROLL
// ========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
        }
    });
});

// ========================================
// MOUSE TRAIL EFFECT (Efeito adicional)
// ========================================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length === 0) {
    // Criar círculos para o efeito de mouse trail
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(circle);
    }
}

const allCircles = document.querySelectorAll('.circle');

allCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    allCircles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 20;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();


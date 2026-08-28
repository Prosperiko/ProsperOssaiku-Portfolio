// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const menuIcon = document.getElementById('menuIcon');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active', isMenuOpen);
    navOverlay.classList.toggle('active', isMenuOpen);
    menuIcon.className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== MODAL SYSTEM =====
const modalTriggers = document.querySelectorAll('.case-study-btn');
const modalOverlays = document.querySelectorAll('.modal-overlay');
let activeModal = null;
let scrollY = 0;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Store scroll position
    scrollY = window.pageYOffset;

    // Lock body scroll
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollY}px`;

    // Show modal
    modal.classList.add('active');
    activeModal = modal;

    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length) {
        focusableElements[0].focus();
    }
}

function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove('active');

    // Restore body scroll
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollY);

    activeModal = null;
}

// Open modal on button click
modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modalId = btn.getAttribute('data-modal');
        openModal(modalId);
    });
});

// Close modal on overlay click (but not modal content)
modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
});

// Close modal on close button click
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
        closeModal();
    }
});
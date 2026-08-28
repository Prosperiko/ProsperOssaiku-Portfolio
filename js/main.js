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

// ===== Case Study Toggle =====
document.querySelectorAll('.case-study-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);

        if (!content) return;

        const isOpen = content.classList.contains('open');

        // Close all other open case studies (optional — comment out if you want multiple open)
        document.querySelectorAll('.case-study-content.open').forEach(el => {
            if (el.id !== targetId) {
                el.classList.remove('open');
                const otherBtn = document.querySelector(`[data-target="${el.id}"]`);
                if (otherBtn) otherBtn.classList.remove('active');
            }
        });

        // Toggle current
        content.classList.toggle('open', !isOpen);
        this.classList.toggle('active', !isOpen);

        // Update button text
        const icon = this.querySelector('i');
        if (!isOpen) {
            this.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Case Study';
        } else {
            this.innerHTML = '<i class="fas fa-book-open"></i> Read Case Study';
        }
    });
});
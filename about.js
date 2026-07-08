document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('#navMenuToggle');
    const primaryNav = document.querySelector('#primaryNav');

    if (navToggle && primaryNav) {
        const setMenuState = (isOpen) => {
            primaryNav.classList.toggle('is-open', isOpen);
            navToggle.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        };

        navToggle.addEventListener('click', () => {
            setMenuState(!primaryNav.classList.contains('is-open'));
        });

        primaryNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1100) {
                setMenuState(false);
            }
        });
    }

    const revealItems = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((el) => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                activeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach((el) => {
        observer.observe(el);
    });
});

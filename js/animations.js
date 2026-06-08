document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.classList.add('page-enter');
    setTimeout(() => document.body.classList.remove('page-enter'), 450);

    if (!reducedMotion) {
        initHeroParallax();
        initTiltCards();
        initMagneticButtons();
        initTimelineDraw();
    }

    initStackMarqueePause();
});

function initHeroParallax() {
    const mesh = document.querySelector('.hero-mesh');
    if (!mesh) return;

    const blobs = mesh.querySelectorAll('.hero-mesh-blob');
    window.addEventListener('scroll', () => {
        const y = window.scrollY * 0.15;
        blobs.forEach((blob, i) => {
            blob.style.transform = `translateY(${y * (i + 1) * 0.3}px)`;
        });
    }, { passive: true });
}

function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    if (!window.matchMedia('(hover: hover)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.btn-main, .btn-ghost').forEach(btn => {
        btn.classList.add('btn-magnetic');
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function initTimelineDraw() {
    const timeline = document.querySelector('.ach-timeline-list');
    const line = document.querySelector('.timeline-line-draw');
    if (!timeline || !line) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                line.classList.add('drawn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(timeline);
}

function initStackMarqueePause() {
    const track = document.querySelector('.stack-marquee-track');
    if (!track) return;

    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

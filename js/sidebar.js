document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('nav-overlay');
    const toggle = document.querySelector('.nav-toggle');
    const closeBtn = document.querySelector('.nav-drawer-close');
    const items = document.querySelectorAll('.header-nav .nav-item');
    const progressBar = document.getElementById('scroll-progress');
    const footerBackTop = document.getElementById('footer-back-top');

    function openDrawer() {
        drawer?.classList.add('open');
        overlay?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer?.classList.remove('open');
        overlay?.classList.remove('show');
        document.body.style.overflow = '';
    }

    toggle?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDrawer();
    });

    items.forEach(item => {
        item.addEventListener('click', closeDrawer);
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    footerBackTop?.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }

        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            progressBar.style.width = pct + '%';
        }
    }, { passive: true });
});

(function () {
    const SOCIAL = {
        pinterest: 'https://nl.pinterest.com/CooperPanicked/',
        youtube: 'https://www.youtube.com/@CooperPanicked/',
        tiktok: 'https://www.tiktok.com/@cooperpanicked'
    };

    const NAV_ITEMS = [
        { href: 'index.html', label: 'Home' },
        { href: 'achievements.html', label: 'Achievements' },
        { href: 'projects.html', label: 'Projects' },
        { href: 'skills.html', label: 'Skills' },
        { href: 'timeline.html', label: 'Timeline' },
        { href: 'services.html', label: 'Services' },
        { href: 'contact.html', label: 'Contact', cta: true }
    ];

    const currentPage = document.body.dataset.page || 'index.html';

    function navLinks(className) {
        return NAV_ITEMS.map(item => {
            const active = item.href === currentPage ? ' active' : '';
            const cta = item.cta ? ' nav-item-cta' : '';
            return `<a href="${item.href}" class="nav-item${cta}${active}">${item.label}</a>`;
        }).join('');
    }

    const loader = `
    <div id="site-loader" role="presentation" aria-label="Loading">
        <div class="loader-inner">
            <div class="loader-logo">Cooper</div>
            <div class="loader-sub">Software Developer & Rocket League Player</div>
            <div class="loader-bar"><div class="loader-bar-fill" id="loader-bar-fill"></div></div>
            <span class="loader-pct" id="loader-pct">0%</span>
        </div>
    </div>`;

    const header = `
    <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
    <header class="site-header" id="site-header">
        <div class="header-inner">
            <a href="index.html" class="header-logo">Cooper<span class="logo-dot">.</span></a>
            <nav class="header-nav" aria-label="Main navigation">${navLinks()}</nav>
            <button type="button" class="nav-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>
        </div>
        <div class="nav-overlay" id="nav-overlay"></div>
        <aside class="nav-drawer" id="nav-drawer" aria-label="Mobile navigation">
            <div class="nav-drawer-header">
                <a href="index.html" class="header-logo">Cooper<span class="logo-dot">.</span></a>
                <button type="button" class="nav-drawer-close" aria-label="Close menu"><i class="fas fa-xmark"></i></button>
            </div>
            <nav class="header-nav">${navLinks()}</nav>
        </aside>
    </header>`;

    const footer = `
    <footer class="site-footer">
        <div class="footer-shimmer" aria-hidden="true"></div>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col footer-brand">
                    <h3>Cooper<span class="logo-dot">.</span></h3>
                    <p>Front-end developer and Discord bot developer based in the Netherlands. I build responsive websites and custom bots with HTML, CSS, JavaScript and Node.js.</p>
                    <div class="social-links">
                        <a href="${SOCIAL.youtube}" class="social-link" target="_blank" rel="noopener" title="YouTube" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="${SOCIAL.tiktok}" class="social-link" target="_blank" rel="noopener" title="TikTok" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                        <a href="${SOCIAL.pinterest}" class="social-link" target="_blank" rel="noopener" title="Pinterest" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Explore</h4>
                    <ul>
                                <li><a href="index.html">Home</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="skills.html">Skills</a></li>
                        <li><a href="timeline.html">Timeline</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>More</h4>
                    <ul>
                        <li><a href="projects.html">Web Development</a></li>
                        <li><a href="projects.html">Discord Bots</a></li>
                        <li><a href="achievements.html">Achievements</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    <p class="footer-email"><i class="fas fa-envelope"></i> <span class="footer-email-text">Not available</span></p>
                    <p class="footer-location"><i class="fas fa-map-marker-alt"></i> Netherlands</p>
                    <a href="contact.html" class="btn-main btn-sm">Get In Touch</a>
                </div>
            </div>
            <div class="footer-cta-bar reveal">
                <div class="footer-cta-text">
                    <strong>Available for new projects</strong>
                    <span>Response within 24 hours</span>
                </div>
                <a href="contact.html" class="btn-main">Start a Project</a>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Cooper. All rights reserved.</p>
                <p class="footer-built">Built with HTML, CSS &amp; JavaScript</p>
                <button type="button" class="footer-back-top" id="footer-back-top" aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
            </div>
        </div>
    </footer>`;

    const main = document.querySelector('.site-main');
    if (!main) return;

    main.insertAdjacentHTML('beforebegin', loader + header);
    main.insertAdjacentHTML('afterend', footer);

    /* Inject page-hero + footer rain enhancements */
    var _phLink = document.createElement('link');
    _phLink.rel  = 'stylesheet';
    _phLink.href = 'css/page-hero.css';
    document.head.appendChild(_phLink);

    var _phScript = document.createElement('script');
    _phScript.src   = 'js/page-hero.js';
    _phScript.defer = false;
    document.body.appendChild(_phScript);
})();

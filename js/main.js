document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', scrollToTop);

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    const statEls = document.querySelectorAll('[data-count]');
    if (statEls.length) {
        const countObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                const prefix = el.dataset.prefix || '';
                const duration = 1600;
                const start = performance.now();

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = prefix + Math.round(target * eased) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        statEls.forEach(el => countObserver.observe(el));
    }

    document.querySelectorAll('.skill-progress[data-width]').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = '0%';

        const barObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = width + '%';
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        barObserver.observe(bar);
    });

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const item = this.parentElement;
            const wasActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item.active').forEach(open => {
                open.classList.remove('active');
            });

            if (!wasActive) item.classList.add('active');
        });
    });

    // Pricing tabs: switch between boosting, web, and bot development grids
    document.querySelectorAll('.pricing-tab-list').forEach(list => {
        const tabs = list.querySelectorAll('.pricing-tab');
        const container = list.closest('.container');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const target = tab.dataset.target;
                if (!container) return;
                container.querySelectorAll('.pricing-grid').forEach(grid => {
                    if (grid.id === target) {
                        grid.style.display = '';
                        grid.classList.add('active');
                    } else {
                        grid.style.display = 'none';
                        grid.classList.remove('active');
                    }
                });
            });
        });
    });

    initContactForm();
    initAboutTabs();
    initProjectFilter();
    initFloatingLabels();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (!contactForm) return;

    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    const planSelect = contactForm.querySelector('#plan');

    if (plan && planSelect) {
        const option = planSelect.querySelector(`option[value="${plan}"]`);
        if (option) planSelect.value = plan;
    }

    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        if (formSuccess) {
            formSuccess.classList.add('show');
            contactForm.reset();
            if (planSelect && plan) planSelect.value = plan;
            setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
    });
}

function initAboutTabs() {
    const tabs = document.querySelectorAll('.about-tab');
    const panels = document.querySelectorAll('.about-tab-panel');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(target)?.classList.add('active');
        });
    });
}

function initProjectFilter() {
    const filters = document.querySelectorAll('.project-filter-btn');
    const cards = document.querySelectorAll('.project-card[data-tags]');
    if (!filters.length) return;

    const grids = document.querySelectorAll('.project-grid');

    function updateGridSingleState() {
        grids.forEach(grid => {
            const visible = grid.querySelectorAll('.project-card:not(.is-filtered)').length;
            grid.classList.toggle('single-card', visible === 1);
        });
    }

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.filter;
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const tags = card.dataset.tags || '';
                const show = tag === 'all' || tags.includes(tag);
                card.classList.toggle('is-filtered', !show);
                if (!show) {
                    card.setAttribute('aria-hidden', 'true');
                } else {
                    card.removeAttribute('aria-hidden');
                }
            });

            // Update grid single-card state after filtering
            updateGridSingleState();
        });
    });

    // Ensure correct layout state on init
    updateGridSingleState();
}

function initFloatingLabels() {
    document.querySelectorAll('.form-group-float input, .form-group-float textarea, .form-group-float select').forEach(field => {
        const sync = () => {
            field.classList.toggle('has-value', field.value.trim() !== '');
        };
        field.addEventListener('input', sync);
        field.addEventListener('change', sync);
        sync();
    });
}

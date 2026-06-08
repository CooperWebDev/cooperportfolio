(function () {
    const LOADER_KEY = 'cooper-loaded';
    const MIN_MS = 2200;

    function hideLoader(loader) {
        loader.classList.add('loader-exit');
        document.documentElement.classList.remove('loader-active');
        sessionStorage.setItem(LOADER_KEY, '1');
        setTimeout(() => loader.remove(), 550);
    }

    function runLoader() {
        const loader = document.getElementById('site-loader');
        if (!loader) return;

        if (sessionStorage.getItem(LOADER_KEY)) {
            loader.remove();
            return;
        }

        document.documentElement.classList.add('loader-active');

        const bar = document.getElementById('loader-bar-fill');
        const pct = document.getElementById('loader-pct');
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(100, Math.round((elapsed / MIN_MS) * 100));
            if (bar) bar.style.width = progress + '%';
            if (pct) pct.textContent = progress + '%';

            if (elapsed < MIN_MS) {
                requestAnimationFrame(tick);
            } else {
                hideLoader(loader);
            }
        }

        requestAnimationFrame(tick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runLoader);
    } else {
        runLoader();
    }
})();

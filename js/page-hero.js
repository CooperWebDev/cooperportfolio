(function () {
    'use strict';

    var CHARS    = '01アイウカキクケコabcdef<>{}[]();/\\#@!?0123456789';
    var FONT     = 13;
    var ACCENT   = '#18A87A';
    var HEAD_CLR = '#B8FFE0';

    function initRain(section) {
        var canvas = document.createElement('canvas');
        canvas.className  = 'page-hero-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        section.insertBefore(canvas, section.firstChild);

        var ctx = canvas.getContext('2d');
        var cols, drops, rafId;

        function resize() {
            canvas.width  = section.offsetWidth  || window.innerWidth;
            canvas.height = section.offsetHeight || 240;
            cols  = Math.floor(canvas.width / FONT);
            drops = [];
            for (var i = 0; i < cols; i++) {
                drops[i] = Math.random() * -(canvas.height / FONT) * 1.5;
            }
        }

        function tick() {
            ctx.fillStyle = 'rgba(5,16,12,0.07)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = FONT + 'px "Courier New",Courier,monospace';

            for (var i = 0; i < cols; i++) {
                var ch = CHARS[Math.floor(Math.random() * CHARS.length)];
                var x  = i * FONT;
                var y  = drops[i] * FONT;

                /* bright head */
                ctx.fillStyle = HEAD_CLR;
                ctx.fillText(ch, x, y);

                /* one step behind — standard green */
                if (drops[i] > 1) {
                    ctx.fillStyle = ACCENT;
                    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (drops[i] - 1) * FONT);
                }

                /* random reset after passing bottom */
                if (drops[i] * FONT > canvas.height && Math.random() > 0.97) {
                    drops[i] = 0;
                }
                drops[i] += 0.25 + (i % 5) * 0.03;
            }
            rafId = requestAnimationFrame(tick);
        }

        resize();
        tick();

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else {
                tick();
            }
        });
    }

    function initGlitch(section) {
        var el = section.querySelector('.hero-highlight');
        if (!el) return;
        el.classList.add('glitch-text');
        el.setAttribute('data-text', el.textContent.trim());
    }

    function initPath(section) {
        var h1 = section.querySelector('h1');
        if (!h1) return;
        var page = (document.body.getAttribute('data-page') || 'page')
                    .replace('.html', '').replace(/-/g, ' ');
        var div = document.createElement('div');
        div.className   = 'page-hero-path';
        div.innerHTML   = '~/cooper <span>/</span> ' + page;
        section.insertBefore(div, h1);
    }

    function initCursor(section) {
        var p = section.querySelector('p');
        if (p) p.classList.add('hero-sub');
    }

    /* ─────────────────────────────────────────────
       Full-page fixed background rain
    ───────────────────────────────────────────── */
    function initFullPageRain() {
        var canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(canvas, document.body.firstChild);

        var ctx = canvas.getContext('2d');
        var cols, drops, rafId;

        function resize() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            cols  = Math.floor(canvas.width / FONT);
            drops = [];
            for (var i = 0; i < cols; i++) {
                drops[i] = Math.random() * -(canvas.height / FONT) * 2;
            }
        }

        function tick() {
            ctx.fillStyle = 'rgba(5,16,12,0.055)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = FONT + 'px "Courier New",Courier,monospace';

            for (var i = 0; i < cols; i++) {
                var ch = CHARS[Math.floor(Math.random() * CHARS.length)];
                var x  = i * FONT;
                var y  = drops[i] * FONT;

                ctx.fillStyle = HEAD_CLR;
                ctx.fillText(ch, x, y);

                if (drops[i] > 1) {
                    ctx.fillStyle = ACCENT;
                    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (drops[i] - 1) * FONT);
                }

                if (drops[i] * FONT > canvas.height && Math.random() > 0.97) drops[i] = 0;
                drops[i] += 0.25 + (i % 5) * 0.03;
            }
            rafId = requestAnimationFrame(tick);
        }

        resize();
        tick();

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) cancelAnimationFrame(rafId);
            else tick();
        });
    }

    function boot() {
        /* Single full-page rain canvas */
        initFullPageRain();

        /* Page-hero extras (glitch, path, cursor) — no separate rain canvas */
        var heroes = document.querySelectorAll('.page-hero');
        for (var i = 0; i < heroes.length; i++) {
            initGlitch(heroes[i]);
            initPath(heroes[i]);
            initCursor(heroes[i]);
        }
    }

    /* Run immediately — script is injected after DOM exists */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();

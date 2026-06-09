(function () {
    const CHART_COLORS = {
        accent: '#18A87A',
        accentDim: 'rgba(24, 168, 122, 0.2)',
        grid: 'rgba(255, 255, 255, 0.06)',
        text: '#8E9994'
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animDuration = reducedMotion ? 0 : 1200;

    function chartDefaults() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: animDuration },
            plugins: {
                legend: {
                    labels: { color: CHART_COLORS.text, font: { family: 'Inter, system-ui, sans-serif', size: 12 } }
                }
            },
            scales: {}
        };
    }

    function observeInit(selector, initFn) {
        const el = document.querySelector(selector);
        if (!el || typeof Chart === 'undefined') return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initFn(el);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(el);
    }

    function initHomeRadar(canvas) {
        new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Discord.js', 'Next.js'],
                datasets: [{
                    label: 'Proficiency',
                    data: [100, 80, 60, 75, 70, 15],
                    backgroundColor: CHART_COLORS.accentDim,
                    borderColor: CHART_COLORS.accent,
                    borderWidth: 2,
                    pointBackgroundColor: CHART_COLORS.accent
                }]
            },
            options: {
                ...chartDefaults(),
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { display: false, stepSize: 25 },
                        grid: { color: CHART_COLORS.grid },
                        angleLines: { color: CHART_COLORS.grid },
                        pointLabels: { color: CHART_COLORS.text, font: { size: 11 } }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    function initHomeRanks(canvas) {
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Snow Day', 'Casual', 'Hoops', 'Dropshot', '4v4'],
                datasets: [{
                    label: 'NL Rank (lower = better)',
                    data: [104, 325, 376, 443, 549],
                    backgroundColor: CHART_COLORS.accent,
                    borderRadius: 6
                }]
            },
            options: {
                ...chartDefaults(),
                indexAxis: 'y',
                scales: {
                    x: {
                        reverse: true,
                        grid: { color: CHART_COLORS.grid },
                        ticks: { color: CHART_COLORS.text }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: CHART_COLORS.text }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    function initSkillsRadar(canvas) {
        new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Discord.js', 'Next.js'],
                datasets: [{
                    label: 'Skill Level',
                    data: [100, 80, 60, 75, 70, 15],
                    backgroundColor: CHART_COLORS.accentDim,
                    borderColor: CHART_COLORS.accent,
                    borderWidth: 2,
                    pointBackgroundColor: CHART_COLORS.accent
                }]
            },
            options: {
                ...chartDefaults(),
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { display: false },
                        grid: { color: CHART_COLORS.grid },
                        angleLines: { color: CHART_COLORS.grid },
                        pointLabels: { color: CHART_COLORS.text }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    function initAchievementsBar(canvas) {
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['1v1', '2v2', '3v3', '4v4', 'Hoops', 'Rumble', 'Dropshot', 'Snow Day', 'Tournaments', 'Casual'],
                datasets: [{
                    label: 'Peak NL Rank',
                    data: [742, 586, 705, 549, 376, 527, 443, 104, 542, 325],
                    backgroundColor: CHART_COLORS.accent,
                    borderRadius: 4
                }]
            },
            options: {
                ...chartDefaults(),
                indexAxis: 'y',
                scales: {
                    x: {
                        reverse: true,
                        grid: { color: CHART_COLORS.grid },
                        ticks: { color: CHART_COLORS.text, callback: v => '#' + v }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: CHART_COLORS.text }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    function initAboutDonut(canvas) {
        const chart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Development', 'Rocket League', 'Learning'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: ['#18A87A', '#6366F1', '#F59E0B'],
                    borderColor: ['#18A87A', '#6366F1', '#F59E0B'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                ...chartDefaults(),
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#C8D0CC',
                            padding: 20,
                            font: { family: 'Inter, system-ui, sans-serif', size: 13 },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => ` ${ctx.label}: ${ctx.parsed}%`
                        }
                    }
                }
            },
            plugins: [{
                id: 'centerText',
                afterDraw(chart) {
                    const { ctx, chartArea: { top, bottom, left, right } } = chart;
                    const cx = (left + right) / 2;
                    const cy = (top + bottom) / 2;
                    const activeIdx = chart._active && chart._active.length ? chart._active[0].index : null;
                    const labels = ['Dev', 'RL', 'Learn'];
                    const values = ['55%', '35%', '10%'];
                    const label = activeIdx !== null ? labels[activeIdx] : 'Dev';
                    const value = activeIdx !== null ? values[activeIdx] : '55%';
                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 26px Inter, system-ui, sans-serif';
                    ctx.fillText(value, cx, cy - 10);
                    ctx.fillStyle = '#8E9994';
                    ctx.font = '13px Inter, system-ui, sans-serif';
                    ctx.fillText(label, cx, cy + 16);
                    ctx.restore();
                }
            }]
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (typeof Chart === 'undefined') return;

        observeInit('#chart-home-radar', initHomeRadar);
        observeInit('#chart-home-ranks', initHomeRanks);
        observeInit('#chart-skills-radar', initSkillsRadar);
        observeInit('#chart-achievements-bar', initAchievementsBar);
        observeInit('#chart-about-donut', initAboutDonut);
    });
})();

const REVIEWS_DATA = [
    {
        name: 'Proga',
        role: 'Founder of AlphaTiers',
        avatar: 'Images/Client1.png',
        text: 'Great bot! It responds quickly and works very well. It was very helpful and explained clearly how everything works.',
        verified: true
    },
    {
        name: 'AirStickk',
        role: 'Founder of Faqzy Esports',
        avatar: 'Images/Client2.png',
        text: "I'm very happy with the service. Everything was done quickly whenever I asked for something, and the bot worked perfectly.",
        verified: true
    },
    {
        name: 'Trzy',
        role: 'Founder of TraxzyTiers',
        avatar: 'Images/Client3.png',
        text: 'The website was professionally made, looked great, and functioned exactly as expected. All bot commands worked perfectly.',
        verified: true
    },
        {
        name: 'Proga',
        role: 'Founder of AlphaTiers',
        avatar: 'Images/Client1.png',
        text: 'Great bot! It responds quickly and works very well. It was very helpful and explained clearly how everything works.',
        verified: true
    },
    {
        name: 'AirStickk',
        role: 'Founder of Faqzy Esports',
        avatar: 'Images/Client2.png',
        text: "I'm very happy with the service. Everything was done quickly whenever I asked for something, and the bot worked perfectly.",
        verified: true
    },
    {
        name: 'Trzy',
        role: 'Founder of TraxzyTiers',
        avatar: 'Images/Client3.png',
        text: 'The website was professionally made, looked great, and functioned exactly as expected. All bot commands worked perfectly.',
        verified: true
        },
        {
        name: 'Proga',
        role: 'Founder of AlphaTiers',
        avatar: 'Images/Client1.png',
        text: 'Great bot! It responds quickly and works very well. It was very helpful and explained clearly how everything works.',
        verified: true
    },
    {
        name: 'AirStickk',
        role: 'Founder of Faqzy Esports',
        avatar: 'Images/Client2.png',
        text: "I'm very happy with the service. Everything was done quickly whenever I asked for something, and the bot worked perfectly.",
        verified: true
    },
    {
        name: 'Trzy',
        role: 'Founder of TraxzyTiers',
        avatar: 'Images/Client3.png',
        text: 'The website was professionally made, looked great, and functioned exactly as expected. All bot commands worked perfectly.',
        verified: true
    }
];

class ReviewsCarousel3D {
    constructor(root) {
        this.root = root;
        this.viewport = root.querySelector('.reviews-carousel-viewport');
        this.ring = root.querySelector('.reviews-carousel-ring');
        this.reviews = REVIEWS_DATA;
        this.count = this.reviews.length;
        this.rotation = 0;
        this.snapTarget = null;
        this.paused = false;
        this.hoveredIndex = -1;
        this.activeIndex = 0;
        this.dragging = false;
        this.lastX = 0;
        this.velocity = 0;
        this.speed = 0.06;
        this.raf = null;
        this.cards = [];
        this.radius = this.getRadius();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.build();
        this.bindEvents();
        this.animate();

        window.addEventListener('resize', () => {
            this.radius = this.getRadius();
        });
    }

    getRadius() {
        const w = window.innerWidth;
        if (w < 480) return 200;
        if (w < 768) return 260;
        if (w < 1024) return 340;
        return 420;
    }

    build() {
        this.reviews.forEach((review, i) => {
            const card = document.createElement('div');
            card.className = 'review-card-3d';
            card.dataset.index = i;

            const avatarHtml = review.avatar
                ? `<img class="review-avatar" src="${review.avatar}" alt="${review.name}">`
                : `<div class="review-avatar review-avatar-initials" style="--avatar-color:${review.color}">${review.initials}</div>`;

            const verifiedHtml = review.verified
                ? '<div class="review-verified"><i class="fas fa-check-circle"></i> Verified Client</div>'
                : '';

            card.innerHTML = `
                <div class="review-card-inner">
                    ${verifiedHtml}
                    <div class="review-stars">★★★★★</div>
                    <p class="review-text">"${review.text}"</p>
                    <div class="review-author">
                        ${avatarHtml}
                        <div class="review-author-info">
                            <h4>${review.name}</h4>
                            <span>${review.role}</span>
                        </div>
                    </div>
                </div>
            `;

            card.addEventListener('mouseenter', () => {
                this.paused = true;
                this.hoveredIndex = i;
            });
            card.addEventListener('mouseleave', () => {
                this.hoveredIndex = -1;
                if (!this.viewport.matches(':hover')) this.paused = false;
            });
            card.addEventListener('click', () => this.snapTo(i));

            this.ring.appendChild(card);
            this.cards.push(card);
        });
    }

    bindEvents() {
        this.root.querySelector('.reviews-nav-prev')?.addEventListener('click', () => {
            this.snapTo((this.activeIndex - 1 + this.count) % this.count);
        });
        this.root.querySelector('.reviews-nav-next')?.addEventListener('click', () => {
            this.snapTo((this.activeIndex + 1) % this.count);
        });

        this.viewport.addEventListener('mouseenter', () => { this.paused = true; });
        this.viewport.addEventListener('mouseleave', () => {
            if (this.hoveredIndex === -1) this.paused = false;
        });

        this.viewport.addEventListener('mousedown', e => {
            this.dragging = true;
            this.lastX = e.clientX;
            this.velocity = 0;
            this.paused = true;
        });

        window.addEventListener('mousemove', e => {
            if (!this.dragging) return;
            const dx = e.clientX - this.lastX;
            this.rotation -= dx * 0.25;
            this.velocity = -dx * 0.08;
            this.lastX = e.clientX;
        });

        window.addEventListener('mouseup', () => {
            if (!this.dragging) return;
            this.dragging = false;
            this.snapToNearest();
        });

        this.viewport.addEventListener('touchstart', e => {
            this.dragging = true;
            this.lastX = e.touches[0].clientX;
            this.velocity = 0;
            this.paused = true;
        }, { passive: true });

        window.addEventListener('touchmove', e => {
            if (!this.dragging) return;
            const dx = e.touches[0].clientX - this.lastX;
            this.rotation -= dx * 0.25;
            this.velocity = -dx * 0.08;
            this.lastX = e.touches[0].clientX;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if (!this.dragging) return;
            this.dragging = false;
            this.snapToNearest();
        });
    }

    getStep() {
        return 360 / this.count;
    }

    snapTo(index) {
        const step = this.getStep();
        const desiredMod = (((-index * step) % 360) + 360) % 360;
        const currentMod = ((this.rotation % 360) + 360) % 360;
        let diff = desiredMod - currentMod;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        this.snapTarget = this.rotation + diff;
        this.activeIndex = index;
    }

    snapToNearest() {
        const step = this.getStep();
        const currentMod = ((this.rotation % 360) + 360) % 360;
        let bestIndex = 0;
        let bestDist = Infinity;

        for (let i = 0; i < this.count; i++) {
            const ideal = (((-i * step) % 360) + 360) % 360;
            let dist = Math.abs(currentMod - ideal);
            if (dist > 180) dist = 360 - dist;
            if (dist < bestDist) {
                bestDist = dist;
                bestIndex = i;
            }
        }

        this.snapTo(bestIndex);
        this.velocity = 0;
    }

    updatePositions() {
        const step = this.getStep();
        const radFactor = Math.PI / 180;
        let frontIndex = 0;
        let maxFrontness = -1;

        this.cards.forEach((card, i) => {
            const angle = (i * step + this.rotation) * radFactor;
            const x = Math.sin(angle) * this.radius;
            const z = Math.cos(angle) * this.radius;
            const frontness = (z + this.radius) / (2 * this.radius);

            if (frontness > maxFrontness) {
                maxFrontness = frontness;
                frontIndex = i;
            }

            const scale = 0.78 + 0.22 * frontness;
            const opacity = frontness < 0.2 ? 0 : 0.38 + 0.62 * frontness;
            const blur = (1 - frontness) * 2.8;
            const isHovered = this.hoveredIndex === i;
            const hoverScale = isHovered ? 1.06 : 1;
            const hidden = frontness < 0.15;

            card.style.transform = `translate3d(${x}px, 0, ${z}px) scale(${scale * hoverScale})`;
            card.style.opacity = hidden ? 0 : opacity;
            card.style.visibility = hidden ? 'hidden' : 'visible';
            card.style.pointerEvents = hidden ? 'none' : 'auto';
            card.style.zIndex = Math.round(frontness * 100);

            const inner = card.querySelector('.review-card-inner');
            inner.style.filter = isHovered ? 'blur(0px) brightness(1.08)' : `blur(${blur}px)`;

            card.classList.toggle('is-front', frontness > 0.92);
            card.classList.toggle('is-hovered', isHovered);
        });

        if (frontIndex !== this.activeIndex && this.snapTarget === null && !this.dragging) {
            this.activeIndex = frontIndex;
        }
    }

    animate() {
        if (this.snapTarget !== null) {
            const diff = this.snapTarget - this.rotation;
            if (Math.abs(diff) < 0.3) {
                this.rotation = this.snapTarget;
                this.snapTarget = null;
                if (!this.paused) this.velocity = 0;
            } else {
                this.rotation += diff * 0.1;
            }
        } else if (!this.paused && !this.dragging && !this.reducedMotion) {
            this.rotation += this.speed + this.velocity;
            this.velocity *= 0.95;
            if (Math.abs(this.velocity) < 0.001) this.velocity = 0;
        }

        this.updatePositions();
        this.raf = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        cancelAnimationFrame(this.raf);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-reviews-carousel]').forEach(el => {
        new ReviewsCarousel3D(el);
    });
});

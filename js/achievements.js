document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.ach-filter-btn');
    const cards = document.querySelectorAll('.ach-card[data-game]');

    if (!filters.length || !cards.length) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const game = btn.dataset.filter;

            cards.forEach(card => {
                const match = game === 'all' || card.dataset.game === game;
                card.classList.toggle('hidden', !match);
            });
        });
    });
});

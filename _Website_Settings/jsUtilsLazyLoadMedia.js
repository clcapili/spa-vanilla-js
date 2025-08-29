let lazyObserver = null;

export function lazyLoadMedia(container = document) {
    if (!('IntersectionObserver' in window)) {
        container.querySelectorAll('img[data-src], video[data-src]').forEach(el => {
            el.src = el.dataset.src;
            if (el.tagName === 'VIDEO') el.load();
        });
        return;
    }

    if (!lazyObserver) {
        lazyObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.src = el.dataset.src;

                    if (el.tagName === 'VIDEO') {
                        if (el.dataset.poster) el.poster = el.dataset.poster;
                        el.load();
                    }

                    el.removeAttribute('data-src');
                    obs.unobserve(el);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px',
            threshold: 0.1
        });
    }

    container.querySelectorAll('img[data-src], video[data-src]').forEach(el => lazyObserver.observe(el));
}

export function cleanupLazyMedia(container = document) {
    if (!lazyObserver) return;

    container.querySelectorAll('img[data-src], video[data-src]').forEach(el => {
        lazyObserver.unobserve(el); // stop observing
    });
}
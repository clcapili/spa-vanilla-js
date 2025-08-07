let observer = null;

export function lazyLoadMedia() {
    const lazyElements = document.querySelectorAll('img.lazy');

    observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                if (el.tagName === 'IMG') {
                    el.src = el.dataset.src;
                }

                el.classList.remove('lazy');
                obs.unobserve(el);
            }
        });
    }, {
        rootMargin: '200px 0px',
        threshold: 0.01,
    });

    lazyElements.forEach(el => observer.observe(el));
}

export function cleanupLazyMedia() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}
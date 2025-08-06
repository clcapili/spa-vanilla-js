import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            history.pushState(null, null, link.href);
            router();
        }
    });

    window.addEventListener('popstate', router);
    router();
});
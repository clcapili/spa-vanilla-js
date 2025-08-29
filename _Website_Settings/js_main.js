import { router, loadRoutes } from './js_router.js';
import { lazyLoadMedia } from './jsUtilsLazyLoadMedia.js';

async function initLayout() {
    const headerContainer = document.getElementById('headerContainer');
    const footerContainer = document.getElementById('footerContainer');

    const HeaderComponent = (await import('./jsComponentHeader.js')).default;
    const FooterComponent = (await import('./jsComponentFooter.js')).default;

    const header = new HeaderComponent();
    const footer = new FooterComponent();

    headerContainer.innerHTML = await header.getHtml();
    footerContainer.innerHTML = await footer.getHtml();

    await header.onMount?.();
    await footer.onMount?.();

    lazyLoadMedia(headerContainer);
    lazyLoadMedia(footerContainer);
}

async function initSPA() {
    await loadRoutes();

    // SPA link delegation
    document.body.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (!link) return;

        e.preventDefault();
        const href = link.getAttribute('href');
        if (href !== location.pathname) {
            history.pushState(null, null, href);
            router();
        }
    });

    // handle back/forward buttons
    window.addEventListener('popstate', router);

    // load initial route
    await router();
}

document.addEventListener('DOMContentLoaded', async () => {
    await initLayout();
    await initSPA();
});
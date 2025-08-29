import { lazyLoadMedia, cleanupLazyMedia } from './utils/lazyLoadMedia.js';

let currentView = null;
let routes = [];

// Load static routes from skin config
export async function loadRoutes() {
    const skinFolder = document.body.dataset.skin;
    if (!skinFolder) throw new Error("No skin folder specified in body[data-skin]");

    const configModule = await import(`/${skinFolder}/content.js`);
    const basePath = configModule.default.basePath || '';

    routes = [
        { path: `/${basePath}/gift-cards/custom-cards/`, view: () => import('./pages/GiftCards/CustomCards.js') },
        { path: `/${basePath}/gift-cards/`, view: () => import('./pages/GiftCards/GiftCards.js') },
        { path: `/${basePath}/e-gifts/`, view: () => import('./pages/EGifts/EGifts.js') },
        { path: `/${basePath}/check-balance/`, view: () => import('./pages/CheckBalance.js') },
        { path: `/${basePath}/my-account/`, view: () => import('./pages/MyAccount.js') },
        { path: `/${basePath}/rewards/`, view: () => import('./pages/Rewards.js') },
        { path: `/${basePath}/`, view: () => import('./pages/Landing.js') }, // fallback last
    ];

    routes.sort((a, b) => b.path.length - a.path.length); // longest path first
}

// normalize URL paths (trailing slash)
function normalizePath(path) {
    return path.replace(/\/+$/, '') + '/';
}

// match static route
function matchRoute(path) {
    return routes.find(r => normalizePath(r.path) === path) || routes[routes.length - 1];
}

// main SPA router
export async function router() {
    if (!routes.length) await loadRoutes();
    const main = document.getElementById('main-content');
    if (!main) throw new Error('Missing #main-content container');

    const path = normalizePath(location.pathname);
    const route = matchRoute(path);

    // destroy previous view
    if (currentView) {
        cleanupLazyMedia(main);
        await currentView.destroy();
        currentView = null;
    }

    // instantiate new view
    const ViewClass = (await route.view()).default;
    currentView = new ViewClass({ path });

    // load page-specific CSS before rendering
    if (currentView.cssHrefs?.length) {
        currentView.loadMultipleCSS(currentView.cssHrefs);
    }

    // render HTML with includes
    let html = await currentView.getHtml();
    html = await currentView.fetchAllIncludes(html);
    main.innerHTML = html;

    // immediately lazy-load all media inside the main content
    lazyLoadMedia(main);

    // fade-in animation
    main.classList.remove('fade-in');
    void main.offsetWidth;
    main.classList.add('fade-in');

    // mount view
    await currentView.onMount?.();

    // handle subpages if view has them
    if (typeof currentView.loadCurrentSubpage === 'function') {
        await currentView.loadCurrentSubpage();
    }
}
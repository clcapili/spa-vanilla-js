import { routes } from './routes.js';
import { Layout } from './components/Layout.js';

let currentView = null;

export async function router() {
    const path = location.pathname;
    let match = routes.find(r => r.path === path);

    if (!match) {
        match = routes[0]; // fallback to landing
        history.replaceState(null, null, match.path);
    }

    // clean up current view
    if (currentView?.destroy) {
        currentView.destroy();
    }

    // load new view
    const ViewClass = (await match.view()).default;
    currentView = new ViewClass();

    // render HTML
    const rawHtml = await currentView.getHtml();
    const html = Layout(rawHtml);

    const app = document.getElementById('app');
    if (!app) return console.error('Missing #app container');

    app.innerHTML = html;

    // fade in
    const main = app.querySelector('main');
    if (main) {
        main.classList.add('fade-in');
    }

    // set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // skip link set focus
    if (location.hash === '#main-content') {
        const mainEl = document.getElementById('main-content');
        if (mainEl) {
            mainEl.setAttribute('tabindex', '-1');
            mainEl.focus();
            mainEl.removeAttribute('tabindex');
        }
    }

    // after DOM is injected, call onMount
    if (typeof currentView.onMount === 'function') {
        await currentView.onMount();
    }
}
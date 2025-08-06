export const routes = [
    { path: '/', view: () => import('./classes/Landing.js') },
    { path: '/gift-cards/', view: () => import('./classes/GiftCards.js') },
    { path: '/e-gifts/', view: () => import('./classes/EGifts.js') },
];
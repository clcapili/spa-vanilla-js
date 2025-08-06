import { Header } from './Header.js';
import { Footer } from './Footer.js';

export function Layout(content) {
    const hasMain = /<main[^>]*id=["']main-content["']/i.test(content);
    const mainEl = hasMain 
        ? content 
        : `<main id="main-content">${content}</main>`;

    return `
        ${Header()}
        ${mainEl}
        ${Footer()}
    `;
}
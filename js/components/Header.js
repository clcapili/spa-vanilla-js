export function Header() {
    return `
        <header class="header-desktop">
            <!-- Skip link for accessibility -->
            <div class="visually-hidden-focusable">
                <a href="#main-content" class="skip-link">Skip to main content</a>
            </div>
            
            <div class="container">
                <div class="site-logo">
                    <a href="/" data-link>Brandx</a>
                </div>

                <nav>
                    <a href="/gift-cards/" class="nav-item" data-link>Gift Cards</a>
                    <a href="/e-gifts/" class="nav-item" data-link>Send E-Gift</a>
                </nav>
            </div>
        </header>
    `;
}
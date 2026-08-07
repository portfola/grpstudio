import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { SHOP_URL } from '../data/site';

/**
 * Slim persistent header carried on every route by RootLayout: the wordmark
 * links home, the shop link and theme toggle sit opposite. The site is a single
 * stream of singles now, so there's no page menu — the homepage is the only
 * index — and the shop is a Shopify storefront on its own subdomain, so it's a
 * plain <a> (a hard navigation off the SPA), not a router <Link>.
 */
export default function Header() {
  function trackShopClick() {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.capture('shop_link_clicked', { location: 'header' });
    });
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" aria-label="Georgetown Reggae Project — home">
        <span className="site-header__brand-text">GRP</span>
        <span className="site-header__brand-tick" aria-hidden="true" />
      </Link>

      <nav className="site-header__nav" aria-label="Primary">
        <a className="site-header__shop" href={SHOP_URL} onClick={trackShopClick}>
          Shop
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

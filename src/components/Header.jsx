import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

/**
 * Slim persistent header carried on every route by RootLayout: the wordmark
 * links home, the theme toggle sits opposite. The site is a single stream of
 * singles now, so there's no page menu — the homepage is the only index.
 */
export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" aria-label="Georgetown Reggae Project — home">
        <span className="site-header__brand-text">GRP</span>
        <span className="site-header__brand-tick" aria-hidden="true" />
      </Link>

      <ThemeToggle />
    </header>
  );
}

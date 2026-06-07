import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

/**
 * Primary nav lives on every route via RootLayout. Active state is computed
 * from the pathname rather than <NavLink> because the targets don't map 1:1 to
 * routes: "Releases" points at the home anchor (/#releases) yet should also
 * read active on the song detail pages (/releases/:slug), which NavLink's
 * path-prefix matching can't express cleanly alongside a hash target.
 */
const NAV = [
  { to: '/#releases', label: 'Releases', isActive: (p) => p === '/' || p.startsWith('/releases') },
  { to: '/album',     label: 'Album',    isActive: (p) => p.startsWith('/album') },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" aria-label="Georgetown Reggae Project — home">
        <span className="site-header__brand-text">GRP</span>
        <span className="site-header__brand-tick" aria-hidden="true" />
      </Link>

      <nav className="site-header__nav" aria-label="Primary">
        <ul className="site-header__links">
          {NAV.map(({ to, label, isActive }) => {
            const active = isActive(pathname);
            return (
              <li key={label}>
                <Link
                  to={to}
                  className={`site-header__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}

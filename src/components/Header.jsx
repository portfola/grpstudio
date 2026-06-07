import { useEffect, useRef, useState } from 'react';
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
  { to: '/albums',    label: 'Albums',   isActive: (p) => p.startsWith('/albums') },
];

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close the mobile menu on route change so it never lingers across pages.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // While open, close on Escape or a click/tap outside the nav.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e) { if (e.key === 'Escape') setMenuOpen(false); }
    function onPointer(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" aria-label="Georgetown Reggae Project — home">
        <span className="site-header__brand-text">GRP</span>
        <span className="site-header__brand-tick" aria-hidden="true" />
      </Link>

      <nav
        ref={navRef}
        className={`site-header__nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Primary"
      >
        <ul id="primary-menu" className="site-header__links">
          {NAV.map(({ to, label, isActive }) => {
            const active = isActive(pathname);
            return (
              <li key={label}>
                <Link
                  to={to}
                  className={`site-header__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ThemeToggle />

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="site-header__menu-icon" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </nav>
    </header>
  );
}

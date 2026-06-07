import { useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

/**
 * React Router doesn't scroll to #hash targets or reset scroll on route
 * change. This handles both: jump to the hashed element if present (e.g.
 * the header "Releases" link -> /#releases), else scroll to top.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/**
 * Wraps every route: film grain, persistent header, <main> outlet, footer.
 * Header here is a minimal navigable scaffold — Task 5 builds the full
 * sticky header + Task 4 adds the theme toggle into the marked slot.
 */
export default function RootLayout() {
  return (
    <>
      <ScrollManager />
      {/* Site-wide default head; per-page <Head> (e.g. release pages) overrides. */}
      <Head>
        <html lang="en" />
        {/* Site-wide defaults; pages set their own <title>/og via <Head> and win. */}
        <title>Georgetown Reggae Project</title>
        <meta name="description" content="Georgetown Reggae Project — innovative, studio-produced reggae riddims. Always militant. Never political." />
        <meta property="og:site_name" content="Georgetown Reggae Project" />
        <meta property="og:title" content="Georgetown Reggae Project" />
        <meta property="og:image" content="https://grpstudio.com/og/default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <Link to="/" className="site-header__brand">GRP</Link>
        <nav className="site-header__nav" aria-label="Primary">
          <NavLink to="/#releases" className="site-header__link">Releases</NavLink>
          <NavLink to="/album" className="site-header__link">Album</NavLink>
          {/* theme-toggle slot — filled in Task 4 */}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-rule" />
        <p className="footer-text">I know the concept of Rasta means&hellip;<br />RIGHTEOUSNESS</p>
      </footer>
    </>
  );
}

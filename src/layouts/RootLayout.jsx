import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Header from '../components/Header';

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

      <a className="skip-link" href="#main">Skip to content</a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-rule" />
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/#releases">Releases</Link>
          <Link to="/albums">Albums</Link>
        </nav>
        <p className="footer-text">I know the concept of Rasta means&hellip;<br />RIGHTEOUSNESS</p>
      </footer>
    </>
  );
}

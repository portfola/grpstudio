import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Header from '../components/Header';
import { SITE } from '../data/site';
import rasCarWebp from '../assets/ras-car.webp';
import rasCarPng from '../assets/ras-car.png';

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
        {/* Site-wide defaults; pages set their own <title>/og/canonical via <Head> and win
            (react-helmet-async dedupes by rel/property, so a page's own tag replaces this). */}
        <title>Georgetown Reggae Project</title>
        <meta name="description" content="Georgetown Reggae Project — innovative, studio-produced reggae riddims. Always militant. Never political." />
        <link rel="canonical" href={`${SITE}/`} />
        <meta property="og:site_name" content="Georgetown Reggae Project" />
        <meta property="og:title" content="Georgetown Reggae Project" />
        <meta property="og:image" content={`${SITE}/og/grp-logo.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: 'Georgetown Reggae Project',
            url: SITE,
            genre: 'Reggae',
          })}
        </script>
      </Head>

      <div className="grain" aria-hidden="true" />

      <a className="skip-link" href="#main">Skip to content</a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="footer">
        <figure className="footer-art">
          <picture>
            <source srcSet={rasCarWebp} type="image/webp" />
            <img
              src={rasCarPng}
              className="footer-art__img"
              width="800"
              height="444"
              alt="A dreadlocked Rasta goat cruising in a vintage Mercedes, RAS plate"
            />
          </picture>
        </figure>
        <div className="footer-rule" />
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/#releases">Releases</Link>
        </nav>
        <p className="footer-text">I know the concept of Rasta means&hellip;<br />RIGHTEOUSNESS</p>
      </footer>
    </>
  );
}

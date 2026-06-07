import { Link } from 'react-router-dom';
import reggae from '../assets/reggae-is-happening.jpg';
import summer from '../assets/GRP_Summer.jpg';
import { getAllReleases, getLatestRelease } from '../data/releases';
import { useScrollReveal } from '../hooks/useScrollReveal';

function formatShort(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/**
 * Homepage: hero + quote (brand) → latest-drop feature → the catalogue grid →
 * albums teaser → about. The newest single is spotlighted; the grid carries the
 * rest. The back-catalogue of full records lives at /albums (teaser links out).
 */
export default function Home() {
  const latest = getLatestRelease();
  const rest = getAllReleases().slice(1); // catalogue below the spotlight

  useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="brand anim-initial">
            <span className="brand-grp">GRP</span>
            <span className="brand-sub">Georgetown Reggae Project &mdash; Sammy-on-Fire Sound Systems</span>
          </h1>

          <div className="hero-photo-container anim-initial" style={{ animationDelay: '0.3s' }}>
            <div className="photo-overlay" />
            <div className="photo-grain" />
            <img src={reggae} className="hero-photo" alt="Two men play reggae guitar" />
            <div className="photo-border" />
          </div>

          <blockquote className="quote anim-initial" style={{ animationDelay: '0.7s' }}>
            <p>Maybe we are the only one who can express the people's feeling through music.</p>
            <p>And because we can do that, the people love it&hellip;</p>
            <p className="quote-kicker">so we did it.</p>
          </blockquote>
        </div>
      </section>

      {/* Divider ticker */}
      <div className="ticker anim-scroll" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <span className="ticker-set" key={i}>
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>TR-808</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>CR-78</span><span className="ticker-dot" />
              <span>LINNDRUM</span><span className="ticker-dot" />
              <span>TR-909</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>DR-202</span><span className="ticker-dot" />
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>TR-707</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>LM-1</span><span className="ticker-dot" />
              <span>TR-727</span><span className="ticker-dot" />
              <span>DR-110</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>TR-606</span><span className="ticker-dot" />
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>LINN 9000</span><span className="ticker-dot" />
              <span>TR-505</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>CR-68</span><span className="ticker-dot" />
              <span>LM-2</span><span className="ticker-dot" />
              <span>DR-55</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>TR-626</span><span className="ticker-dot" />
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>TR-77</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>LINNDRUM II</span><span className="ticker-dot" />
              <span>DR-220</span><span className="ticker-dot" />
              <span>R-8</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>DR-550</span><span className="ticker-dot" />
              <span>LINN DRUM MKIII</span><span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* Latest drop — the newest single, spotlighted. Anchors the #releases zone. */}
      {latest && (
        <section className="latest anim-scroll" id="releases">
          <p className="latest__eyebrow">Latest Drop</p>
          <div className="latest__inner">
            <Link to={`/releases/${latest.slug}`} className="latest__cover-link" aria-label={`${latest.title} — open release`}>
              <span className="release__cover-frame">
                <span className="photo-overlay" />
                <span className="photo-grain" />
                <img src={latest.coverArt} alt={`${latest.title} cover art`} className="release__cover" />
                <span className="photo-border" />
              </span>
            </Link>

            <div className="latest__meta">
              <h2 className="latest__title">{latest.title}</h2>
              <p className="latest__date">{formatShort(latest.releaseDate)}</p>
              {latest.refrain && <p className="latest__refrain">&ldquo;{latest.refrain}&rdquo;</p>}
              <div className="release__actions">
                <Link className="release__btn release__btn--primary" to={`/releases/${latest.slug}`}>
                  Open release <span aria-hidden="true">&rarr;</span>
                </Link>
                <a className="release__btn" href={latest.spotifyTrackUrl} target="_blank" rel="noreferrer">
                  Play on Spotify <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The catalogue — every release below the spotlight. */}
      {rest.length > 0 && (
        <section className="releases anim-scroll">
          <h2 className="section-heading">The Catalogue</h2>
          <ul className="releases-grid">
            {rest.map((r) => (
              <li key={r.slug} className="release-card">
                <Link to={`/releases/${r.slug}`} className="release-card__link">
                  <span className="release-card__cover-wrap">
                    <img src={r.coverArt} alt={`${r.title} cover art`} className="release-card__cover" />
                  </span>
                  <span className="release-card__title">{r.title}</span>
                  <span className="release-card__date">{formatShort(r.releaseDate)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Albums teaser — quiet pointer to the full-length back-catalogue. */}
      <section className="albums-teaser anim-scroll">
        <p className="albums-teaser__line">Looking for the full records?</p>
        <Link to="/albums" className="albums-teaser__link">
          From the Vaults &mdash; the albums <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      {/* About */}
      <section className="about anim-scroll">
        <h2 className="section-heading">Whaddaman Say</h2>
        <div className="about-grid">
          <div className="about-photo-container">
            <div className="photo-overlay" />
            <div className="photo-grain" />
            <img src={summer} className="about-photo" alt="Three men stand in front of the sea" />
          </div>
          <div className="about-body">
            <p>Georgetown Reggae Project is a musical experiment focused on innovative, studio-produced, sample-rich reggae riddims.</p>
            <p className="about-motto">Always militant. Never political.</p>
          </div>
        </div>
      </section>
    </>
  );
}

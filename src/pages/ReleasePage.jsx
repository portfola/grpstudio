import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { getReleaseBySlug, getReleaseNeighbors, getAllReleases } from '../data/releases';
import NotFound from './NotFound';

const SITE = 'https://grpstudio.com'; // canonical origin for absolute OG + share urls

/** open.spotify.com/track/ID -> open.spotify.com/embed/track/ID */
function toEmbedUrl(trackUrl) {
  return trackUrl.replace('open.spotify.com/', 'open.spotify.com/embed/');
}

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

/**
 * Catalogue number, chronological (oldest = 001). getAllReleases() is
 * newest-first, so the chronological position is (count - index).
 */
function catalogNumber(slug) {
  const all = getAllReleases();
  const i = all.findIndex((r) => r.slug === slug);
  return `GRP-${String(all.length - i).padStart(3, '0')}`;
}

/**
 * Per-song landing page — the full release anatomy and the vertical slice that
 * proves data → render → prerender → per-route OG. The <Head> block sets the
 * social card; everything below is the dub-plate sleeve treatment.
 */
export default function ReleasePage() {
  const { slug } = useParams();
  const release = getReleaseBySlug(slug);

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef();
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  if (!release) return <NotFound />;

  const { title, releaseDate, coverArt, ogImage, spotifyTrackUrl, refrain, linerNotes, credits } = release;
  // `engineer` may be a single name or a list; normalise to an array either way.
  const engineers = [].concat(credits?.engineer ?? []);
  const { newer, older } = getReleaseNeighbors(slug);
  const ogAbsolute = SITE + (ogImage || '/og/tabula-rasta.jpg');
  const shareUrl = `${SITE}/releases/${slug}`;

  function copyLink() {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => { /* clipboard blocked — no-op */ });
  }

  return (
    <article className="release">
      <Head>
        <title>{`${title} — Georgetown Reggae Project`}</title>
        <meta name="description" content={`${title} — a new riddim from Georgetown Reggae Project.`} />
        <meta property="og:type" content="music.song" />
        <meta property="og:title" content={`${title} — Georgetown Reggae Project`} />
        <meta property="og:description" content={refrain || 'Always militant. Never political.'} />
        <meta property="og:image" content={ogAbsolute} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:image" content={ogAbsolute} />
      </Head>

      <p className="release__back anim-initial"><Link to="/#releases">&larr; All releases</Link></p>

      <header className="release__masthead anim-initial" style={{ animationDelay: '0.08s' }}>
        <div className="release__cover-frame">
          <div className="photo-overlay" />
          <div className="photo-grain" />
          <img
            className="release__cover"
            src={coverArt}
            alt={`${title} cover art`}
            width="320"
            height="320"
          />
          <div className="photo-border" />
        </div>

        <div className="release__meta">
          <p className="release__catalog">{catalogNumber(slug)}</p>
          <h1 className="release__title">{title}</h1>
          <p className="release__date">{formatDate(releaseDate)}</p>

          <div className="release__actions">
            <a
              className="release__btn release__btn--primary"
              href={spotifyTrackUrl}
              target="_blank"
              rel="noreferrer"
            >
              Play on Spotify <span aria-hidden="true">&#8599;</span>
            </a>
            <button
              type="button"
              className={`release__btn${copied ? ' is-copied' : ''}`}
              onClick={copyLink}
            >
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Link copied to clipboard' : ''}
            </span>
          </div>
        </div>
      </header>

      {refrain && (
        <figure className="release__refrain anim-initial" style={{ animationDelay: '0.16s' }}>
          <blockquote>{refrain}</blockquote>
        </figure>
      )}

      <div className="release__listen anim-initial" style={{ animationDelay: '0.24s' }}>
        <div className="player-label">
          <span className="label-rule" />
          <span className="label-text">LISTEN</span>
          <span className="label-rule" />
        </div>
        <iframe
          className="release__player"
          title={`${title} — Spotify player`}
          src={toEmbedUrl(spotifyTrackUrl)}
          width="100%"
          height="152"
          frameBorder="0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>

      {linerNotes && (
        <div className="release__liner">
          {linerNotes.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}

      {credits && (credits.producer || credits.riddim || credits.studio || engineers.length > 0 || credits.musicians?.length > 0) && (
        <section className="release__credits-wrap">
          <h2 className="release__credits-heading">Credits</h2>
          <dl className="release__credits">
            {credits.producer && (<><dt>Produced by</dt><dd>{credits.producer}</dd></>)}
            {credits.riddim && (<><dt>Riddim</dt><dd>{credits.riddim}</dd></>)}
            {credits.studio && (<><dt>Recorded at</dt><dd>{credits.studio}</dd></>)}
            {engineers.length > 0 && (
              <><dt>{engineers.length > 1 ? 'Engineers' : 'Engineer'}</dt><dd>{engineers.join(' · ')}</dd></>
            )}
            {credits.musicians?.length > 0 && (
              <><dt>Players</dt><dd>{credits.musicians.join(' · ')}</dd></>
            )}
          </dl>
        </section>
      )}

      {(older || newer) && (
        <nav className="release__nav" aria-label="More releases">
          {older && (
            <Link className="release__nav-link release__nav-link--prev" to={`/releases/${older.slug}`}>
              <span className="release__nav-dir">&larr; Older</span>
              <span className="release__nav-name">{older.title}</span>
            </Link>
          )}
          {newer && (
            <Link className="release__nav-link release__nav-link--next" to={`/releases/${newer.slug}`}>
              <span className="release__nav-dir">Newer &rarr;</span>
              <span className="release__nav-name">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}

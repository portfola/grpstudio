import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { getAlbumBySlug } from '../data/albums';
import NotFound from './NotFound';

const SITE = 'https://grpstudio.com'; // canonical origin for absolute OG + share urls

/** Build the SoundCloud visual-player embed URL from a playlist/set URL. */
function toEmbedUrl(setUrl) {
  const params = new URLSearchParams({
    url: setUrl,
    color: '#c4873a',
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: 'true',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

/** Turn an Internet Archive item URL (…/details/ID) into its embed URL (…/embed/ID). */
function toArchiveEmbedUrl(itemUrl) {
  return itemUrl.replace('/details/', '/embed/');
}

/**
 * Per-album landing page (/albums/:slug). Mirrors the release-page anatomy —
 * framed sleeve, title + year, in-place playback, notes, credits — but the
 * record is a full SoundCloud playlist rather than a Spotify single. The
 * <Head> block bakes the per-album social card at prerender.
 */
export default function AlbumPage() {
  const { slug } = useParams();
  const album = getAlbumBySlug(slug);

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef();
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  if (!album) return <NotFound />;

  const { title, year, coverArt, ogImage, soundcloudUrl, archiveUrl, notes, tracklist, credits } = album;
  const ogAbsolute = SITE + (ogImage || '/og/tabula-rasta.jpg');
  const shareUrl = `${SITE}/albums/${slug}`;

  // Each album streams from one source: Internet Archive (debut) or SoundCloud.
  const onArchive = Boolean(archiveUrl);
  const listenUrl = archiveUrl || soundcloudUrl;
  const listenLabel = onArchive ? 'Listen on Internet Archive' : 'Listen on SoundCloud';
  const embedSrc = onArchive ? toArchiveEmbedUrl(archiveUrl) : toEmbedUrl(soundcloudUrl);
  const playerTitle = onArchive
    ? `${title} — Internet Archive player`
    : `${title} — SoundCloud player`;

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
        <meta name="description" content={`${title} — a full-length record from Georgetown Reggae Project.`} />
        <meta property="og:type" content="music.album" />
        <meta property="og:title" content={`${title} — Georgetown Reggae Project`} />
        <meta property="og:description" content="Always militant. Never political." />
        <meta property="og:image" content={ogAbsolute} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:image" content={ogAbsolute} />
      </Head>

      <p className="release__back anim-initial"><Link to="/albums">&larr; All albums</Link></p>

      <header className="release__masthead anim-initial" style={{ animationDelay: '0.08s' }}>
        <div className="release__cover-frame">
          <div className="photo-overlay" />
          <div className="photo-grain" />
          <img
            className="release__cover"
            src={coverArt}
            alt={`${title} album cover`}
            width="320"
            height="320"
          />
          <div className="photo-border" />
        </div>

        <div className="release__meta">
          <p className="release__catalog">Album</p>
          <h1 className="release__title">{title}</h1>
          <p className="release__date">{year}</p>

          <div className="release__actions">
            <a
              className="release__btn release__btn--primary"
              href={listenUrl}
              target="_blank"
              rel="noreferrer"
            >
              {listenLabel} <span aria-hidden="true">&#8599;</span>
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

      <div className="release__listen anim-initial" style={{ animationDelay: '0.16s' }}>
        <div className="player-label">
          <span className="label-rule" />
          <span className="label-text">FULL RECORD</span>
          <span className="label-rule" />
        </div>
        <iframe
          className="release__player"
          title={playerTitle}
          src={embedSrc}
          width="100%"
          height="380"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          allow="autoplay"
        />
      </div>

      {notes && (
        <div className="release__liner">
          {notes.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}

      {tracklist?.length > 0 && (
        <section className="album__tracklist-wrap">
          <h2 className="release__credits-heading">Tracklist</h2>
          <ol className="album__tracklist">
            {tracklist.map((t, i) => (
              <li key={i} className="album__track">
                <span className="album__track-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="album__track-name">{t}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {credits && (credits.producer || credits.studio || credits.musicians?.length > 0) && (
        <section className="release__credits-wrap">
          <h2 className="release__credits-heading">Credits</h2>
          <dl className="release__credits">
            {credits.producer && (<><dt>Produced by</dt><dd>{credits.producer}</dd></>)}
            {credits.studio && (<><dt>Studio</dt><dd>{credits.studio}</dd></>)}
            {credits.musicians?.length > 0 && (
              <><dt>Players</dt><dd>{credits.musicians.join(' · ')}</dd></>
            )}
          </dl>
        </section>
      )}
    </article>
  );
}

import { useParams, Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { getReleaseBySlug, getReleaseNeighbors } from '../data/releases';
import NotFound from './NotFound';

const SITE = 'https://grpstudio.com'; // canonical origin for absolute OG urls

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
 * Per-song landing page. Minimal layout for the SSG/OG-proving slice;
 * Task 6 builds the full anatomy (cover treatment, refrain moment, credits
 * styling, share + prev/next chrome).
 */
export default function ReleasePage() {
  const { slug } = useParams();
  const release = getReleaseBySlug(slug);
  if (!release) return <NotFound />;

  const { title, releaseDate, coverArt, ogImage, spotifyTrackUrl, refrain, linerNotes, credits } = release;
  const { newer, older } = getReleaseNeighbors(slug);
  const ogAbsolute = SITE + (ogImage || '/og/default.jpg');

  return (
    <article className="release">
      <Head>
        <title>{`${title} — Georgetown Reggae Project`}</title>
        <meta name="description" content={`${title} — a new riddim from Georgetown Reggae Project.`} />
        <meta property="og:type" content="music.song" />
        <meta property="og:title" content={`${title} — Georgetown Reggae Project`} />
        <meta property="og:description" content={refrain || 'Always militant. Never political.'} />
        <meta property="og:image" content={ogAbsolute} />
        <meta property="og:url" content={`${SITE}/releases/${slug}`} />
        <meta name="twitter:image" content={ogAbsolute} />
      </Head>

      <p className="release__back"><Link to="/#releases">&larr; All releases</Link></p>

      <img className="release__cover" src={coverArt} alt={`${title} cover art`} width="320" height="320" />
      <h1 className="release__title">{title}</h1>
      <p className="release__date">{formatDate(releaseDate)}</p>

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

      {linerNotes && (
        <div className="release__liner">
          {linerNotes.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}

      {refrain && <blockquote className="release__refrain">{refrain}</blockquote>}

      {credits && (
        <dl className="release__credits">
          {credits.producer && (<><dt>Produced by</dt><dd>{credits.producer}</dd></>)}
          {credits.riddim && (<><dt>Riddim</dt><dd>{credits.riddim}</dd></>)}
          {credits.studio && (<><dt>Studio</dt><dd>{credits.studio}</dd></>)}
          {credits.musicians?.length > 0 && (
            <><dt>Players</dt><dd>{credits.musicians.join(' · ')}</dd></>
          )}
        </dl>
      )}

      <nav className="release__nav" aria-label="More releases">
        {older && <Link to={`/releases/${older.slug}`}>&larr; {older.title}</Link>}
        {newer && <Link to={`/releases/${newer.slug}`}>{newer.title} &rarr;</Link>}
      </nav>
    </article>
  );
}

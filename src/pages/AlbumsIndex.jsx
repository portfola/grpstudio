import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { getAllAlbums } from '../data/albums';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SITE = 'https://grpstudio.com';

/**
 * /albums — "From the Vaults": the cover-art index of full-length records.
 * Distinct from the homepage releases grid (singles); reuses the same
 * cover-grid component. Each sleeve links to its /albums/:slug page.
 */
export default function AlbumsIndex() {
  useScrollReveal();

  const albums = getAllAlbums();

  return (
    <section className="albums">
      <Head>
        <title>Albums — Georgetown Reggae Project</title>
        <meta name="description" content="From the Vaults — the full-length records of Georgetown Reggae Project." />
        <meta property="og:title" content="Albums — Georgetown Reggae Project" />
        <meta property="og:image" content={`${SITE}/og/tabula-rasta.jpg`} />
      </Head>

      <h1 className="section-heading">From the Vaults</h1>
      <p className="albums__intro">
        The full-length records &mdash; played end to end, the way they were cut.
      </p>

      <ul className="releases-grid anim-scroll">
        {albums.map((a) => (
          <li key={a.slug} className="release-card">
            <Link to={`/albums/${a.slug}`} className="release-card__link">
              <span className="release-card__cover-wrap">
                <img src={a.coverArt} alt={`${a.title} album cover`} className="release-card__cover" />
              </span>
              <span className="release-card__title">{a.title}</span>
              <span className="release-card__date">{a.year}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

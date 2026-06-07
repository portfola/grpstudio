import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

/**
 * The SoundCloud back-catalogue, rehomed off the front page.
 * Minimal scaffold for the spine; Task 8 builds the full "From the Vaults" page.
 */
export default function AlbumPage() {
  return (
    <section className="album player-section">
      <Head>
        <title>From the Vaults — Georgetown Reggae Project</title>
        <meta property="og:title" content="From the Vaults — Georgetown Reggae Project" />
      </Head>

      <h1 className="section-heading">From the Vaults</h1>
      <div className="player-embed">
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta&color=%23c4873a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          title="SoundCloud Player"
        />
      </div>
      <p className="release__back"><Link to="/#releases">&larr; Back to releases</Link></p>
    </section>
  );
}

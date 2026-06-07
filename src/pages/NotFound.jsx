import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

export default function NotFound() {
  return (
    <section className="player-section" style={{ textAlign: 'center' }}>
      <Head><title>Not found — Georgetown Reggae Project</title></Head>
      <h1 className="section-heading">Lost the riddim</h1>
      <p className="about-body">That page isn&rsquo;t here.</p>
      <p className="release__back"><Link to="/">&larr; Back home</Link></p>
    </section>
  );
}

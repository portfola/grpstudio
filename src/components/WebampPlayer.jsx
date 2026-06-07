import { useEffect, useRef, useState } from 'react';

/**
 * Webamp (Winamp 2 in the browser) player — the same engine the Internet Archive
 * uses for its "Winamp" audio skin. Client-only: Webamp touches window/Audio and
 * is heavy, so it's dynamically imported inside an effect, keeping it out of the
 * SSG prerender and the main bundle. During prerender / before load / on
 * unsupported browsers we render the `fallback` (a plain link to the source).
 *
 * Props:
 *   tracks    [{ url, title, length }]  ordered playlist
 *   fallback  ReactNode                 shown until Webamp mounts (or if it can't)
 */
export default function WebampPlayer({ tracks, fallback }) {
  const mountRef = useRef(null);
  const webampRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | unsupported

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { default: Webamp } = await import('webamp');
      if (cancelled || !mountRef.current) return;

      if (!Webamp.browserIsSupported()) {
        setStatus('unsupported');
        return;
      }

      const webamp = new Webamp({
        initialTracks: tracks.map((t) => ({
          url: t.url,
          duration: t.length,
          metaData: { title: t.title, artist: 'Georgetown Reggae Project' },
        })),
      });
      webampRef.current = webamp;

      await webamp.renderWhenReady(mountRef.current);
      if (cancelled) {
        webamp.dispose();
        webampRef.current = null;
        return;
      }
      setStatus('ready');
    })();

    return () => {
      cancelled = true;
      if (webampRef.current) {
        webampRef.current.dispose();
        webampRef.current = null;
      }
    };
  }, [tracks]);

  return (
    <div className="webamp-host">
      <div ref={mountRef} className="webamp-mount" aria-hidden={status !== 'ready'} />
      {status !== 'ready' && (
        <p className="webamp-fallback">
          {status === 'unsupported'
            ? 'This browser can’t run the Winamp player. '
            : 'Loading the Winamp player… '}
          {fallback}
        </p>
      )}
    </div>
  );
}

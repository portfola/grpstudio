import { useEffect, useRef } from 'react';

/**
 * Spotify embed wired through the iFrame API instead of a plain <iframe>, so we
 * can see *inside* the player. A bare embed is an opaque cross-origin frame —
 * PostHog can't tell whether anyone actually pressed play. The API hands us a
 * controller whose `playback_update` events let us count real streams.
 *
 * Docs: https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
 */
const IFRAME_API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';

/** open.spotify.com/track/ID?si=… -> spotify:track:ID (the URI the API wants) */
function toSpotifyUri(trackUrl) {
  const m = trackUrl.match(/track\/([A-Za-z0-9]+)/);
  return m ? `spotify:track:${m[1]}` : null;
}

/**
 * Load (once) the Spotify iFrame API and resolve with its handle. Spotify only
 * fires `window.onSpotifyIframeApiReady` a single time, so we memoise the
 * promise at module scope and share it across every player on the page.
 */
let apiReadyPromise;
function loadIframeApi() {
  if (apiReadyPromise) return apiReadyPromise;
  apiReadyPromise = new Promise((resolve) => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => resolve(IFrameAPI);
    const script = document.createElement('script');
    script.src = IFRAME_API_SRC;
    script.async = true;
    document.body.appendChild(script);
  });
  return apiReadyPromise;
}

export default function SpotifyPlayer({ trackUrl, title, slug, height = 152 }) {
  // createController() *replaces* this node with the generated iframe.
  const hostRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSG guard
    const uri = toSpotifyUri(trackUrl);
    if (!uri || !hostRef.current) return;

    let cancelled = false;
    let controller;
    // Embeds load paused; we count a stream on each paused -> playing flip.
    let wasPaused = true;

    loadIframeApi().then((IFrameAPI) => {
      if (cancelled || !hostRef.current) return;
      IFrameAPI.createController(
        hostRef.current,
        { uri, width: '100%', height },
        (ctrl) => {
          if (cancelled) { ctrl.destroy?.(); return; }
          controller = ctrl;
          ctrl.addListener('playback_update', (e) => {
            const isPaused = e?.data?.isPaused ?? true;
            if (wasPaused && !isPaused) {
              import('posthog-js').then(({ default: posthog }) => {
                posthog.capture('spotify_track_played', {
                  track: title,
                  release_slug: slug,
                  spotify_uri: uri,
                });
              });
            }
            wasPaused = isPaused;
          });
        },
      );
    });

    return () => {
      cancelled = true;
      controller?.destroy?.();
    };
  }, [trackUrl, title, slug, height]);

  return (
    <div className="release__player">
      <div ref={hostRef} />
    </div>
  );
}

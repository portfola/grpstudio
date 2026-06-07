/**
 * GRP releases — the single source of truth for every single.
 * Adding a drop = append an entry here + drop the cover/og assets in /public.
 * Display order, "latest", prev/next, and prerendered routes are all DERIVED
 * from this array (sorted by releaseDate, newest first). Never hand-order.
 *
 * Schema (see .design/grp-release-redesign/INFORMATION_ARCHITECTURE.md):
 *   slug            string  permanent URL id, lowercase-hyphenated, unique, NEVER changed
 *   title           string  display title + <h1> + OG title
 *   releaseDate     string  ISO date — sole sort key + displayed date
 *   coverArt        string  square cover (public path)
 *   ogImage         string  1200×630 social card (public path); optional → brand default
 *   spotifyTrackUrl string  source for the compact embed + "Play on Spotify"
 *   refrain         string  pulled lyric moment (optional)
 *   linerNotes      string[] paragraphs of long-form prose (optional)
 *   credits         object  { producer, musicians[], riddim, studio } (all optional)
 */
export const releases = [
  {
    slug: 'dub-regatta',
    title: 'Dub Regatta',
    releaseDate: '2026-06-15',
    coverArt: '/covers/dub-regatta.jpg',
    ogImage: '/og/dub-regatta.jpg',
    spotifyTrackUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
    refrain: 'Steady as the tide, we ride the riddim wide.',
    linerNotes: [
      'Cut in a single overnight session, Dub Regatta started as a bassline searching for a horizon. The TR-808 sets the swell; everything else is sail.',
      'It is the first of the new run — militant, never political. A statement of intent before the rest of the fleet comes in.',
    ],
    credits: {
      producer: 'Sammy-on-Fire',
      musicians: ['Bass — I. Lion', 'Keys — D. Ranks', 'Percussion — The Georgetown Section'],
      riddim: 'Regatta',
      studio: 'Georgetown Sound',
    },
  },
  {
    slug: 'iron-lion-riddim',
    title: 'Iron Lion Riddim',
    releaseDate: '2026-05-20',
    coverArt: '/covers/iron-lion-riddim.jpg',
    ogImage: '/og/iron-lion-riddim.jpg',
    spotifyTrackUrl: 'https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb',
    refrain: 'Iron sharpen iron, riddim sharpen mind.',
    linerNotes: [
      'A heavier, slower pull. Iron Lion Riddim leans on a CR-78 shuffle pushed until it growls, with a dub tail that never quite resolves.',
    ],
    credits: {
      producer: 'Sammy-on-Fire',
      musicians: ['Bass — I. Lion', 'Melodica — Whaddaman'],
      riddim: 'Iron Lion',
      studio: 'Georgetown Sound',
    },
  },
];

/** All releases, newest first. */
export function getAllReleases() {
  return [...releases].sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));
}

/** The newest release (the "latest drop"). */
export function getLatestRelease() {
  return getAllReleases()[0];
}

/** Look up one release by slug. Returns undefined if not found. */
export function getReleaseBySlug(slug) {
  return releases.find((r) => r.slug === slug);
}

/** Every slug — used by SSG getStaticPaths to enumerate prerendered routes. */
export function getReleaseSlugs() {
  return releases.map((r) => r.slug);
}

/**
 * Chronological neighbors in the newest-first list:
 *   newer = the drop after this one (toward the top), older = the drop before.
 * Either may be undefined at the ends of the catalogue.
 */
export function getReleaseNeighbors(slug) {
  const all = getAllReleases();
  const i = all.findIndex((r) => r.slug === slug);
  if (i === -1) return { newer: undefined, older: undefined };
  return { newer: all[i - 1], older: all[i + 1] };
}

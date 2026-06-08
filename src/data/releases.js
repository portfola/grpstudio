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
 *   credits         object  { producer, riddim, studio, engineer, musicians[] } (all optional).
 *                           `studio` shows as "Recorded at". `engineer` is a single
 *                           name OR an array (label auto-pluralises to Engineer/Engineers).
 */
export const releases = [
  {
    slug: 'morning-ritual',
    title: 'Morning Ritual',
    releaseDate: '2026-06-15',
    coverArt: '/covers/morning-ritual.jpg',
    ogImage: '/og/morning-ritual.jpg',
    spotifyTrackUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
    refrain: 'So hath Jah planned it.',
    linerNotes: [
      'Who would be the owner of that goat? Rise with the sun and partake of the day; but first, the morning ritual.',
      'Igziabeher! Let Jah be praised.',
    ],
    credits: {
      producer: 'Sammy-on-Fire Sound Systems LLC',
      studio: 'Benzito Boys Studios',
      engineer: ['Paul Allen', 'Benihana Lunch Special']
    },
  },
  {
    slug: 'on-island',
    title: 'On Island',
    releaseDate: '2026-07-03',
    coverArt: '/covers/on-island.jpg',
    ogImage: '/og/on-island.jpg',
    spotifyTrackUrl: 'https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb',
    refrain: 'In full force gale, betta reef my sail...',
    linerNotes: [
      'The studio is closed for summer, and the Gray Lady beckons',
    ],
    credits: {
      producer: 'Sammy-on-Fire Sound Systems LLC',
      studio: 'Milestone Road Studios',
      engineer: 'Tom Nevers',
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

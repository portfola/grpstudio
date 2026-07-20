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
 *   upcoming        bool    PRE-LAUNCH MODE (optional). While true, the release reads as an
 *                           "Upcoming Release": Spotify links + embed are hidden and a
 *                           "let me know when it drops" email signup shows instead.
 *                           Flip to false (or delete the line) + set the real spotifyTrackUrl
 *                           the moment the track is live to restore normal playback.
 *   badge           string  short hype line (optional) — rendered as a round "New!"-style
 *                           sticker slapped on the sleeve (home spotlight + release page)
 *   radioRequest    object  { station, email } (optional) — shows a "request the riddim"
 *                           postcard CTA (home spotlight + release page) with a one-click
 *                           mailto asking that station to keep playing the track. Add this
 *                           once a real station picks the song up for airplay.
 *   refrain         string  pulled lyric moment (optional)
 *   linerNotes      string[] paragraphs of long-form prose (optional)
 *   credits         object  { producer, riddim, studio, engineer, musicians[] } (all optional).
 *                           `studio` shows as "Recorded at". `engineer` is a single
 *                           name OR an array (label auto-pluralises to Engineer/Engineers).
 */
export const releases = [
  // {
  //   slug: 'morning-ritual',
  //   title: 'Morning Ritual',
  //   releaseDate: '2026-06-15',
  //   coverArt: '/covers/morning-ritual.jpg',
  //   ogImage: '/og/morning-ritual.jpg',
  //   spotifyTrackUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
  //   refrain: 'So hath Jah planned it.',
  //   linerNotes: [
  //     'Who would be the owner of that goat? Rise with the sun and partake of the day; but first, the morning ritual.',
  //     'Igziabeher! Let Jah be praised.',
  //   ],
  //   credits: {
  //     producer: 'Sammy-on-Fire Sound Systems LLC',
  //     studio: 'Benzito Boys Studios',
  //     engineer: ['Paul Allen', 'Benihana Lunch Special']
  //   },
  // },
  {
    slug: 'on-island',
    title: 'On Island',
    releaseDate: '2026-06-26',
    // upcoming: true, 
    coverArt: '/covers/on-island.jpg',
    ogImage: '/og/on-island.jpg',
    spotifyTrackUrl: 'https://open.spotify.com/track/3FsRqc79QSKeEgMqXfKnTD?si=5e64fd29028d4f55',
    badge: 'As heard on 97.7 ACK-FM Nantucket!',
    radioRequest: {
      station: '97.7 ACK-FM Nantucket',
      email: 'testkitchen@ackfm.com',
    },
    refrain: 'In full force gale, betta reef my sail...',
    linerNotes: [
      'The studio is closed for summer, as one island is abandoned for another. The Grey Lady beckons with her bountiful treasures.',
      'While lighting a tiki torch upon the sand, gaze beyond the treeline and catch sight of the wild nanny goats a-frolicking. But that\'s the only crowd you\'ll see out at Smith Point Beach.'
    ],
    credits: {
      producer: 'Sammy-on-Fire Sound Systems LLC',
      studio: 'Skyline Studios, Jane Street, New York City',
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

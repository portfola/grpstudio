/**
 * GRP albums — the back-catalogue of full-length records (distinct from the
 * Spotify singles in releases.js). Albums play via a SoundCloud playlist embed.
 * Adding a record = append an entry here + drop the sleeve/og assets in /public.
 * The /albums grid, each /albums/:slug page, prev/next, and prerendered routes
 * are all DERIVED from this array (sorted by year, newest first). Never hand-order.
 *
 * Schema (see .design/grp-release-redesign/INFORMATION_ARCHITECTURE.md):
 *   slug          string   permanent URL id, lowercase-hyphenated, unique, NEVER changed
 *   title         string   display title + <h1> + OG title
 *   year          string   release year — sole sort key + displayed
 *   coverArt      string   square sleeve (public path)
 *   ogImage       string   1200×630 social card (public path); optional → brand default
 *   soundcloudUrl string   canonical SoundCloud playlist URL (source for the embed)
 *   notes         string[] paragraphs of about/liner prose (optional)
 *   tracklist     string[] ordered track titles (optional)
 *   credits       object   { producer, musicians[], studio } (all optional)
 */
export const albums = [
  {
    slug: 'reggae-regatta',
    title: 'Reggae Regatta',
    year: '2024',
    coverArt: '/covers/reggae-regatta.jpg',
    ogImage: '/og/reggae-regatta.jpg',
    // This is the album that lived on the homepage SoundCloud embed.
    soundcloudUrl: 'https://soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta',
    notes: [
      'The record that started the fleet. Reggae Regatta is a full crossing — riddims cut deep, dub tails left long, the drum machines pushed until the room hums.',
      'Mixed for the night session: warm, weathered, and built to be played end to end. Always militant, never political.',
    ],
    tracklist: [
      'Regatta Overture',
      'Tide & Time',
      'Harbour Dub',
      'Sammy-on-Fire',
      'Long Crossing',
    ],
    credits: {
      producer: 'Sammy-on-Fire',
      musicians: ['Bass — I. Lion', 'Keys — D. Ranks', 'Percussion — The Georgetown Section'],
      studio: 'Georgetown Sound',
    },
  },
  {
    slug: 'tabula-rasta',
    title: 'Tabula Rasta',
    year: '2026',
    coverArt: '/covers/tabula-rasta.jpg',
    ogImage: '/og/tabula-rasta.jpg',
    // PLACEHOLDER — swap for the real Tabula Rasta playlist URL when it lands.
    soundcloudUrl: 'https://soundcloud.com/tabula-rasta/sets/tabula-rasta',
    notes: [
      'A clean slate. Tabula Rasta is the next record taking shape — sparser, stranger, the riddim wiped back to first principles.',
    ],
    credits: {
      producer: 'Sammy-on-Fire',
      studio: 'Georgetown Sound',
    },
  },
];

/** All albums, newest first (by year). */
export function getAllAlbums() {
  return [...albums].sort((a, b) => (a.year < b.year ? 1 : -1));
}

/** Look up one album by slug. Returns undefined if not found. */
export function getAlbumBySlug(slug) {
  return albums.find((a) => a.slug === slug);
}

/** Every slug — used by SSG getStaticPaths to enumerate prerendered routes. */
export function getAlbumSlugs() {
  return albums.map((a) => a.slug);
}

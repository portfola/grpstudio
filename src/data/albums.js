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
 *   archiveUrl    string   Internet Archive item URL (/details/…) — alternative
 *                          source to soundcloudUrl; the page embeds + links whichever
 *                          one is present (archive wins if both are set)
 *   notes         string[] paragraphs of about/liner prose (optional)
 *   tracklist     string[] ordered track titles (optional)
 *   credits       object   { producer, musicians[], studio } (all optional)
 */
export const albums = [
  {
    slug: 'reggae-regatta',
    title: 'Reggae Regatta',
    year: '2016',
    coverArt: '/covers/reggae-regatta.jpg',
    ogImage: '/og/reggae-regatta.jpg',
    // This is the album that lived on the homepage SoundCloud embed.
    soundcloudUrl: 'https://soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta',
    notes: [
      'The record that started the fleet. Reggae Regatta is a full crossing — riddims cut deep, dub tails left long, the drum machines pushed until the room hums.',
      'Mixed for the night session: warm, weathered, and built to be played end to end. Always militant, never political.',
    ],
    tracklist: [
      'GRP Funk',
      'On Island',
      'Make Reggae Great Again',
      'Snow Day',
      'Reggae Winter',
      'Evil Farmer',
      'Reggae House Party',
      'Kandinsky Does Not Tell Us',
      'Nosara Nights',
      'Riff Oceanus',
      'First Light',
      '90 Minutes North of Miami',
      'Furniture Sold',
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
    year: '2001',
    coverArt: '/covers/tabula-rasta.jpg',
    ogImage: '/og/tabula-rasta.jpg',
    // The debut lives on the Internet Archive, not SoundCloud.
    archiveUrl: 'https://archive.org/details/Georgetown_Reggae_Project_Tabula_Rasta',
    notes: [
      "The GRP's debut. Tabula Rasta dropped on February 17, 2001 — a clean slate, the riddim wiped back to first principles: seven cuts of studio-built reggae, sparse and strange, dub tails left long.",
      'Most music written by GRP. With respect to Peter, Bunny and Bob, Black Uhuru, Marcus Garvey, Big Youth — and Bret Easton Ellis. Always militant, never political.',
    ],
    tracklist: [
      'Used to Go to Church',
      'Stir It Up Dub',
      'Mellow Wine',
      'The Clique',
      'Freebass',
      'Ghebresus',
      'Freebass (Not Like, It Is)',
    ],
    credits: {
      musicians: ['Chinamon', 'Doc Brown', "Drumbo'x"],
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

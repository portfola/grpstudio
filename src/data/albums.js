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
 *   tracklist     string[] ordered track titles (optional) — for SoundCloud albums
 *   tracks        object[] ordered { title, file, length } for archive albums; drives
 *                          the Webamp player AND the displayed list (single source).
 *                          Use this OR tracklist, not both.
 *   credits       object   { producer, studio, engineer, musicians[] } (all optional).
 *                          `studio` shows as "Recorded at". `engineer` is a single
 *                          name OR an array (label auto-pluralises to Engineer/Engineers).
 */
export const albums = [
  {
    slug: 'reggae-regatta',
    title: 'Reggae Regatta',
    year: '2016',
    coverArt: '/covers/reggae-regatta.jpg',
    ogImage: '/og/reggae-regatta.jpg',
    soundcloudUrl: 'https://soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta',
    notes: [
      'It was the winter of our discontent. Evil forces gathered in the land. We set a course for Kandinsky\'s western gardens, and pushed on through the night.',
      'Luminescence!',
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
      producer: 'Ras Reality Records',
      musicians: ['Chinamon', 'Doc Brown', "Drumbo'x"],
      studio: 'The Farm',
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
      'From the depths of the Tombs to the rooftops of LXR, Tabula Rasta dropped on February 17, 2001.',
      '"The sweet nanny goat a-go run him belly."',
      'Most music written by GRP. With respect to Peter, Bunny and Bob, Black Uhuru, Marcus Garvey, Big Youth — and Bret Easton Ellis.',
    ],
    // Streamed straight from the Internet Archive item via the Webamp (Winamp)
    // player. `file` is the original upload under …/download/<id>/; `length` is
    // seconds (lets the player show durations before audio metadata loads).
    tracks: [
      { title: 'Used to Go to Church', file: '01-Used-to-Go-to-Church.mp3', length: 61.71 },
      { title: 'Stir It Up Dub', file: '02-Stir-It-Up-Dub.mp3', length: 80.86 },
      { title: 'Mellow Wine', file: '03-Mellow-Wine.mp3', length: 281.03 },
      { title: 'The Clique', file: '04-The-Clique.mp3', length: 299.29 },
      { title: 'Freebass', file: '05-Freebass.mp3', length: 206.14 },
      { title: 'Ghebresus', file: '06-Ghebresus.mp3', length: 231.32 },
      { title: 'Freebass (Not Like, It Is)', file: '07-Freebass-Not-Like-It-Is.mp3', length: 179.81 },
    ],
    credits: {
      producer: 'Sammy-on-Fire Sound Systems LLC',
      musicians: ['Chinamon', 'Doc Brown', "Drumbo'x"],
      studio: 'Prospect Street Studios',
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

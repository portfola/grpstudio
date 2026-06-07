import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ReleasePage from './pages/ReleasePage';
import AlbumsIndex from './pages/AlbumsIndex';
import AlbumPage from './pages/AlbumPage';
import NotFound from './pages/NotFound';
import { getReleaseSlugs } from './data/releases';
import { getAlbumSlugs } from './data/albums';

/**
 * Route table for vite-react-ssg. Each release/album slug is enumerated via
 * getStaticPaths so the build prerenders one static HTML file per item
 * (with its own OG tags from the page's <Head>).
 */
export const routes = [
  {
    path: '/',
    Component: RootLayout,
    entry: 'src/layouts/RootLayout.jsx',
    children: [
      { index: true, Component: Home, entry: 'src/pages/Home.jsx' },
      {
        path: 'releases/:slug',
        Component: ReleasePage,
        entry: 'src/pages/ReleasePage.jsx',
        getStaticPaths: () => getReleaseSlugs().map((slug) => `releases/${slug}`),
      },
      { path: 'albums', Component: AlbumsIndex, entry: 'src/pages/AlbumsIndex.jsx' },
      {
        path: 'albums/:slug',
        Component: AlbumPage,
        entry: 'src/pages/AlbumPage.jsx',
        getStaticPaths: () => getAlbumSlugs().map((slug) => `albums/${slug}`),
      },
      { path: '*', Component: NotFound, entry: 'src/pages/NotFound.jsx' },
    ],
  },
];

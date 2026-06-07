import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ReleasePage from './pages/ReleasePage';
import AlbumPage from './pages/AlbumPage';
import NotFound from './pages/NotFound';
import { getReleaseSlugs } from './data/releases';

/**
 * Route table for vite-react-ssg. Each release slug is enumerated via
 * getStaticPaths so the build prerenders one static HTML file per song
 * (with its own OG tags from ReleasePage's <Head>).
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
      { path: 'album', Component: AlbumPage, entry: 'src/pages/AlbumPage.jsx' },
      { path: '*', Component: NotFound, entry: 'src/pages/NotFound.jsx' },
    ],
  },
];

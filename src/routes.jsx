import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ReleasePage from './pages/ReleasePage';
import NotFound from './pages/NotFound';
import { getReleaseSlugs } from './data/releases';

/**
 * Route table for vite-react-ssg. Each release slug is enumerated via
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
      { path: '*', Component: NotFound, entry: 'src/pages/NotFound.jsx' },
    ],
  },
];

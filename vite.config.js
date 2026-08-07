import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { getAllReleases } from './src/data/releases.js';
import { SITE } from './src/data/site.js';

/**
 * Emits dist/sitemap.xml from the same releases.js array that drives
 * getStaticPaths, so a new drop is discoverable by crawlers with zero
 * manual sitemap upkeep. Runs on every build pass (client + server); each
 * pass writes identical content, so this is safely idempotent.
 */
function sitemapPlugin() {
  return {
    name: 'grp-sitemap',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(outDir)) return;
      const urls = [
        { loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0' },
        ...getAllReleases().map((r) => ({
          loc: `${SITE}/releases/${r.slug}`,
          lastmod: r.releaseDate,
          changefreq: 'monthly',
          priority: '0.8',
        })),
      ];
      const body = urls
        .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
        .join('\n');
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      // Add any path aliases your project might be using
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // vite-react-ssg: emit each route as <route>/index.html (not <route>.html).
  // Static hosts (incl. AWS Amplify) serve the directory index for clean URLs,
  // so a hard refresh / crawler hit on /releases/:slug or /albums/:slug gets the
  // prerendered file WITH its per-route OG — no homepage-clobbering SPA rewrite.
  ssgOptions: {
    dirStyle: 'nested',
  },
  // If your app is not hosted at the root level, specify the base path
  // base: '/your-base-path/',
});
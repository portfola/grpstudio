/**
 * Site-level constants — the single source of truth for the canonical origin.
 * Imported by both app code (RootLayout, ReleasePage) and the build
 * (vite.config.js sitemap plugin), so a domain move is a one-line change here.
 *
 *   SITE      string  canonical origin, no trailing slash. Feeds every absolute
 *                     URL we emit: <link rel="canonical">, og:image, JSON-LD
 *                     url, the per-release share/copy link, and sitemap.xml.
 *   SHOP_URL  string  the Shopify storefront. A separate origin on a subdomain,
 *                     NOT a route in this app — always link it with a plain
 *                     <a href>, never react-router's <Link>.
 *
 * NOTE: public/robots.txt is a static file and can't import this — its
 * `Sitemap:` line must be edited by hand to match.
 *
 * These URLs are baked in at BUILD time (prerender), so changing SITE requires
 * a rebuild + redeploy, not just a DNS change.
 */
export const SITE = 'https://georgetownreggaeproject.com';

export const SHOP_URL = 'https://shop.georgetownreggaeproject.com';

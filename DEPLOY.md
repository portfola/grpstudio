# Deploying GRP (AWS Amplify)

GRP is a **prerendered static site** (`vite-react-ssg`). `npm run build` emits one
HTML file per route into `dist/`, each with its own baked-in `<title>` + Open
Graph tags. Hosting is **AWS Amplify** (static).

## Build

```bash
npm run build      # vite-react-ssg → dist/
```

Output is **nested** (`ssgOptions.dirStyle: 'nested'` in `vite.config.js`), so every
route is its own `index.html`:

```
dist/index.html                          →  /
dist/releases/morning-ritual/index.html     →  /releases/morning-ritual
dist/releases/on-island/index.html
dist/albums/index.html                   →  /albums
dist/albums/reggae-regatta/index.html    →  /albums/reggae-regatta
dist/albums/tabula-rasta/index.html      →  /albums/tabula-rasta
```

Nested layout is deliberate: static hosts serve a directory's `index.html` for the
clean URL, so a **hard refresh or a social-crawler hit on a deep link gets the
prerendered file with its correct per-route OG card** — no rewrite required for
known routes.

> ⚠️ Do **not** add a blanket "rewrite everything → `/index.html`" rule. That would
> serve the *homepage* HTML (generic OG) for every deep link and silently destroy
> the per-release/per-album social cards that are the whole point of the SSG build.

## Amplify rewrites & redirects

The only rule needed is an SPA **fallback for unknown paths** (so a bad slug renders
the in-app "Lost the riddim" page instead of a raw Amplify 404). Amplify serves
existing files — including the nested `index.html` files above — *before* this
catch-all, so real release/album pages keep their own OG.

**Amplify Console → App settings → Rewrites and redirects → Open text editor**, paste:

```json
[
  {
    "source": "/<*>",
    "target": "/index.html",
    "status": "404-200"
  }
]
```

- `/<*>` matches everything, but Amplify only actually applies this rule as a
  **fallback when no real file matches first** — every real route (home, every
  release slug) is already prerendered as its own static file, so this rule
  only ever fires for genuinely bad URLs.
- **Status must be `404-200`, not plain `404` or `200`.** Only `200` and
  `404-200` are true Amplify *rewrites* — they serve the target's content
  while keeping the original URL in the address bar. Plain `404` is **not**
  a rewrite despite the name: empirically (and per a
  [known Amplify Hosting issue](https://github.com/aws-amplify/amplify-hosting/issues/925))
  it comes back as a real `302` redirect to `/index.html`, which changes the
  browser's URL — meaning React Router sees path `/` instead of the original
  bad slug and renders the **homepage**, not the "Lost the riddim" page. Plain
  `200` would work as a rewrite too, but without the `404`-family fallback
  condition it risks preempting real per-slug files (see the warning above).
  `404-200` is the only option that is both a true rewrite *and* limited to
  genuine misses — it's Amplify's own auto-generated default for SPAs.
- This means Amplify has no way to report a real `404` status for a bad slug
  without breaking client-side routing. The pragmatic mitigation: the
  in-app NotFound page (`src/pages/NotFound.jsx`) sets
  `<meta name="robots" content="noindex">`, which Google's crawler picks up
  during its JS-rendering pass even though the HTTP status is a soft `200`
  — the standard fix Google itself documents for JS-rendered SPA fallbacks.

## Post-deploy verification (do this on Amplify — can't be checked locally)

1. **Deep-link OG survives hard refresh.** In a fresh tab, open
   `https://georgetownreggaeproject.com/releases/morning-ritual` and **View Source**. Confirm:
   - `<title>Morning Ritual — Georgetown Reggae Project</title>`
   - `og:image` = `https://georgetownreggaeproject.com/og/morning-ritual.jpg` (the song's own card, **not** the `tabula-rasta.jpg` brand fallback)
   Repeat for an album: `/albums/reggae-regatta` → `og:type=music.album`, Reggae Regatta card.
   - 🚩 If you instead see the **homepage** title/OG, the catch-all is preempting file
     resolution — remove any extra blanket rewrite and confirm the nested files
     deployed under `dist/`.
2. **Social preview.** Paste a release URL into the Facebook Sharing Debugger and
   X/Twitter Card Validator; confirm the right cover + title render.
3. **Unknown path stays put and renders NotFound.** Visit
   `/releases/does-not-exist` — the address bar should still show that URL (not
   redirect to `/index.html` or the homepage) and the in-app "Lost the riddim"
   page should render. `curl -sIL` against the URL should end in `200` (soft
   404 — expected, see the rewrites section above) with the *NotFound* page's
   `<meta name="robots" content="noindex">` present in the body, not a `302`
   to `/index.html`.
4. **Assets load** (no 404s in the Network tab for `/assets/*`, `/covers/*`, `/og/*`).
5. **No-FOUC.** Hard refresh in both an OS light and OS dark setting — no flash of
   the wrong theme (the pre-paint script in `index.html` handles this).
6. **robots.txt + sitemap.xml are live.** `https://georgetownreggaeproject.com/robots.txt` should
   list the sitemap; `https://georgetownreggaeproject.com/sitemap.xml` should list the homepage
   plus every release slug currently in `releases.js` (auto-generated at build
   time — see `vite.config.js`'s `grp-sitemap` plugin).
```

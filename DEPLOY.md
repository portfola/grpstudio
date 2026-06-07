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
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|json|map|png|svg|txt|webp|avif|woff|woff2|ttf|eot|xml)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200"
  }
]
```

- The regex matches extensionless paths (client routes) and rewrites them to
  `/index.html` **only when no real file matches first**.
- The negative-lookahead excludes static assets by extension (`/assets/*.js|css`,
  `/covers/*.jpg`, `/og/*.jpg`, `/favicon.ico`, the `static-loader-data-*.json`,
  source maps, fonts) so they serve directly.

## Post-deploy verification (do this on Amplify — can't be checked locally)

1. **Deep-link OG survives hard refresh.** In a fresh tab, open
   `https://grpstudio.com/releases/morning-ritual` and **View Source**. Confirm:
   - `<title>Morning Ritual — Georgetown Reggae Project</title>`
   - `og:image` = `https://grpstudio.com/og/morning-ritual.jpg` (the song's card, **not** `default.jpg`)
   Repeat for an album: `/albums/reggae-regatta` → `og:type=music.album`, Reggae Regatta card.
   - 🚩 If you instead see the **homepage** title/OG, the catch-all is preempting file
     resolution — remove any extra blanket rewrite and confirm the nested files
     deployed under `dist/`.
2. **Social preview.** Paste a release URL into the Facebook Sharing Debugger and
   X/Twitter Card Validator; confirm the right cover + title render.
3. **Unknown path is a soft 404.** Visit `/releases/does-not-exist` — should render
   the in-app NotFound ("Lost the riddim"), not a raw Amplify error.
4. **Assets load** (no 404s in the Network tab for `/assets/*`, `/covers/*`, `/og/*`).
5. **No-FOUC.** Hard refresh in both an OS light and OS dark setting — no flash of
   the wrong theme (the pre-paint script in `index.html` handles this).
```

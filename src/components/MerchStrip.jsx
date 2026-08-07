import { SHOP_URL } from '../data/site';

/**
 * The merch table at the back of the room — a low horizontal band that sits at
 * the end of a release page, after the credits and before prev/next. Kept
 * deliberately flatter than the dashed RadioRequestCard postcard so a release
 * carrying both CTAs doesn't read as two competing boxes stacked up.
 *
 * The shop is a Shopify storefront on its own subdomain, so this is a plain
 * <a> (a hard navigation off the SPA), never a router <Link>.
 */
export default function MerchStrip({ slug }) {
  function trackShopClick() {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.capture('shop_link_clicked', { location: 'release', release_slug: slug });
    });
  }

  return (
    <aside className="merch-strip" aria-label="Merch">
      <div className="merch-strip__text">
        <p className="merch-strip__eyebrow">Merch Table</p>
        <p className="merch-strip__copy">Wear the riddim &mdash; official GRP gear, straight from the shop.</p>
      </div>
      <a className="release__btn release__btn--primary" href={SHOP_URL} onClick={trackShopClick}>
        Visit the shop <span aria-hidden="true">&#8599;</span>
      </a>
    </aside>
  );
}

import { useEffect } from 'react';

/**
 * Reveal-on-scroll: every `.anim-scroll` element fades/rises in as it enters the
 * viewport, then is unobserved (one-shot). Reduced-motion is honored in CSS — the
 * `.anim-scroll` transition collapses to 0ms there, so elements still resolve to
 * visible. Pass route-varying `deps` (e.g. a slug) to re-scan after navigation.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.anim-scroll:not(.is-visible)');
    if (!els.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

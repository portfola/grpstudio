import { useEffect, useState } from 'react';

const STORAGE_KEY = 'grp-theme';

/** Effective theme right now: explicit data-theme wins, else system pref. */
function getCurrentTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode */ }
}

/**
 * Night (dark) ⇄ Daytime (light) toggle. Persists an explicit choice to
 * localStorage (which then overrides the device's prefers-color-scheme).
 * The pre-paint script in index.html applies the stored choice before first
 * paint, so this component only needs to read/flip it.
 *
 * theme is null until mounted so server and first client render agree (dark
 * default → sun icon), avoiding a hydration mismatch; useEffect resolves the
 * real theme right after.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => { setTheme(getCurrentTheme()); }, []);

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    setTheme(next);
  }

  const isLight = theme === 'light';
  const label = isLight ? 'Switch to night theme' : 'Switch to daytime theme';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle__icon" aria-hidden="true">{isLight ? '☾' : '☀'}</span>
    </button>
  );
}

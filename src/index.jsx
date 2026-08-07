import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/tokens.css';
import './index.css';
import './App.css';

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // Browser-only side effects. Guarded so they never run during the
    // Node prerender pass.
    if (typeof window !== 'undefined') {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init('phc_Wtz8PjadLIzZqkkubhKIqdUUTZVAZnStY3fcyFE5Jan', {
          // PostHog reverse proxy — a managed-proxy subdomain with its own
          // CNAME, separate from the canonical site origin (see data/site.js).
          // This host must exist as a *provisioned* PostHog managed proxy with
          // an issued cert before this line ships, or events fail silently.
          // See DEPLOY.md → "Analytics proxy" for the ordering.
          api_host: 'https://mystic.georgetownreggaeproject.com',
          ui_host: 'https://us.posthog.com',
          person_profiles: 'identified_only',
        });
      });
    }
  }
);

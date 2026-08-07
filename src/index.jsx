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
          // Deliberately still on the old domain: this is the PostHog reverse
          // proxy, a separate DNS record from the canonical site origin (see
          // data/site.js) and unaffected by the grpstudio.com apex redirect.
          // Only change this alongside a matching CNAME + proxy on the new host.
          api_host: 'https://mystic.grpstudio.com',
          ui_host: 'https://us.posthog.com',
          person_profiles: 'identified_only',
        });
      });
    }
  }
);

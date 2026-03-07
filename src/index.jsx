import React from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

posthog.init('phc_Wtz8PjadLIzZqkkubhKIqdUUTZVAZnStY3fcyFE5Jan', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
});

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

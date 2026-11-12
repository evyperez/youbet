// Carregado pelo consent.js somente depois que a pessoa aceita os cookies estatísticos.
import posthog from 'posthog-js';

const {posthogKey, posthogHost} = window.youbetConsent || {};

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
    disable_session_recording: true,
    disable_surveys: true,
  });
  window.posthog = posthog;
  document.dispatchEvent(new CustomEvent('youbet:posthog-ready'));
}

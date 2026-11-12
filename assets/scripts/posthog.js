// Carregado pelo consent.js somente depois que a pessoa aceita os cookies estatísticos.
import posthog from 'posthog-js';

const {posthogKey, posthogHost, posthogEnvironment} = window.youbetConsent || {};

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
    logs: {
      serviceName: 'youbet-web',
      environment: posthogEnvironment,
    },
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });
  window.posthog = posthog;
  const posthogLogger = posthog.logger;
  posthogLogger.info('analytics log capture initialized', {
    event: 'analytics_log_capture_initialized',
    consent_category: 'analytics',
  });
  document.dispatchEvent(new CustomEvent('youbet:posthog-ready'));
}

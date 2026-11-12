/* eslint-disable @stylistic/max-len -- textos longos do aviso de cookies */
// Aviso de cookies (CookieConsent, licença MIT) + Google Consent Mode v2 + PostHog.
// Nada de estatística ou marketing roda antes do consentimento.
import * as CookieConsent from 'vanilla-cookieconsent';

const configEl = document.getElementById('consent-config');
const config = configEl ? JSON.parse(configEl.textContent) : {};
window.youbetConsent = config;

const lang = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
const privacyUrl = config.privacyUrl || '/politica-de-privacidade/';

const translations = {
  pt: {
    consentModal: {
      title: 'Usamos cookies',
      description: `Usamos cookies necessários para o site funcionar e, com a sua permissão, cookies estatísticos e de marketing para entender como o site é usado e medir nossas campanhas. Saiba mais na nossa <a href="${privacyUrl}">Política de Privacidade</a>.`,
      acceptAllBtn: 'Aceitar todos',
      acceptNecessaryBtn: 'Recusar',
      showPreferencesBtn: 'Personalizar',
    },
    preferencesModal: {
      title: 'Preferências de cookies',
      acceptAllBtn: 'Aceitar todos',
      acceptNecessaryBtn: 'Recusar todos',
      savePreferencesBtn: 'Salvar escolhas',
      closeIconLabel: 'Fechar',
      sections: [
        {
          description: `Escolha quais cookies você permite. Você pode mudar de ideia a qualquer momento pelo link “Preferências de cookies” no rodapé. Detalhes na <a href="${privacyUrl}">Política de Privacidade</a>.`,
        },
        {
          title: 'Necessários',
          description: 'Essenciais para o site funcionar e para guardar as suas escolhas sobre cookies. Não podem ser desativados.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Estatísticos',
          description: 'Ajudam a entender como o site é usado, como páginas visitadas e cliques (Google Analytics e PostHog).',
          linkedCategory: 'analytics',
        },
        {
          title: 'Marketing',
          description: 'Medem os resultados dos nossos anúncios (por exemplo, Google Ads e Meta).',
          linkedCategory: 'marketing',
        },
      ],
    },
  },
  en: {
    consentModal: {
      title: 'We use cookies',
      description: `We use necessary cookies to make the site work and, with your permission, analytics and marketing cookies to understand how the site is used and measure our campaigns. Learn more in our <a href="${privacyUrl}">Privacy Policy</a>.`,
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject',
      showPreferencesBtn: 'Customize',
    },
    preferencesModal: {
      title: 'Cookie preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Reject all',
      savePreferencesBtn: 'Save choices',
      closeIconLabel: 'Close',
      sections: [
        {
          description: `Choose which cookies you allow. You can change your mind at any time using the “Cookie preferences” link in the footer. Details in our <a href="${privacyUrl}">Privacy Policy</a>.`,
        },
        {
          title: 'Necessary',
          description: 'Essential for the site to work and to remember your cookie choices. They cannot be turned off.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytics',
          description: 'Help us understand how the site is used, such as pages visited and clicks (Google Analytics and PostHog).',
          linkedCategory: 'analytics',
        },
        {
          title: 'Marketing',
          description: 'Measure the results of our ads (for example, Google Ads and Meta).',
          linkedCategory: 'marketing',
        },
      ],
    },
  },
  es: {
    consentModal: {
      title: 'Usamos cookies',
      description: `Usamos cookies necesarias para que el sitio funcione y, con su permiso, cookies analíticas y de marketing para entender cómo se usa el sitio y medir nuestras campañas. Más información en nuestra <a href="${privacyUrl}">Política de Privacidad</a>.`,
      acceptAllBtn: 'Aceptar todas',
      acceptNecessaryBtn: 'Rechazar',
      showPreferencesBtn: 'Personalizar',
    },
    preferencesModal: {
      title: 'Preferencias de cookies',
      acceptAllBtn: 'Aceptar todas',
      acceptNecessaryBtn: 'Rechazar todas',
      savePreferencesBtn: 'Guardar selección',
      closeIconLabel: 'Cerrar',
      sections: [
        {
          description: `Elija qué cookies permite. Puede cambiar de opinión en cualquier momento con el enlace “Preferencias de cookies” del pie de página. Detalles en nuestra <a href="${privacyUrl}">Política de Privacidad</a>.`,
        },
        {
          title: 'Necesarias',
          description: 'Esenciales para que el sitio funcione y para guardar sus preferencias de cookies. No se pueden desactivar.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analíticas',
          description: 'Nos ayudan a entender cómo se usa el sitio, como páginas visitadas y clics (Google Analytics y PostHog).',
          linkedCategory: 'analytics',
        },
        {
          title: 'Marketing',
          description: 'Miden los resultados de nuestros anuncios (por ejemplo, Google Ads y Meta).',
          linkedCategory: 'marketing',
        },
      ],
    },
  },
};

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function updateGoogleConsent() {
  const analytics = CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied';
  const marketing = CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });
  window.dataLayer.push({event: 'consent_update'});
}

function clearPostHogStorage() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('ph_') || key.startsWith('__ph_'))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage bloqueado
  }
}

function loadPostHog() {
  if (!config.posthogKey || !config.posthogSrc) {
    return;
  }
  if (window.posthog) {
    if (window.posthog.has_opted_out_capturing()) {
      window.posthog.opt_in_capturing();
    }
    return;
  }
  const script = document.createElement('script');
  script.src = config.posthogSrc;
  script.defer = true;
  if (config.posthogIntegrity) {
    script.integrity = config.posthogIntegrity;
    script.crossOrigin = 'anonymous';
  }
  document.head.appendChild(script);
}

function stopPostHog() {
  // Limpa os dados do PostHog primeiro e depois grava a recusa (que precisa ficar salva).
  clearPostHogStorage();
  if (window.posthog) {
    window.posthog.opt_out_capturing();
  }
}

function applyConsent() {
  updateGoogleConsent();
  if (CookieConsent.acceptedCategory('analytics')) {
    loadPostHog();
  } else {
    stopPostHog();
  }
}

// Acompanha o modo escuro do site.
function syncDarkMode() {
  const theme = document.documentElement.getAttribute('data-theme');
  const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('cc--darkmode', dark);
}
syncDarkMode();
new MutationObserver(syncDarkMode).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
});

CookieConsent.run({
  revision: 1,
  guiOptions: {
    consentModal: {layout: 'box', position: 'bottom left', equalWeightButtons: true},
    preferencesModal: {layout: 'box', equalWeightButtons: true},
  },
  categories: {
    necessary: {enabled: true, readOnly: true},
    analytics: {
      autoClear: {cookies: [{name: /^_ga/}, {name: '_gid'}, {name: /^ph_/}]},
    },
    marketing: {
      autoClear: {cookies: [{name: /^_gcl/}, {name: '_fbp'}, {name: '_fbc'}]},
    },
  },
  language: {
    default: translations[lang] ? lang : 'pt',
    translations: {[translations[lang] ? lang : 'pt']: translations[lang] || translations.pt},
  },
  onConsent: applyConsent,
  onChange: applyConsent,
});

// Eventos de conversão: vão para o GTM (que respeita o consentimento) e para o PostHog, se aceito.
function track(event, properties = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event, ...properties});
  if (window.posthog && CookieConsent.acceptedCategory('analytics')) {
    window.posthog.capture(event, properties);
  }
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="wa.me/"], a[href*="api.whatsapp.com/"]');
  if (link) {
    let location = 'page';
    if (link.classList.contains('whatsapp')) {
      location = 'floating_button';
    } else if (link.closest('footer')) {
      location = 'footer';
    }
    track('whatsapp_click', {link_location: location});
  }
});

document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[data-netlify]');
  if (form) {
    track('generate_lead', {form_name: form.getAttribute('name') || 'contato'});
  }
});

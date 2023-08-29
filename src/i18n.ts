import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    'en-US': { translation: require('./locales/embed/en-US.json') }
  },

  initImmediate: false, // set initImmediate false -> init method finished only when all resources/translation finish loading (async behaviour)
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false, // React already protects against this, so we don't need to do it here
    prefix: '{',
    suffix: '}'
  },
  debug: false // process.env.NODE_ENV === 'development'
});

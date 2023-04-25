import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

function loadLanguageFiles(languages: string[]) {
  const result: Record<string, any> = {};

  for (const language of languages) {
    try {
      const loaded = require(`./locales/embed/${language}.json`);

      result[language] = {
        translation: loaded
      };
    } catch (e) {
      console.warn(`Failed to load language ${language}: ${e}`);
    }
  }

  return result;
}

const resources = loadLanguageFiles([
  'en-GB',
  'en-US',
  'en-PT',
  'es-ES',
  'de-DE',
  'fr-FR',
  'pt-PT',
  'ru-RU',
  'vi-VN',
  'zh-CN'
]);

i18next.use(initReactI18next).init({
  resources,

  lng: 'en-GB',
  fallbackLng: 'en-GB',
  interpolation: {
    escapeValue: false, // React already protects against this, so we don't need to do it here
    prefix: '{',
    suffix: '}'
  },

  debug: false // process.env.NODE_ENV === 'development'
});

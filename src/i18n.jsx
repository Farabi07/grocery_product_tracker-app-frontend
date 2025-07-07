// // i18n.js (at root or src)
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import en from './locales/en/translation.json';
// import de from './locales/de/translation.json'

// const resources = {
//   en: { translation: en },
//   de: { translation: de },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: 'en', 
//   fallbackLng: 'en',
//   interpolation: { escapeValue: false },
// });

// export default i18n;




// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import de from './locales/de/translation.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'], // localStorage first, then browser default
      caches: ['localStorage'], // save in localStorage
    },
  });

export default i18n;


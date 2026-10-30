import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "./locales/es.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import pl from "./locales/pl.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LANGUAGES = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "pl", label: "Polski", short: "PL" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      ru: { translation: ru },
      pl: { translation: pl },
      de: { translation: de },
      fr: { translation: fr },
    },
    fallbackLng: "es",
    supportedLngs: ["es", "en", "ru", "pl", "de", "fr"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

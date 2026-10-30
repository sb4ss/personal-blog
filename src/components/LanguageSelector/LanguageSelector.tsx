import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuGlobe, LuChevronDown, LuCheck } from "react-icons/lu";
import { SUPPORTED_LANGUAGES, SupportedLanguageCode } from "../../i18n/i18n";
import { applyLanguageToDOM, initGoogleTranslateBridge } from "../../utils/translator";
import "./languageSelector.css";

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLangCode = (i18n.language?.slice(0, 2) || "es") as SupportedLanguageCode;
  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    initGoogleTranslateBridge();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    setIsOpen(false);
    if (code === currentLangCode) return;

    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    applyLanguageToDOM(code);
  };

  return (
    <div className={`lang-selector-wrapper notranslate ${className}`} ref={containerRef}>
      <button
        type="button"
        className="lang-selector-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Seleccionar idioma"
        aria-expanded={isOpen}
      >
        <LuGlobe className="lang-icon" />
        <span className="lang-code">{currentLang.short}</span>
        <LuChevronDown className={`lang-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu" role="menu">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = lang.code === currentLangCode;
            return (
              <button
                key={lang.code}
                type="button"
                className={`lang-option ${isActive ? "active" : ""}`}
                onClick={() => handleSelectLanguage(lang.code)}
                role="menuitem"
              >
                <span>{lang.label}</span>
                <span className="lang-option-code">
                  {isActive ? <LuCheck size={12} /> : lang.short}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import "./back.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector/LanguageSelector";

function Back() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <div className="back-wrapper notranslate">
        <Link to="/" className="back-btn" aria-label={t("article.back")}>
          <LuArrowLeft className="back-icon" />
          <span>{t("article.back")}</span>
        </Link>
        <LanguageSelector />
      </div>
    </>
  );
}

export default Back;

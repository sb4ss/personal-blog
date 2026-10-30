import React from "react";
import { useLocation, Link } from "react-router-dom";
import LikeButton from "./LikeButton/LikeButton";
import { LuArrowLeft, LuArrowUp } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import "./articleFooter.css";

interface ArticleFooterProps {
  articleId?: string;
}

const ArticleFooter: React.FC<ArticleFooterProps> = ({ articleId }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const resolvedId = articleId || location.pathname;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="article-footer-section">
      <LikeButton articleId={resolvedId} variant="cta" />

      <div className="article-footer-nav notranslate">
        <Link to="/" className="footer-back-link">
          <LuArrowLeft />
          <span>{t("article.backAll")}</span>
        </Link>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer-top-btn"
          aria-label={t("article.scrollTop")}
        >
          <LuArrowUp />
          <span>{t("article.scrollTop")}</span>
        </button>
      </div>
    </footer>
  );
};

export default ArticleFooter;

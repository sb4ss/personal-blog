import React, { useEffect } from "react";
import "./general.css";
import LikeButton from "./LikeButton/LikeButton";
import { useLocation } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { articles } from "../data/articles";
import { useTranslation } from "react-i18next";

interface ArticleMetaProps {
  date: string;
  tag?: string;
  readTime?: string;
  articleId?: string;
}

function updateMetaTag(selector: string, attrName: string, value: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    const [attr, attrVal] = selector
      .replace(/^meta\[/, "")
      .replace(/\]$/, "")
      .split("=");
    element.setAttribute(attr, attrVal.replace(/['"]/g, ""));
    document.head.appendChild(element);
  }
  element.setAttribute(attrName, value);
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({
  date,
  tag,
  readTime = "4 min de lectura",
  articleId,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const resolvedId = articleId || location.pathname;
  const cleanId = resolvedId.replace(/^\/|article-/, "");

  const article = articles.find(
    (a) =>
      a.id === cleanId ||
      a.url === cleanId ||
      a.url === `article-${cleanId}` ||
      a.id === `article-${cleanId}`
  );

  // Actualizar meta tags dinámicos de OpenGraph / Twitter para previews
  useEffect(() => {
    if (!article) return;

    const originalTitle = document.title;
    const currentLang = i18n.language?.slice(0, 2);
    const translation =
      currentLang && currentLang !== "es"
        ? article.translations?.[currentLang as keyof typeof article.translations]
        : null;

    const displayTitle = translation?.title || article.title;
    const displayDesc = translation?.content || article.content;
    const imageUrl = `https://sb4ss-blog.vercel.app/${article.img.replace(/^\//, "")}`;
    const pageUrl = window.location.href;

    document.title = `${displayTitle} - s_b4ss blog`;

    updateMetaTag('meta[property="og:title"]', "content", displayTitle);
    updateMetaTag('meta[property="og:description"]', "content", displayDesc);
    updateMetaTag('meta[property="og:image"]', "content", imageUrl);
    updateMetaTag('meta[property="og:url"]', "content", pageUrl);
    updateMetaTag('meta[property="og:type"]', "content", "article");

    updateMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
    updateMetaTag('meta[name="twitter:title"]', "content", displayTitle);
    updateMetaTag('meta[name="twitter:description"]', "content", displayDesc);
    updateMetaTag('meta[name="twitter:image"]', "content", imageUrl);

    return () => {
      document.title = originalTitle;
      updateMetaTag('meta[property="og:title"]', "content", "SB4SS Blog - Tecnología y Desarrollo");
      updateMetaTag(
        'meta[property="og:description"]',
        "content",
        "Explora artículos sobre tecnología, desarrollo web y más."
      );
      updateMetaTag(
        'meta[property="og:image"]',
        "content",
        "https://sb4ss-blog.vercel.app/preview.png"
      );
      updateMetaTag('meta[property="og:url"]', "content", "https://sb4ss-blog.vercel.app/");
      updateMetaTag('meta[property="og:type"]', "content", "website");

      updateMetaTag('meta[name="twitter:title"]', "content", "SB4SS Blog - Tecnología y Desarrollo");
      updateMetaTag(
        'meta[name="twitter:description"]',
        "content",
        "Explora artículos sobre tecnología, desarrollo web y más."
      );
      updateMetaTag(
        'meta[name="twitter:image"]',
        "content",
        "https://sb4ss-blog.vercel.app/preview.png"
      );
    };
  }, [article, i18n.language]);

  // Formato localizado del tiempo de lectura sin emojis
  const minutes = parseInt(readTime.match(/\d+/)?.[0] || "4", 10);
  const localizedReadTime = t("article.readTime", { count: minutes });

  return (
    <div className="article-meta-row">
      <span className="article-meta-date">{date}</span>
      {tag && <span className="article-meta-tag">{tag}</span>}
      <span className="article-meta-pill">
        <LuClock className="article-meta-icon" style={{ verticalAlign: "middle", marginRight: 4 }} />
        {localizedReadTime}
      </span>
      <LikeButton articleId={resolvedId} variant="meta" />
    </div>
  );
};

export default ArticleMeta;

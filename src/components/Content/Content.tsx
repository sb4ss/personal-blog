import { useState, useMemo } from "react";
import "./content.css";
import Card from "../Card/Card";
import { articles } from "../../data/articles";
import { LuSearch, LuX } from "react-icons/lu";
import { useTranslation } from "react-i18next";

type FilterTab = "all" | "published" | "upcoming";

function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.slice(0, 2);

  const filteredArticles = useMemo(() => {
    // Priorizar publicados (más recientes primero) y luego los de próximamente
    const sorted = [...articles].sort((a, b) => {
      if (a.published !== b.published) {
        return a.published ? -1 : 1;
      }
      if (a.published) {
        return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
      }
      return new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime();
    });

    // Filtrar por pestaña
    const tabFiltered = sorted.filter((article) => {
      if (activeTab === "published") return article.published;
      if (activeTab === "upcoming") return !article.published;
      return true;
    });

    // Filtrar por texto de búsqueda (título, descripción o tags en idioma original o traducido)
    if (!searchQuery.trim()) return tabFiltered;

    const query = searchQuery.toLowerCase().trim();
    return tabFiltered.filter((article) => {
      const tr =
        currentLang && currentLang !== "es"
          ? article.translations?.[currentLang as keyof typeof article.translations]
          : null;

      const titleMatches =
        article.title.toLowerCase().includes(query) ||
        (tr?.title && tr.title.toLowerCase().includes(query));

      const contentMatches =
        article.content.toLowerCase().includes(query) ||
        (tr?.content && tr.content.toLowerCase().includes(query));

      const tagsMatches =
        article.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        tr?.tags?.some((tag) => tag.toLowerCase().includes(query));

      return titleMatches || contentMatches || tagsMatches;
    });
  }, [searchQuery, activeTab, currentLang]);

  return (
    <div className="content">
      <div className="content-controls">
        <div className="search-bar">
          <LuSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label={t("search.clear")}
            >
              <LuX />
            </button>
          )}
        </div>

        <div className="filter-tabs notranslate">
          <button
            className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            {t("filter.all")} ({articles.length})
          </button>
          <button
            className={`filter-tab ${activeTab === "published" ? "active" : ""}`}
            onClick={() => setActiveTab("published")}
          >
            {t("filter.published")} ({articles.filter((a) => a.published).length})
          </button>
          <button
            className={`filter-tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            {t("filter.upcoming")} ({articles.filter((a) => !a.published).length})
          </button>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            content={article.content}
            img={article.img}
            date={article.date}
            url={article.url}
            published={article.published}
            tag={article.tags?.[0]}
            translations={article.translations}
          />
        ))
      ) : (
        <div className="no-results-message">
          <p>{t("filter.noResults")}</p>
        </div>
      )}
    </div>
  );
}

export default Content;

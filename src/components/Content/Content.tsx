import { useState, useMemo } from "react";
import "./content.css";
import Card from "../Card/Card";
import { articles } from "../../data/articles";
import { LuSearch, LuX } from "react-icons/lu";

type FilterTab = "all" | "published" | "upcoming";

function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

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

    // Filtrar por texto de búsqueda (título, descripción o tags)
    if (!searchQuery.trim()) return tabFiltered;

    const query = searchQuery.toLowerCase().trim();
    return tabFiltered.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, activeTab]);

  return (
    <div className="content">
      <div className="content-controls">
        <div className="search-bar">
          <LuSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por título, tecnología o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Limpiar búsqueda"
            >
              <LuX />
            </button>
          )}
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Todos ({articles.length})
          </button>
          <button
            className={`filter-tab ${activeTab === "published" ? "active" : ""}`}
            onClick={() => setActiveTab("published")}
          >
            Publicados ({articles.filter((a) => a.published).length})
          </button>
          <button
            className={`filter-tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Próximamente ({articles.filter((a) => !a.published).length})
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
          />
        ))
      ) : (
        <div className="no-results">
          <p>No se encontraron artículos para "{searchQuery}".</p>
          <button
            className="reset-search-btn"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
          >
            Ver todos los artículos
          </button>
        </div>
      )}
    </div>
  );
}

export default Content;

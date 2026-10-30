import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { useTranslation } from "react-i18next";
import { Article } from "../../data/articles";

interface CardProps {
  title: string;
  content: string;
  date: string;
  img: string;
  url: string;
  published?: boolean;
  tag?: string;
  translations?: Article["translations"];
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  date,
  img,
  url,
  published = true,
  tag,
  translations,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2);
  const tr =
    lang && lang !== "es"
      ? translations?.[lang as keyof typeof translations]
      : null;

  const displayTitle = tr?.title || title;
  const displayContent = tr?.content || content;
  const displayTag = tr?.tags?.[0] || tag;

  return (
    <Link
      className={`card ${!published ? "card-upcoming" : ""}`}
      to={published ? `/${url}` : "#"}
      onClick={(e) => {
        if (!published) {
          e.preventDefault();
        }
      }}
    >
      <div className="row">
        <img src={img} alt={displayTitle} />
      </div>
      <div className="row2">
        <div className="card-top-bar">
          <div className="card-meta">
            <span className="card-date">{date}</span>
            {displayTag && <span className="card-tag">{displayTag}</span>}
            {!published && <span className="card-badge notranslate">{t("card.upcoming")}</span>}
          </div>
          {published && (
            <div className="card-like-slot" onClick={(e) => e.stopPropagation()}>
              <LikeButton articleId={url} variant="card" />
            </div>
          )}
        </div>
        <h2>{displayTitle}</h2>
        <p>{displayContent}</p>
      </div>
    </Link>
  );
};

export default Card;

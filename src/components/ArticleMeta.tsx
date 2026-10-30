import "./general.css";
import LikeButton from "./LikeButton/LikeButton";
import { useLocation } from "react-router-dom";

interface ArticleMetaProps {
  date: string;
  tag?: string;
  readTime?: string;
  articleId?: string;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({
  date,
  tag,
  readTime = "4 min de lectura",
  articleId,
}) => {
  const location = useLocation();
  const resolvedId = articleId || location.pathname;

  return (
    <div className="article-meta-row">
      <span className="article-meta-date">{date}</span>
      {tag && <span className="article-meta-tag">{tag}</span>}
      <span className="article-meta-pill">⏱️ {readTime}</span>
      <LikeButton articleId={resolvedId} variant="meta" />
    </div>
  );
};

export default ArticleMeta;


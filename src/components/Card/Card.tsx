import "./card.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";

interface CardProps {
  title: string;
  content: string;
  date: string;
  img: string;
  url: string;
  published?: boolean;
  tag?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  date,
  img,
  url,
  published = true,
  tag,
}) => {
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
        <img src={img} alt={title} />
      </div>
      <div className="row2">
        <div className="card-top-bar">
          <div className="card-meta">
            <span className="card-date">{date}</span>
            {tag && <span className="card-tag">{tag}</span>}
            {!published && <span className="card-badge">Próximamente</span>}
          </div>
          {published && (
            <div className="card-like-slot" onClick={(e) => e.stopPropagation()}>
              <LikeButton articleId={url} variant="card" />
            </div>
          )}
        </div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </Link>
  );
};

export default Card;


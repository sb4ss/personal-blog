import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useArticleLikes } from "../../hooks/useArticleLikes";
import "./likeButton.css";

export interface LikeButtonProps {
  articleId: string;
  variant?: "card" | "meta" | "cta";
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  variant = "card",
}) => {
  const { likes, isLiked, toggleLike } = useArticleLikes(articleId);
  const [popping, setPopping] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLiked) {
      setPopping(true);
      setTimeout(() => setPopping(false), 900);
    }

    toggleLike(e);
  };

  if (variant === "cta") {
    return (
      <div className="article-like-cta">
        <div className="like-cta-content">
          <div className="like-cta-icon-wrapper" aria-hidden="true">
            {isLiked ? (
              <IoHeart className="like-cta-heart filled" />
            ) : (
              <IoHeartOutline className="like-cta-heart outline" />
            )}
          </div>
          <div className="like-cta-texts">
            <h4>{isLiked ? "¡Gracias por tu apoyo! ❤️" : "¿Te gustó este artículo?"}</h4>
            <p>
              {isLiked
                ? "Tu like se ha sincronizado en vivo. ¡Cualquiera que visite el blog verá tu apoyo!"
                : "Si este post te aportó valor o aprendiste algo nuevo, déjale un like público."}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`like-cta-btn ${isLiked ? "liked" : ""} ${popping ? "pop-anim" : ""}`}
          onClick={handleClick}
          aria-label="Dar me gusta a este artículo"
        >
          {popping && (
            <div className="particles-burst" aria-hidden="true">
              <span className="particle p1">❤️</span>
              <span className="particle p2">✨</span>
              <span className="particle p3">💖</span>
            </div>
          )}

          {isLiked ? (
            <IoHeart className="like-btn-icon filled" />
          ) : (
            <IoHeartOutline className="like-btn-icon" />
          )}
          <span>{isLiked ? "Te gusta" : "Dar Like"}</span>
          <span className="like-cta-pill">{likes}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`like-badge-btn like-variant-${variant} ${isLiked ? "liked" : ""} ${popping ? "pop-anim" : ""}`}
      onClick={handleClick}
      title={isLiked ? "Ya te gusta (Clic para quitar)" : "Dar me gusta (Visible para todos)"}
      aria-label={`${likes} me gusta`}
    >
      {popping && (
        <div className="particles-burst" aria-hidden="true">
          <span className="particle p1">❤️</span>
          <span className="particle p2">✨</span>
          <span className="particle p3">💖</span>
        </div>
      )}

      {isLiked ? (
        <IoHeart className="like-icon filled" />
      ) : (
        <IoHeartOutline className="like-icon outline" />
      )}
      <span className="like-count">{likes}</span>
    </button>
  );
};

export default LikeButton;

import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setPopping(true);
    setTimeout(() => setPopping(false), 300);

    toggleLike(e);
  };

  if (variant === "cta") {
    return (
      <div className="article-like-cta notranslate">
        <div className="like-cta-texts">
          <h4>{isLiked ? t("like.ctaTitleLiked") : t("like.ctaTitle")}</h4>
          <p>{isLiked ? t("like.ctaTextLiked") : t("like.ctaText")}</p>
        </div>

        <button
          type="button"
          className={`like-cta-btn ${isLiked ? "liked" : ""} ${popping ? "pop-anim" : ""}`}
          onClick={handleClick}
          aria-label={isLiked ? t("like.tooltipLiked") : t("like.tooltip")}
        >
          {isLiked ? (
            <IoHeart className="like-btn-icon filled" />
          ) : (
            <IoHeartOutline className="like-btn-icon" />
          )}
          <span>{isLiked ? t("like.buttonLiked") : t("like.button")}</span>
          <span className="like-cta-pill">{likes}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`like-badge-btn like-variant-${variant} ${isLiked ? "liked" : ""} ${popping ? "pop-anim" : ""} notranslate`}
      onClick={handleClick}
      title={isLiked ? t("like.tooltipLiked") : t("like.tooltip")}
      aria-label={`${likes} ${t("card.likes")}`}
    >
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

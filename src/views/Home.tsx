import { motion } from "framer-motion";
import "../App.css";
import Content from "../components/Content/Content";
import { FaDiscord } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import DiscordProfile from "../components/discord/DiscordProfile";
import { createPortal } from "react-dom";
import "../components/general.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

function Home() {
  const [profile, setProfile] = useState(false);
  const [statusClass, setStatusClass] = useState("Online");
  const profileRef = useRef<HTMLDivElement>(null);
  const [statusKey, setStatusKey] = useState("header.statusOnline");
  const { t } = useTranslation();

  useEffect(() => {
    fetch("https://api.lanyard.rest/v1/users/741020084113244180")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.discord_status === "online") {
          setStatusClass("Online");
          setStatusKey("header.statusOnline");
        }
        if (data?.data?.discord_status === "idle") {
          setStatusClass("Idle");
          setStatusKey("header.statusIdle");
        }
        if (data?.data?.discord_status === "dnd") {
          setStatusClass("Dnd");
          setStatusKey("header.statusDnd");
        }
        if (data?.data?.discord_status === "offline") {
          setStatusClass("Offline");
          setStatusKey("header.statusOffline");
        }
      })
      .catch(() => {
        // Fallback default
      });
  }, []);

  const handleUserDiscord = () => {
    setProfile(true);
  };

  useEffect(() => {
    if (profile) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setProfile(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [profile]);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="home-header-row notranslate">
        <div className="title-bg">
          <h2 className="title">{t("header.articlesBy")}</h2>
          <button
            className="profile"
            onClick={handleUserDiscord}
            aria-label={t("modal.discordStatus")}
          >
            <div className="user">
              <img src="tux.gif" alt="s_b4ss" className="img" />
              <h3>s_b4ss</h3>
            </div>

            <div className="status">
              <span className="status-label">{t(statusKey)}</span>
              <div className={`status-dot ${statusClass}`}></div>
              <FaDiscord className="discord" />
            </div>
          </button>
        </div>

        <div className="home-lang-container">
          <LanguageSelector />
        </div>
      </div>

      {profile &&
        createPortal(
          <div className="discord-modal-container notranslate">
            <div
              className="overlay"
              onClick={() => setProfile(false)}
              aria-label={t("modal.close")}
            />
            <div
              ref={profileRef}
              className="profile-section"
              onClick={(e) => e.stopPropagation()}
            >
              <DiscordProfile />
            </div>
          </div>,
          document.body
        )}

      <p className="link notranslate">
        {t("header.portfolioLinked")}{" "}
        <a
          href="https://porfoliosb4ss.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("header.checkItOut")}
        </a>
      </p>

      <Content />
    </motion.div>
  );
}

export default Home;

import { motion } from "framer-motion";
import "../App.css";
import Content from "../components/Content/Content";
import { FaDiscord } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import DiscordProfile from "../components/discord/DiscordProfile";
import { createPortal } from "react-dom";
import "../components/general.css";

function Home() {
  const [profile, setProfile] = useState(false);
  const [statusClass, setStatusClass] = useState("Online");
  const profileRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("https://api.lanyard.rest/v1/users/741020084113244180")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.discord_status == "online") {
          setStatusClass("Online");
          setStatus("Online");
        }
        if (data?.data?.discord_status == "idle") {
          setStatusClass("Idle");
          setStatus("Idle");
        }
        if (data?.data?.discord_status == "dnd") {
          setStatusClass("Dnd");
          setStatus("Do Not Disturb");
        }
        if (data?.data?.discord_status == "offline") {
          setStatusClass("Offline");
          setStatus("Offline");
        }
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
      <div className="title-bg">
        <h2 className="title">Articles by</h2>
        <button
          className="profile"
          onClick={handleUserDiscord}
          aria-label="Ver estado de Discord"
        >
          <div className="user">
            <img src="tux.gif" alt="s_b4ss" className="img" />
            <h3>s_b4ss</h3>
          </div>

          <div className="status">
            {status && <span className="status-label">{status}</span>}
            <div className={`status-dot ${statusClass}`}></div>
            <FaDiscord className="discord" />
          </div>
        </button>
      </div>

      {profile &&
        createPortal(
          <div className="discord-modal-container">
            <div
              className="overlay"
              onClick={() => setProfile(false)}
              aria-label="Cerrar modal"
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

      <p className="link">
        This blog is linked to my portfolio
        <a
          href="https://porfoliosb4ss.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}go check it out :)
        </a>
      </p>
      <Content />
    </motion.div>
  );
}

export default Home;

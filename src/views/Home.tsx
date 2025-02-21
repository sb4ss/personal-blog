import { motion } from "framer-motion";
import "../App.css";
import Content from "../components/Content/Content";
import { FaDiscord } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import DiscordProfile from "../components/discord/DiscordProfile";

function Home() {
  const [profile, setProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleUserDiscord = () => {
    setProfile(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      profileRef.current instanceof HTMLElement &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfile(false);
    }
  };

  useEffect(() => {
    if (profile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <button className="profile" onClick={handleUserDiscord}>
          <div className="user">
            <img src="tux.gif" alt="" className="img" />
            <h3>s_b4ss</h3>
          </div>

          <div className="status">
            <p>Online</p>
            <div className="online"></div>
            <FaDiscord className="discord" />
          </div>
        </button>
      </div>

      {profile && (
        <>
          <div className="overlay" onClick={() => setProfile(false)}></div>
          <div ref={profileRef} className="profile-section">
            <DiscordProfile />
          </div>
        </>
      )}

      <p>
        This project is linked to my portfolio
        <a href="https://sb4ss.vercel.app"> go check it out.</a>
      </p>
      <Content />
    </motion.div>
  );
}

export default Home;

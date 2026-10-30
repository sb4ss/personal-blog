import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import "./back.css";
import { Link } from "react-router-dom";

function Back() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <div className="back-wrapper">
        <Link to="/" className="back-btn" aria-label="Volver a los artículos">
          <LuArrowLeft className="back-icon" />
          <span>Volver a entradas</span>
        </Link>
      </div>
    </>
  );
}

export default Back;


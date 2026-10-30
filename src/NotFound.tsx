import { motion } from "motion/react";
import "./notfound.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="notfound notranslate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2>{t("notFound.title")}</h2>
      <p>
        {t("notFound.text")} <Link to="/">{t("notFound.goBack")}</Link>
      </p>
    </motion.div>
  );
};

export default NotFound;

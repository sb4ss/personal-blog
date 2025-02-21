import { motion } from "motion/react";
import Back from "../components/Back";
import CodeBlock from "../components/code/CodeBlock";
import Alert from "../components/info/Alert";
import Succes from "../components/info/Succes";
import Error from "../components/info/Error";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ArticleProps {
  title: string;
  content: string[];
  codeBlocks?: { code: string; language: string }[];
  alerts?: { type: "success" | "error" | "info"; message: string }[];
  image?: string;
  links?: { text: string; to: string }[];
}

function Article({
  title,
  content,
  codeBlocks,
  alerts,
  image,
  links,
}: ArticleProps) {
  const { t } = useTranslation(); // Para traducción

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />
        <h2>{t(title)}</h2>

        {content.map((paragraph, index) => (
          <p key={index} className="article-p">
            {t(paragraph)}
            {links && links[index] && (
              <Link to={links[index].to}> {t(links[index].text)}</Link>
            )}
          </p>
        ))}

        {alerts?.map((alert, index) => {
          if (alert.type === "success")
            return <Succes key={index} data={t(alert.message)} />;
          if (alert.type === "error")
            return <Error key={index} data={t(alert.message)} />;
          return <Alert key={index} data={t(alert.message)} />;
        })}

        {image && <img className="article-img" src={image} alt={title} />}

        {codeBlocks?.map((block, index) => (
          <CodeBlock key={index} code={block.code} language={block.language} />
        ))}
      </div>
    </motion.div>
  );
}

export default Article;

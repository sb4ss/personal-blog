import "../../App.css";
import "../../components/general.css";
import CodeBlock from "../../components/code/CodeBlock";
import Succes from "../../components/info/Succes";
import Error from "../../components/info/Error";
import { motion } from "motion/react";
import Back from "../../components/Back";
import test from "../../../public/test.webp";

import { DiscordPresence } from "react-discord-presence";

function Two() {
  const exampleCode = `import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import "./code.css"; // Asegúrate de importar el CSS

// Definir los props del componente
interface CodeBlockProps {
  code: string;
  language?: string; // Opcional, por defecto será "javascript"
}`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />
        <h2>Ejemplo de articulo</h2>
        <p className="article-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>

        <p className="article-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem umque quo sed, ea amet aliquid doloremque quis
          ab. Modi?
        </p>

        <p className="article-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <CodeBlock code={exampleCode} language="tsx" filename="ejemplo.tsx" />
        <p className="article-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <CodeBlock code={exampleCode} language="tsx" filename="ejemplo.tsx" />
        <Succes data="Avaliable to SO " />

        <CodeBlock code={exampleCode} language="tsx" filename="rutas.tsx" />

        <Error data="Un error ha ocurrido" />
      </div>

      <DiscordPresence
        args={{ developerId: "741020084113244180" }}
        data={{
          memberSince: new Date("8/6/2020"),
        }}
        formatBannerImageSrc={() => test}
      />
    </motion.div>
  );
}

export default Two;

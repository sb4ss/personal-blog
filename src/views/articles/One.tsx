import "../../App.css";
import "../../components/general.css";
import CodeBlock from "../../components/code/CodeBlock";
import Alert from "../../components/info/Alert";
import Succes from "../../components/info/Succes";
import Error from "../../components/info/Error";
import { motion } from "motion/react";

function One() {
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
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <Alert data="orem ipsum dolor sit amet consectetur adipisicing elit. Velit,orem ipsum dolor sit amet consectetur adipisicing elit. Velit," />

        <p className="article-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <img className="article-img" src="img1.png" alt="" />
        <CodeBlock code={exampleCode} language="tsx" />
        <p className="article-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <CodeBlock code={exampleCode} language="tsx" />
        <Succes data="Avaliable to SO " />

        <CodeBlock code={exampleCode} language="tsx" />

        <Error data="Un error ha ocurrido" />
      </div>
    </motion.div>
  );
}

export default One;

import "../../App.css";
import "../../components/general.css";
import CodeBlock from "../../components/code/CodeBlock";

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
    <section className="container">
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
        <CodeBlock code={exampleCode} language="tsx" />
      </div>
    </section>
  );
}

export default One;

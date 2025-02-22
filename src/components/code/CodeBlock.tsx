import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import "./code.css"; // Asegúrate de importar el CSS

// Definir los props del componente
interface CodeBlockProps {
  code: string;
  language?: string; // Opcional, por defecto será "javascript"
  filename: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-container">
      {filename && <div className="code-filename">{filename}</div>}
      <button className="copy-button" onClick={handleCopy}>
        <LuClipboardCopy />
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={true}
        wrapLongLines={true}
        wrapLines={true}
        className="code-movile"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

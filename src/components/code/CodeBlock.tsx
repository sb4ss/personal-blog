import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { LuClipboardCopy, LuCheck, LuFileCode } from "react-icons/lu";
import "./code.css";

interface CodeBlockProps {
  code: string;
  language?: string;
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
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-container notranslate" translate="no">
      <div className="code-header">
        <div className="mac-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        {filename && (
          <div className="code-filename">
            <LuFileCode className="file-icon" />
            <span>{filename}</span>
          </div>
        )}
        <button
          className={`copy-button ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <LuCheck className="copy-icon" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <LuClipboardCopy className="copy-icon" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLongLines={true}
        className="code-syntax"
        customStyle={{
          background: "#0d1117",
          backgroundColor: "#0d1117",
          padding: "16px",
          margin: 0,
          border: "none",
          borderRadius: "0 0 14px 14px",
          fontSize: "13.5px",
          lineHeight: 1.6,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
            fontSize: "inherit",
            lineHeight: "inherit",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

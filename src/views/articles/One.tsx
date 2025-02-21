import Article from "../Article";

function One() {
  const exampleCode = `import { useState } from "react";`;

  return (
    <Article
      title="example_article"
      content={[
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam ipsum ad nesciunt sequi animi odio maxime dicta et. Assumenda architecto perspiciatis non? Accusamus natus explicabo necessitatibus suscipit dicta. Qui!.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit...",
      ]}
      alerts={[
        { type: "info", message: "Esto solo funciona" },
        { type: "success", message: "article_success" },
        { type: "error", message: "article_error" },
      ]}
      image="img1.png"
      codeBlocks={[{ code: exampleCode, language: "tsx" }]}
      links={[
        { text: "click here", to: "/two" },
        { text: "Click me", to: "/" },
      ]}
    />
  );
}

export default One;

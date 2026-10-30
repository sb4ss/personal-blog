const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf8");

// Parse articles from src/data/articles.ts
const articlesFile = fs.readFileSync(
  path.resolve(__dirname, "../src/data/articles.ts"),
  "utf8"
);

// Extraer los artículos mediante regex o evaluación segura
const articleMatches = [];
const articleRegex = /{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*content:\s*"([^"]+)",[\s\S]*?img:\s*"([^"]+)",\s*url:\s*"([^"]+)"/g;

let match;
while ((match = articleRegex.exec(articlesFile)) !== null) {
  articleMatches.push({
    id: match[1],
    title: match[2],
    content: match[3],
    img: match[4],
    url: match[5],
  });
}

console.log(`Found ${articleMatches.length} articles to generate social preview pages for.`);

const BASE_URL = "https://sb4ss-blog.vercel.app";

articleMatches.forEach((article) => {
  const imageUrl = `${BASE_URL}/${article.img.replace(/^\//, "")}`;
  const pageUrl = `${BASE_URL}/${article.url}`;
  const fullTitle = `${article.title} - s_b4ss blog`;

  let html = template;

  // Reemplazar <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);

  // Reemplazar Open Graph
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${article.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${article.content}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/i,
    `<meta property="og:image" content="${imageUrl}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${pageUrl}" />`
  );
  html = html.replace(
    /<meta property="og:type" content=".*?" \/>/i,
    `<meta property="og:type" content="article" />`
  );

  // Reemplazar Twitter Card
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${article.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${article.content}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/i,
    `<meta name="twitter:image" content="${imageUrl}" />`
  );

  // 1. Crear dist/${article.url}.html
  const flatHtmlPath = path.join(distDir, `${article.url}.html`);
  fs.writeFileSync(flatHtmlPath, html, "utf8");

  // 2. Crear dist/${article.url}/index.html
  const folderPath = path.join(distDir, article.url);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  fs.writeFileSync(path.join(folderPath, "index.html"), html, "utf8");

  console.log(`✓ Generated social preview page for: /${article.url} -> image: ${article.img}`);
});

console.log("All article social preview pages successfully generated!");

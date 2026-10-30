import "../../components/general.css";
import "../../App.css";
import CodeBlock from "../../components/code/CodeBlock";
import { motion } from "motion/react";
import Back from "../../components/Back";
import ArticleMeta from "../../components/ArticleMeta";
import ArticleFooter from "../../components/ArticleFooter";

function ReactRouterAnimaciones() {
  const exampleCode = `npm install react-router-dom framer-motion`;
  const exampleCode2 = `import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;`;

  const exampleCode3 = `import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;`;

  const exampleCode4 = `import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
};

function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <h1>Página de Inicio</h1>
    </motion.div>
  );
}

export default Home;`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>React Router con animaciones</h2>

        <ArticleMeta date="23 feb 2025" tag="React" readTime="3 min de lectura" />

        <img
          src="img1.png"
          alt="React Router y Framer Motion animaciones"
          className="article-img"
        />

        <p className="article-p">
          Las animaciones de transición fluidas transforman una aplicación web común en una experiencia que se siente nativa y moderna.
          En este artículo aprenderemos cómo sincronizar <mark>React Router v7</mark> con <span className="highlight-purple">Framer Motion</span> usando el componente clave <code>AnimatePresence</code>.
        </p>

        <h3>1. Instalación de Dependencias</h3>
        <p className="article-p">
          Instala tanto el enrutador como la librería de animaciones:
        </p>
        <CodeBlock code={exampleCode} language="bash" filename="terminal" />

        <h3>2. Configurando React Router</h3>
        <p className="article-p">
          En tu archivo <code>App.jsx</code> envuelve tus rutas en un componente dedicado (<code>AnimatedRoutes</code>) para aislar la lógica de animación:
        </p>
        <CodeBlock code={exampleCode2} language="jsx" filename="App.jsx" />

        <h3>3. Creando el componente AnimatedRoutes</h3>
        <p className="article-p">
          Para que <strong>Framer Motion</strong> reconozca cuándo una página sale y otra entra, es obligatorio pasar la propiedad <code>key={"{location.pathname}"}</code> al elemento <code>&lt;Routes&gt;</code> y activar <code>mode="wait"</code>:
        </p>
        <CodeBlock
          code={exampleCode3}
          language="jsx"
          filename="AnimatedRoutes.jsx"
        />

        <h3>4. Agregando animaciones a las páginas</h3>
        <p className="article-p">
          En cada página o vista, envolvemos el contenido en un componente <code>motion.div</code> que especifica las variantes <strong>initial</strong>, <strong>animate</strong> y <strong>exit</strong>:
        </p>
        <CodeBlock code={exampleCode4} language="jsx" filename="Home.jsx" />

        <h3>5. Catálogo de variantes útiles</h3>
        <p className="article-p">
          <strong>A. Desvanecimiento suave (Fade):</strong>
        </p>
        <CodeBlock
          code={`const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};`}
          language="javascript"
          filename="fadeVariants.js"
        />

        <p className="article-p">
          <strong>B. Desplazamiento Vertical (Slide Up/Down):</strong>
        </p>
        <CodeBlock
          code={`const slideVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};`}
          language="javascript"
          filename="slideVariants.js"
        />

        <p className="article-p">
          <strong>C. Escalado sutil (Scale In/Out):</strong>
        </p>
        <CodeBlock
          code={`const zoomVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};`}
          language="javascript"
          filename="zoomVariants.js"
        />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default ReactRouterAnimaciones;


// Importaciones por defecto

import "../../components/general.css";
import "../../App.css";
import CodeBlock from "../../components/code/CodeBlock";
import { motion } from "motion/react";
import Back from "../../components/Back";

// importaciones opcionales

function ReactRouterAnimaciones() {
  const exampleCode = `npm install react-router-dom framer-motion`;
  const exampleCode2 = `import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
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
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
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
        <h2>Animaciones con React router</h2>
        <p className="article-p">
          Las animaciones de transición pueden mejorar la experiencia del
          usuario al navegar entre diferentes páginas en una aplicación web.
          aprenderemos cómo agregar animaciones de transición a una aplicación
          React utilizando React Router y Framer Motion.
        </p>

        <h3>Instalación de Dependencias</h3>
        <CodeBlock code={exampleCode} language="" filename="" />
        <br />
        <br />
        <br />

        <h3>Configurando React Router</h3>
        <p className="article-p">
          Crea un archivo App.jsx y configura las rutas utilizando
          react-router-dom.
        </p>
        <CodeBlock code={exampleCode2} language="jsx" filename="App.jsx" />
        <br />
        <br />
        <br />
        <h3>Creando un Componente para las Rutas con Animaciones</h3>
        <p className="article-p">
          Para manejar las animaciones de transición, utilizaremos el componente
          AnimatePresence de Framer Motion.
        </p>
        <CodeBlock
          code={exampleCode3}
          language="jsx"
          filename="AnimatedRoutes.jsx"
        />
      </div>

      <br />
      <br />

      <h3>Agregando Animaciones a las Páginas</h3>
      <p className="article-p">
        En cada página, usaremos el componente motion de Framer Motion para
        definir la animación de entrada y salida. Ejemplo de Home.jsx
      </p>

      <CodeBlock code={exampleCode4} language="jsx" filename="Home.jsx" />
    </motion.div>
  );
}

export default ReactRouterAnimaciones;

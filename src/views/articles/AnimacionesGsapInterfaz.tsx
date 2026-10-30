import "../../components/general.css";
import "../../App.css";
import CodeBlock from "../../components/code/CodeBlock";
import Succes from "../../components/info/Succes";
import Alert from "../../components/info/Alert";
import Error from "../../components/info/Error";
import { motion } from "motion/react";
import Back from "../../components/Back";
import ArticleMeta from "../../components/ArticleMeta";
import ArticleFooter from "../../components/ArticleFooter";

function AnimacionesGsapInterfaz() {
  const timelineCode = `import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Crear una línea de tiempo encadenada
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    // 2. Animar título, párrafo y botones en cascada (stagger)
    tl.from(".hero-title", { y: 40, opacity: 0 })
      .from(".hero-desc", { y: 20, opacity: 0 }, "-=0.4") // Inicia 0.4s antes de que termine el anterior
      .from(".hero-card", {
        y: 30,
        opacity: 0,
        stagger: 0.15, // Efecto dominó entre tarjetas
      }, "-=0.3");
  }, { scope: containerRef }); // Limpieza de memoria automática

  return (
    <div ref={containerRef} className="hero">
      <h1 className="hero-title">Experiencias Web Fluidas</h1>
      <p className="hero-desc">Diseñadas para cautivar al usuario.</p>
      <div className="cards-grid">
        <div className="hero-card">Diseño</div>
        <div className="hero-card">Rendimiento</div>
        <div className="hero-card">Accesibilidad</div>
      </div>
    </div>
  );
}`;

  const scrollTriggerCode = `import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registrar plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

export function FeatureParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".parallax-bg", {
      yPercent: -30, // Movimiento suave acelerado por GPU
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Inicia cuando la sección entra en la pantalla
        end: "bottom top",   // Termina cuando sale por arriba
        scrub: true,         // Vincula el avance de la animación al scroll del usuario
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="feature-section">
      <div className="parallax-bg" />
      <h2>Contenido que fluye con el scroll</h2>
    </section>
  );
}`;

  const a11yCode = `// Respetar las preferencias de accesibilidad del sistema operativo
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  // Desactivar animaciones invasivas para usuarios con sensibilidad vestibular
  gsap.set(".hero-title, .hero-desc, .hero-card", { opacity: 1, y: 0 });
} else {
  // Ejecutar animación completa
  runGsapAnimations();
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

        <h2>Animaciones con GSAP que mejoran una interfaz</h2>

        <ArticleMeta date="23 jul 2026" tag="GSAP" readTime="4 min de lectura" />

        <img
          src="gsap-img.jpg"
          alt="Diagrama de flujo de animaciones web con GSAP y ScrollTrigger"
          className="article-img"
        />

        <p className="article-p">
          Una animación bien ejecutada hace que un sitio web se sienta vivo, receptivo y de calidad
          premium. Por el contrario, una animación tosca que produce tirones (jank) o que marea al
          lector arruina por completo la experiencia de usuario.
        </p>

        <p className="article-p">
          <mark>GSAP (GreenSock Animation Platform)</mark> es el estándar indiscutible de la industria para
          animaciones complejas y de alto rendimiento en la web. En este artículo veremos cómo crear entradas elegantes con{" "}
          <code>gsap.timeline()</code>, efectos de scroll sincronizados con <span className="highlight-green">ScrollTrigger</span>{" "}
          y cómo garantizar un rendimiento fluido y constante de <span className="highlight-blue">60 FPS</span>.
        </p>

        <h3>1. La Regla Sagrada: Animar solo propiedades de GPU</h3>
        <p className="article-p">
          El navegador gasta muchos recursos de CPU si intentas animar propiedades como{" "}
          <code>top</code>, <code>left</code>, <code>margin</code>, <code>width</code> o{" "}
          <code>height</code>, provocando recálculos destructivos de geometría (<em>layout reflows</em>).
        </p>
        <p className="article-p">
          En GSAP, anima siempre propiedades transformadas en la capa de composición acelerada por hardware:
        </p>
        <ul>
          <li><code>x</code> e <code>y</code> (en lugar de <code>left</code> / <code>top</code>)</li>
          <li><code>scale</code> (en lugar de <code>width</code> / <code>height</code>)</li>
          <li><code>rotation</code> (giros de elementos)</li>
          <li><code>opacity</code> (desvanecimientos suaves)</li>
        </ul>

        <Succes data="Las transformaciones en 2D/3D y la opacidad son procesadas directamente por la tarjeta gráfica (GPU), permitiendo animaciones ultra fluidas incluso en teléfonos de gama baja." />

        <h3>2. Timelines y el efecto Stagger en React</h3>
        <p className="article-p">
          Utiliza el hook oficial <code>useGSAP</code> para animar elementos en secuencia limpia con
          recolección automática de memoria al desmontar componentes:
        </p>
        <CodeBlock code={timelineCode} language="tsx" filename="HeroSection.tsx" />

        <Alert data="El parámetro '{ scope: containerRef }' aísla los selectores CSS exclusivamente dentro de tu componente, evitando que una clase como '.hero-title' altere elementos de otras páginas." />

        <h3>3. ScrollTrigger interactivo y Parallax</h3>
        <p className="article-p">
          Con <code>ScrollTrigger</code> y la propiedad <code>scrub: true</code>, la posición del
          scroll del usuario actúa directamente como el cabezal de reproducción de la animación:
        </p>
        <CodeBlock code={scrollTriggerCode} language="tsx" filename="FeatureParallax.tsx" />

        <Error data="Nunca olvides llamar a ScrollTrigger.refresh() si cargas contenido asíncrono o imágenes dinámicas que alteren la altura total del documento después del renderizado inicial." />

        <h3>4. Accesibilidad y movimiento reducido</h3>
        <p className="article-p">
          Muchos usuarios sufren de sensibilidad vestibular o mareos provocados por movimientos
          bruscos en la pantalla. Respeta siempre la preferencia del sistema operativo:
        </p>
        <CodeBlock code={a11yCode} language="javascript" filename="a11yMotion.ts" />

        <Succes data="Menos es más: las mejores microinteracciones son aquellas que duran entre 200ms y 400ms y guían la atención del usuario sin demorar su navegación." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default AnimacionesGsapInterfaz;

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

function FlujoCicdGithubActions() {
  const workflowYaml = `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate-and-build:
    runs-on: ubuntu-latest

    steps:
      # 1. Descargar el repositorio
      - name: Checkout del código
        uses: actions/checkout@v4

      # 2. Configurar entorno Node.js con caché inteligente de npm
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      # 3. Instalación reproducible y exacta de dependencias
      - name: Instalar dependencias
        run: npm ci

      # 4. Revisión de código estático (Linting)
      - name: Ejecutar ESLint
        run: npm run lint

      # 5. Compilación y comprobación estricta de TypeScript
      - name: Build y Type Check
        run: npm run build`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>Mi primer flujo de CI/CD con GitHub Actions</h2>

        <ArticleMeta date="23 may 2026" tag="DevOps" readTime="4 min de lectura" />

        <img
          src="cicd-img.jpg"
          alt="Diagrama de flujo de integración y despliegue continuo con GitHub Actions"
          className="article-img"
        />

        <p className="article-p">
          ¿Alguna vez hiciste un <code>git push</code> a producción solo para darte cuenta cinco
          minutos después de que olvidaste correr el linter o que un error tipográfico en TypeScript
          rompió la compilación?
        </p>

        <p className="article-p">
          Los flujos de <mark>CI/CD (Integración y Despliegue Continuo)</mark> son el guardián
          automatizado de tu repositorio. En este artículo configuraremos un pipeline básico pero
          profesional con <span className="highlight-blue">GitHub Actions</span> que probará, revisará y compilará tu código
          automáticamente en cada commit o Pull Request.
        </p>

        <h3>1. Los dos conceptos clave sin rodeos</h3>
        <ul>
          <li>
            <strong>CI (Integración Continua):</strong> En cada subida de código, un runner en la
            nube ejecuta tus tests, linters y comprobaciones de tipos. Si algo falla, el commit se marca
            en rojo y se bloquea la integración.
          </li>
          <li>
            <strong>CD (Despliegue Continuo):</strong> Si todas las pruebas pasan con éxito en la rama
            principal (<code>main</code>), el código se compila y se despliega automáticamente en tu
            proveedor de hosting (Vercel, Netlify, AWS o tu propio servidor).
          </li>
        </ul>

        <h3>2. Creando tu primer archivo de Workflow</h3>
        <p className="article-p">
          GitHub Actions busca automáticamente archivos de configuración en la ruta{" "}
          <code>.github/workflows/*.yml</code>. Crea el archivo <code>ci.yml</code> con esta
          estructura:
        </p>
        <CodeBlock code={workflowYaml} language="yaml" filename=".github/workflows/ci.yml" />

        <Succes data="Usa 'npm ci' en lugar de 'npm install' en tus pipelines de CI. 'npm ci' requiere un archivo package-lock.json existente y realiza una instalación limpia y exacta, garantizando que el pipeline nunca instale versiones inesperadas." />

        <h3>3. Por qué la caché de dependencias importa</h3>
        <p className="article-p">
          Al configurar <code>cache: "npm"</code> dentro de la acción <code>actions/setup-node@v4</code>,
          GitHub almacena en caché las carpetas descargadas. Esto reduce el tiempo de ejecución del
          pipeline de 3 minutos a menos de 30 segundos en cada push, ahorrando minutos gratuitos de
          tu cuenta.
        </p>

        <Alert data="Configura la regla de protección de ramas en tu repositorio (Settings -> Branches -> Branch protection rules). Marca la opción 'Require status checks to pass before merging' para que nadie pueda romper producción." />

        <h3>4. Errores habituales al empezar</h3>
        <p className="article-p">
          • <strong>Olvidar subir package-lock.json:</strong> Sin este archivo, <code>npm ci</code>{" "}
          fallará de inmediato.
          <br /><br />
          • <strong>Diferencia de sistema operativo:</strong> El runner corre en Ubuntu Linux. Si en
          tu Windows importaste <code>./Components/Card</code> con mayúscula pero el archivo se llama{" "}
          <code>card.tsx</code>, en local funcionará pero en Linux el pipeline fallará porque es
          estrictamente sensible a mayúsculas y minúsculas (case-sensitive).
        </p>

        <Error data="Nunca coloques llaves de API ni contraseñas en el archivo YAML. Guarda cualquier secreto en Settings -> Secrets and variables -> Actions y léelo con '${{ secrets.MI_VARIABLE }}'." />

        <Succes data="Una vez configurado este pipeline, puedes programar con total tranquilidad: ningún bug de sintaxis o error de compilación volverá a llegar a tu servidor." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default FlujoCicdGithubActions;

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

function TypeScriptSinComplicarse() {
  const inferenceCode = `// Redundante: no necesitas tipar lo que TypeScript ya deduce
const name: string = "Sebastian";
const count: number = 0;
const numbers: number[] = [1, 2, 3];

// Limpio: deja que la inferencia haga el trabajo
const name = "Sebastian";
const count = 0;
const numbers = [1, 2, 3];`;

  const apiTypingCode = `// 1. Define la interfaz de tu dominio
interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "user"; // Union types para valores cerrados
  avatarUrl?: string; // Propiedad opcional
}

// 2. Tipar la respuesta de la función fetch
async function fetchUserProfile(userId: number): Promise<UserProfile> {
  const response = await fetch(\`/api/users/\${userId}\`);

  if (!response.ok) {
    throw new Error(\`Error HTTP: \${response.status}\`);
  }

  // Cast tipado de la respuesta JSON
  const data: UserProfile = await response.json();
  return data;
}`;

  const utilityTypesCode = `interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
}

// Para crear un producto no necesitamos 'id' ni 'createdAt'
type CreateProductInput = Omit<Product, "id" | "createdAt">;

// Para actualizar, todos los campos pueden ser opcionales
type UpdateProductInput = Partial<CreateProductInput>;

// Para una tarjeta de catálogo solo necesitamos título y precio
type ProductPreview = Pick<Product, "title" | "price">;`;

  const reactComponentsCode = `import { type ReactNode, type ChangeEvent, type FormEvent, useState } from "react";

// Tipar props incluyendo children y variantes
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ children, variant = "primary", disabled, onClick }: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant}\`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

// Tipar eventos de formularios nativos
export function ContactForm() {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Enviando:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleChange} />
      <Button variant="primary">Suscribirme</Button>
    </form>
  );
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

        <h2>TypeScript sin complicarse: tipos que sí ayudan</h2>

        <ArticleMeta date="23 may 2025" tag="TypeScript" readTime="4 min de lectura" />

        <img
          src="typescript-img.jpg"
          alt="Diagrama de flujo de tipado con TypeScript"
          className="article-img"
        />

        <p className="article-p">
          Muchos desarrolladores abandonan TypeScript o terminan llenando su código de{" "}
          <code>any</code> porque sienten que el compilador se convierte en un obstáculo en lugar
          de una ayuda. En este artículo nos enfocaremos en el <mark>20% de TypeScript que resuelve el
          80% de tus problemas cotidianos</mark> sin enredarte en "gimnasia de tipos" abstracta.
        </p>

        <h3>1. La regla número uno: Confía en la Inferencia</h3>
        <p className="article-p">
          El error más común al empezar con TypeScript es <strong>tipar absolutamente todo manualmente</strong>. El
          compilador de TypeScript es extraordinariamente inteligente deduciendo tipos primitivos,
          arreglos y valores por defecto.
        </p>
        <CodeBlock code={inferenceCode} language="typescript" filename="inferencia.ts" />

        <Succes data="Tipa las fronteras de tu aplicación (respuestas de APIs, props de componentes y entradas de usuario). Deja que TypeScript infiera todo lo que ocurre dentro de tus funciones." />

        <h3>2. Tipando respuestas de APIs con Union Types</h3>
        <p className="article-p">
          El mayor valor de TypeScript está en modelar los datos que vienen del backend. Usar{" "}
          <span className="highlight-purple">Union Types</span> en lugar de strings libres evita errores tipográficos y te brinda
          autocompletado inmediato en tu editor.
        </p>
        <CodeBlock code={apiTypingCode} language="typescript" filename="apiService.ts" />

        <Alert data="Evita usar 'any' para silenciar errores. Si no estás seguro de la estructura que devuelve una API externa, utiliza 'unknown' y valida los campos antes de usarlos." />

        <h3>3. Utility Types: Pick, Omit y Partial</h3>
        <p className="article-p">
          No crees interfaces duplicadas desde cero para cada operación CRUD. TypeScript incluye
          tipos utilitarios que transforman tus entidades de manera limpia:
        </p>
        <CodeBlock code={utilityTypesCode} language="typescript" filename="productTypes.ts" />

        <h3>4. Componentes y Formularios en React</h3>
        <p className="article-p">
          En React 19, no necesitas envolver tus componentes en <code>React.FC</code>. Definir una
          interfaz para tus <code>Props</code> con tipos nativos para eventos te otorga
          autocompletado sin complicaciones:
        </p>
        <CodeBlock code={reactComponentsCode} language="tsx" filename="ContactForm.tsx" />

        <Error data="No inventes tipos propios para eventos HTML (como onClick o onChange). Usa 'ChangeEvent<HTMLInputElement>' y 'FormEvent<HTMLFormElement>' importados directamente desde 'react'." />

        <h3>Conclusión práctica</h3>
        <p className="article-p">
          TypeScript debe darte confianza para refactorizar sin miedo a romper cosas en producción.
          Empieza simple, tipa las interfaces de tus modelos y props, y deja que la inferencia
          haga el resto.
        </p>

        <Succes data="Un buen tipado te ahorra horas de debugging en consola antes de que el código siquiera llegue al navegador." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default TypeScriptSinComplicarse;

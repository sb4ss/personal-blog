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

function OrganizarApiNodeExpress() {
  const folderStructure = `src/
├── controllers/
│   └── user.controller.js
├── services/
│   └── user.service.js
├── routes/
│   └── user.routes.js
├── middlewares/
│   └── errorHandler.js
├── app.js
└── server.js`;

  const routeCode = `// src/routes/user.routes.js
import { Router } from "express";
import {
  getUsersController,
  createUserController,
} from "../controllers/user.controller.js";

const router = Router();

// Las rutas solo mapean URLs con métodos del controlador
router.get("/", getUsersController);
router.post("/", createUserController);

export default router;`;

  const controllerCode = `// src/controllers/user.controller.js
import { getAllUsers, createUser } from "../services/user.service.js";

// El controlador solo gestiona req, res y next
export const getUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error); // Delega al middleware de errores
  }
};

export const createUserController = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "El nombre y email son obligatorios",
      });
    }

    const newUser = await createUser({ name, email });
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};`;

  const serviceCode = `// src/services/user.service.js

// Simulación de base de datos o llamada a ORM (Prisma / Mongoose)
const usersDb = [
  { id: 1, name: "Sebastian", email: "sebas@example.com" },
  { id: 2, name: "Ana", email: "ana@example.com" },
];

export const getAllUsers = async () => {
  // Lógica de negocio pura: no sabe nada de Express ni de req/res
  return usersDb;
};

export const createUser = async ({ name, email }) => {
  const userExists = usersDb.some((u) => u.email === email);
  if (userExists) {
    const err = new Error("El correo ya está registrado");
    err.statusCode = 409;
    throw err;
  }

  const newUser = { id: usersDb.length + 1, name, email };
  usersDb.push(newUser);
  return newUser;
};`;

  const middlewareCode = `// src/middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  console.error(\`[Error \${statusCode}]: \${message}\`);

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};`;

  const appAndServerCode = `// src/app.js
import express from "express";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// Registro de rutas
app.use("/api/users", userRoutes);

// Middleware centralizado de errores (SIEMPRE al final de las rutas)
app.use(errorHandler);

export default app;

// ----------------------------------------
// src/server.js
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`🚀 Servidor corriendo en http://localhost:\${PORT}\`);
});`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>Cómo organizar una API con Node.js y Express</h2>

        <ArticleMeta date="23 mar 2025" tag="Node.js" readTime="5 min de lectura" />

        <img
          src="node-express-orden-img.jpg"
          alt="Diagrama de arquitectura Node.js y Express"
          className="article-img"
        />

        <p className="article-p">
          Cuando empezamos a desarrollar backends con Node.js y Express, es muy
          común caer en el <mark>monolito de un solo archivo</mark>: colocar la conexión a la
          base de datos, las validaciones, las rutas y las respuestas dentro de un
          mismo <code>server.js</code>.
        </p>

        <p className="article-p">
          A medida que la aplicación pasa de 3 endpoints a más de 20, ese enfoque se vuelve
          inmantenible. En este artículo veremos cómo estructurar una API limpia
          separando responsabilidades en <span className="highlight-blue">Rutas</span>,{" "}
          <span className="highlight-blue">Controladores</span>, <span className="highlight-blue">Servicios</span> y un{" "}
          <span className="highlight-green">Manejador de Errores</span> centralizado.
        </p>

        <h3>1. La regla de oro: Separación de Responsabilidades</h3>
        <p className="article-p">
          Cada capa debe tener una <strong>única razón para cambiar</strong> (Single Responsibility Principle):
        </p>
        <ul>
          <li>
            <strong>Rutas:</strong> Únicamente declaran los endpoints (URLs) y delegan la petición al controlador correspondiente sin tocar datos ni lógica.
          </li>
          <li>
            <strong>Controladores:</strong> Gestionan el protocolo HTTP: leen <code>req.body</code>, <code>req.query</code> o <code>req.params</code>, validan los parámetros y retornan códigos de estado HTTP apropiados (<code>200 OK</code>, <code>201 Created</code>, <code>400 Bad Request</code>).
          </li>
          <li>
            <strong>Servicios:</strong> Contienen la <strong>lógica de negocio pura</strong> (cálculos, consultas a base de datos, llamadas a microservicios). Desconocen por completo el objeto <code>req</code> o <code>res</code> de Express.
          </li>
          <li>
            <strong>Manejador de Errores:</strong> Captura cualquier excepción no controlada mediante <code>next(error)</code> y devuelve un formato JSON estándar y seguro.
          </li>
        </ul>

        <h3>2. Estructura de carpetas recomendada</h3>
        <p className="article-p">
          Una estructura modular y predecible que escala sin fricciones:
        </p>
        <CodeBlock code={folderStructure} language="bash" filename="Estructura de archivos" />

        <Succes data="Separar 'app.js' (definición de middlewares y rutas) de 'server.js' (app.listen) facilita probar la API con herramientas como Supertest sin ocupar puertos de red." />

        <h3>3. Capa de Rutas (Routes)</h3>
        <p className="article-p">
          Las rutas no deben contener lógica de negocio ni manipulación de datos. Solo declaran los endpoints y los métodos HTTP correspondientes:
        </p>
        <CodeBlock code={routeCode} language="javascript" filename="src/routes/user.routes.js" />

        <h3>4. Capa de Controladores (Controllers)</h3>
        <p className="article-p">
          El controlador es el puente entre el protocolo HTTP (Express) y la lógica de negocio. Lee <code>req.body</code> o <code>req.params</code>, invoca al servicio y responde al cliente.
        </p>
        <CodeBlock
          code={controllerCode}
          language="javascript"
          filename="src/controllers/user.controller.js"
        />

        <Alert data="Nunca dejes que los Servicios reciban 'req' o 'res'. Los servicios deben recibir datos puros (objetos, IDs, strings) para que puedan ser reutilizados en CLI, scripts o migraciones." />

        <h3>5. Capa de Servicios (Services)</h3>
        <p className="article-p">
          Aquí vive el corazón de tu aplicación. Si cambias de base de datos o de framework web en el futuro, esta capa no debería sufrir alteraciones mayores.
        </p>
        <CodeBlock
          code={serviceCode}
          language="javascript"
          filename="src/services/user.service.js"
        />

        <h3>6. Manejo centralizado de errores</h3>
        <p className="article-p">
          En lugar de colocar bloques <code>try/catch</code> con respuestas JSON dispersas por todo el código, delega los errores a un middleware centralizado con <code>next(error)</code>:
        </p>
        <CodeBlock
          code={middlewareCode}
          language="javascript"
          filename="src/middlewares/errorHandler.js"
        />

        <Error data="Si un middleware de Express no incluye los 4 parámetros exactamente: (err, req, res, next), Express no lo reconocerá como un middleware de error y la aplicación podría colgarse." />

        <h3>7. Uniendo todo en app.js y server.js</h3>
        <p className="article-p">
          Finalmente, ensamblamos los middlewares, las rutas y el manejador de errores en <code>app.js</code>, y arrancamos el servidor en <code>server.js</code>:
        </p>
        <CodeBlock
          code={appAndServerCode}
          language="javascript"
          filename="src/app.js y src/server.js"
        />

        <Succes data="Con esta arquitectura de 3 capas, agregar una nueva entidad (como productos o pedidos) solo requiere crear su carpeta de rutas, controlador y servicio, manteniendo el código limpio y testeable." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default OrganizarApiNodeExpress;

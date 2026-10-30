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

function DeExpressANestjs() {
  const expressCode = `// Express: Routing manual e importación directa
import { Router } from "express";
import { UsersService } from "../services/users.service";

const router = Router();
const usersService = new UsersService();

router.get("/:id", async (req, res, next) => {
  try {
    const user = await usersService.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;`;

  const nestjsCode = `// NestJS: Decoradores, Tipado estricto e Inyección de Dependencias
import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dto/user-response.dto";

@Controller("users")
export class UsersController {
  // Inyección de dependencias en el constructor
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return user;
  }
}`;

  const nestjsModuleCode = `// users.module.ts
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Reutilizable en otros módulos
})
export class UsersModule {}`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>De Express a NestJS: cuándo vale la pena dar el salto</h2>

        <ArticleMeta date="23 ene 2026" tag="NestJS" readTime="5 min de lectura" />

        <img
          src="nest-express-img.jpg"
          alt="Comparativa arquitectónica entre Express.js y NestJS"
          className="article-img"
        />

        <p className="article-p">
          Express.js ha sido el estándar de facto en el ecosistema Node.js durante más de una década.
          Su minimalismo y libertad son incomparables. Sin embargo, a medida que los proyectos
          crecen y se incorporan más desarrolladores, esa misma libertad puede convertirse en caos:
          cada desarrollador estructura las carpetas a su gusto y la falta de convenciones genera
          deuda técnica.
        </p>

        <p className="article-p">
          Aquí es donde entra <mark>NestJS</mark>, un framework fuertemente tipado e inspirado en
          la arquitectura modular de Angular y Spring Boot. En este artículo comparamos <span className="highlight-blue">ambos enfoques</span> para
          ayudarte a decidir cuándo tiene sentido migrar o empezar con NestJS.
        </p>

        <h3>1. La filosofía de Express: Libertad Absoluta</h3>
        <p className="article-p">
          Express no impone arquitectura, sistema de inyección ni librerías de validación. Es una
          delgada capa sobre el módulo HTTP nativo de Node.js.
        </p>

        <Succes data="Express es ideal para microservicios pequeños, MVPs ultrarrápidos, APIs de solo lectura y proyectos donde prima la ligereza sobre la estructura empresarial." />

        <h3>2. El mismo endpoint: Express vs NestJS</h3>
        <p className="article-p">
          Veamos cómo se implementa una ruta <code>GET /users/:id</code> en ambos mundos:
        </p>

        <p className="article-p"><strong>En Express.js:</strong></p>
        <CodeBlock code={expressCode} language="typescript" filename="users.routes.ts" />

        <p className="article-p"><strong>En NestJS:</strong></p>
        <CodeBlock code={nestjsCode} language="typescript" filename="users.controller.ts" />

        <Alert data="En NestJS no necesitas gestionar 'res.status()' manualmente para errores comunes; lanzar excepciones como 'NotFoundException' o 'BadRequestException' es capturado automáticamente por los filtros globales del framework." />

        <h3>3. Inyección de Dependencias y Modularidad</h3>
        <p className="article-p">
          El superpoder de NestJS es su contenedor de inversión de control (IoC). Los módulos
          declaran explícitamente sus dependencias y proveedores:
        </p>
        <CodeBlock code={nestjsModuleCode} language="typescript" filename="users.module.ts" />

        <Error data="No caigas en el error de usar NestJS para proyectos unipersonales muy simples. La sobrecarga de conceptos (módulos, decoradores, DTOs, pipes) puede ralentizar el desarrollo inicial si no se requiere esa escala." />

        <h3>4. Matriz de Decisión: ¿Cuál elegir?</h3>
        <p className="article-p">
          • <strong>Elige Express si:</strong> Construyes una herramienta CLI, un proxy inverso, una prueba de concepto, un microservicio de menos de 10 endpoints o si tu equipo prefiere control absoluto sobre cada middleware.
          <br /><br />
          • <strong>Elige NestJS si:</strong> Trabajas en una aplicación monolítica modular, con más de 3 desarrolladores, donde la consistencia de código, la validación estricta con DTOs, Swagger automático y testing con mocks son indispensables.
        </p>

        <Succes data="NestJS corre sobre Express (o Fastify) por debajo, por lo que todo tu conocimiento del ecosistema de middlewares sigue siendo 100% aplicable." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default DeExpressANestjs;

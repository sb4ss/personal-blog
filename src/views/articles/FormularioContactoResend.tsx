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

function FormularioContactoResend() {
  const formComponentCode = `// src/components/ContactForm.tsx
import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      honeypot: formData.get("website"), // Campo trampa anti-spam
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al enviar mensaje");

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input type="text" name="name" placeholder="Tu Nombre" required />
      <input type="email" name="email" placeholder="tu@correo.com" required />
      <textarea name="message" placeholder="¿En qué puedo ayudarte?" required />

      {/* Honeypot: Invisible para humanos, completado por bots */}
      <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {status === "success" && <p className="success-msg">¡Mensaje enviado con éxito!</p>}
      {status === "error" && <p className="error-msg">{errorMessage}</p>}
    </form>
  );
}`;

  const serverRouteCode = `// api/contact.ts (Node.js / Express o Serverless)
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Esquema de validación estricta con Zod
const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto").max(50),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
  honeypot: z.string().optional(),
});

export async function handleContactRequest(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  // 1. Validar cuerpo con Zod
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }

  const { name, email, message, honeypot } = result.data;

  // 2. Escudo Honeypot: Si un bot llenó este campo invisible, fingimos éxito
  if (honeypot) {
    console.warn("[SPAM BOT DETECTADO]:", { email, honeypot });
    return res.status(200).json({ success: true });
  }

  // 3. Envío seguro con Resend
  try {
    const { data, error } = await resend.emails.send({
      from: "Contacto Portfolio <hola@tudominio.com>",
      to: ["tu-correo-personal@gmail.com"],
      replyTo: email,
      subject: \`Nuevo mensaje de contacto: \${name}\`,
      text: \`De: \${name} (\${email})\\n\\nMensaje:\\n\${message}\`,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return res.status(500).json({ message: "Error al enviar el correo" });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
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

        <h2>Un formulario de contacto que realmente funciona con Resend</h2>

        <ArticleMeta date="23 nov 2025" tag="Resend" readTime="4 min de lectura" />

        <img
          src="resend-zod-img.jpg"
          alt="Diagrama de flujo de formulario con Resend, validación y protección anti-spam"
          className="article-img"
        />

        <p className="article-p">
          Todos los portfolios y sitios web necesitan un formulario de contacto, pero casi todos
          sufren de los mismos dolores de cabeza: mensajes que caen en la carpeta de spam, bots que
          inundan tu bandeja de entrada o llaves de API expuestas en el código fuente de React.
        </p>

        <p className="article-p">
          En este artículo veremos cómo implementar un flujo de contacto moderno y robusto
          utilizando <mark>Resend</mark>, validación con <span className="highlight-blue">Zod</span> y una técnica
          sencilla de <span className="highlight-green">Honeypot</span> que detiene el spam sin frustrar a los usuarios con
          CAPTCHAs molestos.
        </p>

        <h3>1. ¿Por qué NO enviar correos directamente desde React?</h3>
        <p className="article-p">
          Nunca debes inicializar un cliente de envío de correos con tu API Key en el frontend.
          Cualquier persona puede abrir la pestaña "Network" de las herramientas de desarrollo,
          extraer tu credencial de Resend y utilizarla para enviar spam masivo a tu nombre.
        </p>

        <Error data="Las credenciales de Resend (RESEND_API_KEY) deben residir estrictamente en el entorno del servidor o en funciones serverless. El frontend solo debe invocar un endpoint propio como '/api/contact'." />

        <h3>2. El Frontend con trampa Honeypot</h3>
        <p className="article-p">
          Un <em>Honeypot</em> es un campo oculto que los humanos no ven, pero que los bots de spam
          rellenan automáticamente al escanear los campos del formulario:
        </p>
        <CodeBlock code={formComponentCode} language="tsx" filename="ContactForm.tsx" />

        <Succes data="El campo Honeypot no requiere librerías pesadas ni imágenes de distorsión visual; bloquea más del 95% del spam automatizado de forma totalmente transparente." />

        <h3>3. La ruta de API con validación Zod y Resend</h3>
        <p className="article-p">
          En el servidor validamos la información antes de gastar cuota de correo, verificamos el
          Honeypot y enviamos el email con encabezado <code>replyTo</code> para responderle al
          remitente con un solo clic:
        </p>
        <CodeBlock code={serverRouteCode} language="typescript" filename="api/contact.ts" />

        <Alert data="Al configurar 'replyTo: email', puedes darle directamente a 'Responder' en tu cliente de correo (Gmail, Outlook) y le responderás al visitante que te escribió en lugar de auto-responderte a ti mismo." />

        <h3>4. Configuración de Dominio (SPF y DKIM)</h3>
        <p className="article-p">
          Para que tus correos lleguen a la bandeja principal y no a Spam, Resend te proporciona 3
          registros DNS (MX, TXT para SPF y CNAME para DKIM). Agrégalos en tu proveedor de dominio
          (Cloudflare, Vercel o Namecheap) para obtener una reputación de entrega del 100%.
        </p>

        <Succes data="Con este flujo tienes un formulario seguro, sin spam, validado en servidor y con una entregabilidad profesional en minutos." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default FormularioContactoResend;

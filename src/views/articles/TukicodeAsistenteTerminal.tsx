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

function TukicodeAsistenteTerminal() {
  const cliStreamCode = `# core/engine.py
import sys
from openai import OpenAI
from rich.console import Console
from rich.markdown import Markdown

console = Console()

def stream_tukicode_response(prompt: str, context: str, provider: str = "local"):
    """
    Transmite la respuesta del asistente en tiempo real directamente a la terminal
    utilizando streaming de tokens y renderizado con Rich.
    """
    # Enrutamiento: Ollama local o API en la nube
    base_url = "http://localhost:11434/v1" if provider == "local" else "https://api.groq.com/openai/v1"
    api_key = "ollama" if provider == "local" else os.getenv("GROQ_API_KEY")
    model_name = "qwen2.5-coder:7b" if provider == "local" else "llama-3.3-70b-versatile"

    client = OpenAI(base_url=base_url, api_key=api_key)

    system_message = (
        "Eres Tukicode, un asistente experto en ingeniería de software para la terminal. "
        "Responde de forma concisa, directa y con bloques de código limpios y bien comentados."
    )

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": f"Contexto del proyecto:\\n{context}\\n\\nPregunta:\\n{prompt}"},
        ],
        stream=True,
    )

    console.print("\\n[bold green]Tukicode[/bold green] [dim]pensando y respondiendo...[/dim]\\n")

    full_reply = ""
    for chunk in response:
        content = chunk.choices[0].delta.content or ""
        sys.stdout.write(content)
        sys.stdout.flush()
        full_reply += content

    console.print("\\n")
    return full_reply`;

  const contextCollectorCode = `# core/context.py
import subprocess

def get_git_diff_context() -> str:
    """Extrae las diferencias de código pendientes para brindar contexto al LLM."""
    try:
        diff = subprocess.check_output(
            ["git", "diff", "--staged"],
            stderr=subprocess.DEVNULL,
            text=True
        )
        if not diff:
            diff = subprocess.check_output(
                ["git", "diff", "HEAD~1"],
                stderr=subprocess.DEVNULL,
                text=True
            )
        return diff[:3000] # Limitar tokens para no saturar la ventana
    except Exception:
        return "No hay repositorio git activo."`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>Tukicode: construir un asistente de programación para la terminal</h2>

        <ArticleMeta date="23 sep 2026" tag="CLI" readTime="5 min de lectura" />

        <img
          src="tukicode-img.jpg"
          alt="Diagrama de arquitectura del asistente de terminal Tukicode"
          className="article-img"
        />

        <p className="article-p">
          Como desarrolladores, una gran parte de nuestras horas de trabajo transcurren en la
          terminal: ejecutando comandos de git, compilando contenedores, analizando logs y editando
          archivos de configuración. Cambiar constantemente de la consola al navegador para consultar
          un chatbot de inteligencia artificial rompe el estado de flujo creativo.
        </p>

        <p className="article-p">
          Con esa necesidad en mente nació <mark>Tukicode</mark>: un asistente de programación
          nativo para la terminal que entiende el contexto de tu repositorio en segundos, funciona
          con <span className="highlight-blue">modelos locales o en la nube</span>, y transmite respuestas con resaltado de sintaxis en tiempo
          real.
        </p>

        <h3>1. La visión arquitectónica</h3>
        <p className="article-p">
          La meta principal fue diseñar una herramienta que no dependiera obligatoriamente de una
          conexión a Internet ni de suscripciones mensuales, pero que pudiera escalar a los modelos
          más veloces del mercado:
        </p>
        <ul>
          <li>
            <strong>Entrada CLI:</strong> Captura la intención del programador directamente desde argumentos de consola o modo interactivo continuo.
          </li>
          <li>
            <strong>Extractor de contexto:</strong> Inspecciona el <code>git diff</code> activo, archivos modificados y el árbol de dependencias del proyecto.
          </li>
          <li>
            <strong>Enrutador de modelos (LLM Router):</strong> Soporte dual para <em>Ollama</em> (100% offline y privado en local) y APIs ultrarrápidas como <em>Groq</em> o <em>OpenAI</em>.
          </li>
          <li>
            <strong>Streaming en consola:</strong> Renderizado token por token con formato Markdown enriquecido y resaltado de sintaxis en 256 colores.
          </li>
        </ul>

        <Succes data="La privacidad es total cuando se utiliza con Ollama: el código fuente de tus proyectos corporativos nunca abandona tu máquina física." />

        <h3>2. Extracción inteligente de Contexto Git</h3>
        <p className="article-p">
          En lugar de enviar carpetas completas que agoten la ventana de tokens, Tukicode extrae
          únicamente lo que el programador está tocando en ese momento:
        </p>
        <CodeBlock code={contextCollectorCode} language="python" filename="core/context.py" />

        <Alert data="Alimentar al modelo con los cambios recientes ('git diff') le permite explicar bugs de regresión, generar mensajes de commit semánticos y sugerir tests unitarios específicos para ese cambio exacto." />

        <h3>3. Motor de Streaming en tiempo real</h3>
        <p className="article-p">
          Nadie quiere esperar 8 segundos en silencio frente a una terminal congelada. El streaming
          de tokens muestra los primeros caracteres en menos de 200 milisegundos:
        </p>
        <CodeBlock code={cliStreamCode} language="python" filename="core/engine.py" />

        <Error data="Evita buffers intermedios en stdout cuando hagas streaming en terminales Windows y Linux; 'sys.stdout.flush()' es esencial para evitar que los tokens se acumulen y se impriman en bloques bruscos." />

        <h3>4. Lecciones clave del proyecto</h3>
        <p className="article-p">
          1. <strong>La ergonomía de la terminal es sagrada:</strong> Comandos cortos, atajos de
          teclado y cero fricción superan a cualquier interfaz gráfica con animaciones lentas.
          <br /><br />
          2. <strong>Especialización sobre tamaño:</strong> Modelos compactos entrenados para código
          (como <code>Qwen2.5-Coder 7B</code> o <code>DeepSeek-Coder</code>) ofrecen respuestas más
          precisas en terminal que modelos genéricos gigantescos.
        </p>

        <Succes data="Tukicode demuestra que una herramienta hecha a la medida de tu flujo de trabajo diario puede transformar tu productividad como programador." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default TukicodeAsistenteTerminal;

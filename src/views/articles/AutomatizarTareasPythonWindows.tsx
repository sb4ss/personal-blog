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

function AutomatizarTareasPythonWindows() {
  const pythonScript = `# main.py
import os
import sys
import logging
from datetime import datetime

# 1. Configurar logging con ruta absoluta
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(BASE_DIR, "automation.log")

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s]: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    encoding="utf-8",
)

def run_task():
    logging.info("--- Inicio de tarea automatizada ---")
    try:
        # Aquí va tu lógica: scraping, procesamiento de datos, etc.
        logging.info("Procesando datos del reporte...")
        
        # Simulación de trabajo exitoso
        total_procesados = 42
        logging.info(f"Éxito: Se procesaron {total_procesados} registros correctamente.")
    except Exception as e:
        logging.error(f"Fallo crítico en la tarea: {str(e)}", exc_info=True)
        sys.exit(1)
    finally:
        logging.info("--- Fin de ejecución ---\\n")

if __name__ == "__main__":
    run_task()`;

  const batScript = `@echo off
:: run_task.bat
:: Cambia al directorio donde reside este script
cd /d "%~dp0"

:: Activa el entorno virtual e invoca el script
call venv\\Scripts\\activate.bat
python main.py

:: Desactiva el entorno y finaliza silenciosamente
call venv\\Scripts\\deactivate.bat
exit /b %ERRORLEVEL%`;

  const schedulerSteps = `1. Presiona Win + R, escribe "taskschd.msc" y presiona Enter.
2. En el panel derecho, haz clic en "Crear tarea..." (no "Crear tarea básica").
3. Pestaña General:
   - Nombre: "Python_Reporte_Diario"
   - Marca: "Ejecutar tanto si el usuario inició sesión como si no"
   - Marca: "Ejecutar con los privilegios más altos"
4. Pestaña Desencadenadores:
   - Nuevo... -> Diario a las 08:00 AM (o según tu necesidad).
5. Pestaña Acciones:
   - Acción: "Iniciar un programa"
   - Programa o script: "C:\\proyectos\\mi_tarea\\run_task.bat"
   - Iniciar en (OBLIGATORIO): "C:\\proyectos\\mi_tarea\\"`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>Automatizar tareas con Python y el Programador de tareas de Windows</h2>

        <ArticleMeta date="23 jul 2025" tag="Python" readTime="4 min de lectura" />

        <img
          src="python-automation.png"
          alt="Diagrama de ejecución desatendida con Windows Task Scheduler y Python"
          className="article-img"
        />

        <p className="article-p">
          Crear un script de Python que descargue reportes, limpie bases de datos o envíe correos es
          genial, pero tener que acordarse de ejecutarlo a mano todos los días anula el propósito de
          la automatización.
        </p>

        <p className="article-p">
          En este artículo aprenderás a configurar ejecuciones desatendidas en Windows utilizando el{" "}
          <mark>Programador de Tareas (Task Scheduler)</mark>, aislando dependencias con entornos
          virtuales (<code>venv</code>), empaquetando la llamada en un archivo <span className="highlight-blue">.bat</span> y
          guardando registros (<span className="highlight-green">logs</span>) profesionales para auditar cualquier fallo.
        </p>

        <h3>1. Escribir el script con Logging Robusto</h3>
        <p className="article-p">
          Cuando un script corre en segundo plano sin una ventana de terminal visible, la función{" "}
          <code>print()</code> no sirve de nada. Necesitas escribir a un archivo de log con fecha,
          hora y niveles de severidad (<code>INFO</code>, <code>ERROR</code>):
        </p>
        <CodeBlock code={pythonScript} language="python" filename="main.py" />

        <Succes data="Usa 'os.path.dirname(os.path.abspath(__file__))' para construir las rutas de archivos. Esto garantiza que tus logs y lecturas de datos funcionen sin importar desde dónde se invoque el script." />

        <h3>2. El lanzador Batch (.bat)</h3>
        <p className="article-p">
          El error número uno al programar tareas en Windows es intentar ejecutar directamente{" "}
          <code>python.exe main.py</code> desde el Programador de Tareas. Esto suele fallar porque
          Windows no activa tu <code>venv</code> y las librerías de terceros (como Pandas o Requests)
          no se encuentran.
        </p>
        <p className="article-p">
          La solución es crear un wrapper <code>run_task.bat</code> en la misma carpeta del proyecto:
        </p>
        <CodeBlock code={batScript} language="batch" filename="run_task.bat" />

        <Alert data="El comando 'cd /d %~dp0' dentro del archivo .bat le indica a la consola que cambie la ruta de trabajo actual a la carpeta exacta donde está guardado el script .bat, resolviendo problemas de rutas relativas." />

        <h3>3. Configuración en el Programador de Tareas</h3>
        <p className="article-p">
          Sigue estos pasos precisos dentro de <code>taskschd.msc</code>:
        </p>
        <CodeBlock code={schedulerSteps} language="text" filename="Configuración Task Scheduler" />

        <Error data="El campo 'Iniciar en (opcional)' de la pestaña Acciones NO es opcional en la práctica. Si lo dejas vacío, Windows ejecutará el script desde 'C:\\Windows\\System32', rompiendo cualquier ruta relativa." />

        <h3>4. ¿Cómo saber si la tarea falló?</h3>
        <p className="article-p">
          Gracias al bloque <code>try/except</code> y a <code>sys.exit(1)</code>, el archivo .bat
          devolverá un código de salida diferente de cero. En el Programador de Tareas verás el
          resultado de la última ejecución: <code>0x0</code> indica éxito, y cualquier otro valor
          (como <code>0x1</code>) indica que debes consultar <code>automation.log</code> para
          revisar la traza del error.
        </p>

        <Succes data="Con esta arquitectura, tus scripts correrán puntuales cada día de forma invisible, manteniendo un historial auditado sin requerir servidores pagos en la nube." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default AutomatizarTareasPythonWindows;

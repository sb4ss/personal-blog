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

function AutomatizarTableauPython() {
  const installCode = `pip install tableauserverclient`;

  const scriptCode = `# refresh_tableau.py
import os
import sys
import time
import logging
import tableauserverclient as TSC

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s]: %(message)s")

# 1. Configuración de credenciales seguras (PAT)
SERVER_URL = os.getenv("TABLEAU_SERVER_URL", "https://prod-uk-a.online.tableau.com")
TOKEN_NAME = os.getenv("TABLEAU_TOKEN_NAME", "automation_script")
TOKEN_SECRET = os.getenv("TABLEAU_TOKEN_SECRET", "tu_token_secreto")
SITE_NAME = os.getenv("TABLEAU_SITE_NAME", "mi_empresa_site")
TARGET_DATASOURCE = "Ventas_Consolidadas_Hyper"

def refresh_datasource():
    # 2. Autenticación con Personal Access Token
    tableau_auth = TSC.PersonalAccessTokenAuth(
        token_name=TOKEN_NAME,
        personal_access_token=TOKEN_SECRET,
        site_id=SITE_NAME,
    )
    server = TSC.Server(SERVER_URL, use_server_version=True)

    logging.info(f"Conectando a Tableau en: {SERVER_URL}...")
    with server.auth.sign_in(tableau_auth):
        logging.info("Inicio de sesión exitoso.")

        # 3. Buscar la fuente de datos por nombre
        req_option = TSC.RequestOptions()
        req_option.filter.add(
            TSC.Filter(
                TSC.RequestOptions.Field.Name,
                TSC.RequestOptions.Operator.Equals,
                TARGET_DATASOURCE,
            )
        )
        datasources, _ = server.datasources.get(req_option)

        if not datasources:
            logging.error(f"No se encontró la fuente de datos: '{TARGET_DATASOURCE}'")
            sys.exit(1)

        datasource = datasources[0]
        logging.info(f"Fuente encontrada: {datasource.name} (ID: {datasource.id})")

        # 4. Disparar el refresco asíncrono
        logging.info("Iniciando trabajo de actualización de extracto...")
        job = server.datasources.refresh(datasource)

        # 5. Monitorear el estado del Job hasta finalizar
        job_result = server.jobs.wait_for_job(job, timeout=600)
        
        if job_result.finish_code == "0":
            logging.info("¡Extracto actualizado con éxito en Tableau!")
        else:
            logging.error(f"El refresco falló con código {job_result.finish_code}")
            sys.exit(1)

if __name__ == "__main__":
    refresh_datasource()`;

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="article">
        <Back />

        <h2>Automatizar tableros de Tableau con Python</h2>

        <ArticleMeta date="23 mar 2026" tag="Tableau" readTime="4 min de lectura" />

        <img
          src="python-tableau-img.jpg"
          alt="Diagrama de automatización de extractos y tableros en Tableau con Python"
          className="article-img"
        />

        <p className="article-p">
          En empresas impulsadas por datos, es muy común que los pipelines de ingeniería terminen de
          transformar información a horas variables de la madrugada. Si programas un refresco fijo en
          Tableau Server a las 05:00 AM pero tu pipeline ETL se retrasa 10 minutos, los tableros
          mostrarán datos desactualizados para todo el equipo directivo.
        </p>

        <p className="article-p">
          La solución profesional es que tu propio script de Python desencadene el <mark>refresco del
          extracto en Tableau Server o Tableau Cloud</mark> inmediatamente después de terminar la carga de
          datos, verificando con la API que la tarea culmine <span className="highlight-green">exitosamente</span>.
        </p>

        <h3>1. Autenticación moderna con Personal Access Tokens (PAT)</h3>
        <p className="article-p">
          Nunca utilices usuario y contraseña en scripts desatendidos. Los <em>Personal Access Tokens (PAT)</em>{" "}
          son más seguros, no se ven afectados por autenticación de dos factores (MFA) y pueden
          revocarse individualmente desde el perfil de Tableau.
        </p>

        <Succes data="Crea tu PAT desde Tableau Cloud en: Mi configuración de cuenta -> Tokens de acceso personal. Guarda el secreto de inmediato porque solo se muestra una vez." />

        <h3>2. Instalación de la librería oficial TSC</h3>
        <p className="article-p">
          Tableau mantiene la librería oficial <code>tableauserverclient</code> para Python:
        </p>
        <CodeBlock code={installCode} language="bash" filename="terminal" />

        <h3>3. Script completo de actualización y monitoreo</h3>
        <p className="article-p">
          Este script inicia sesión mediante el token, localiza el extracto Hyper, envía la orden de
          refresco y espera activamente a que el servidor confirme que los tableros han sido
          actualizados:
        </p>
        <CodeBlock code={scriptCode} language="python" filename="refresh_tableau.py" />

        <Alert data="El método 'server.jobs.wait_for_job()' sondea periódicamente a la API de Tableau hasta que el trabajo termina con código '0' (éxito). Configura un timeout generoso si tu extracto procesa millones de filas." />

        <h3>4. Errores habituales y cómo prevenirlos</h3>
        <p className="article-p">
          • <strong>Token inactivo por 15 días:</strong> Si un Personal Access Token no se usa durante 15 días consecutivos, Tableau lo revoca automáticamente por seguridad. Mantén tus tareas corriendo con regularidad.
          <br /><br />
          • <strong>Concurrencia de Jobs:</strong> Si disparas refrescos simultáneos en fuentes conectadas al mismo puente (Tableau Bridge), los trabajos harán cola. Diseña tus automatizaciones en secuencia.
          <br /><br />
          • <strong>Permisos de sitio:</strong> Asegúrate de que el usuario que generó el token tenga rol de <em>Creador</em> o permisos de edición explícitos sobre el proyecto donde reside la fuente.
        </p>

        <Error data="Si usas Tableau Server On-Premise con certificados autofirmados, deberás pasar server.add_http_options({'verify': False}) para evitar fallos de verificación SSL en redes locales." />

        <Succes data="Integrar Tableau en tus flujos de Python cierra la brecha entre la ingeniería de datos y la visualización de negocio de forma 100% automática y confiable." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default AutomatizarTableauPython;

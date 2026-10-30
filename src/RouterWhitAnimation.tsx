import NotFound from "./NotFound.tsx";
import Home from "./views/Home.tsx";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ReactRouterAnimaciones from "./views/articles/ReactRouterAnimaciones.tsx";
import OrganizarApiNodeExpress from "./views/articles/OrganizarApiNodeExpress.tsx";
import TypeScriptSinComplicarse from "./views/articles/TypeScriptSinComplicarse.tsx";
import AutomatizarTareasPythonWindows from "./views/articles/AutomatizarTareasPythonWindows.tsx";
import SupabaseAutenticacionPermisos from "./views/articles/SupabaseAutenticacionPermisos.tsx";
import FormularioContactoResend from "./views/articles/FormularioContactoResend.tsx";
import DeExpressANestjs from "./views/articles/DeExpressANestjs.tsx";
import AutomatizarTableauPython from "./views/articles/AutomatizarTableauPython.tsx";
import FlujoCicdGithubActions from "./views/articles/FlujoCicdGithubActions.tsx";
import AnimacionesGsapInterfaz from "./views/articles/AnimacionesGsapInterfaz.tsx";
import TukicodeAsistenteTerminal from "./views/articles/TukicodeAsistenteTerminal.tsx";

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route
        path="/article-react-router-animaciones"
        element={<ReactRouterAnimaciones />}
      />
      <Route
        path="/article-organizar-api-node-express"
        element={<OrganizarApiNodeExpress />}
      />
      <Route
        path="/article-typescript-sin-complicarse"
        element={<TypeScriptSinComplicarse />}
      />
      <Route
        path="/article-automatizar-tareas-python-windows"
        element={<AutomatizarTareasPythonWindows />}
      />
      <Route
        path="/article-supabase-autenticacion-permisos"
        element={<SupabaseAutenticacionPermisos />}
      />
      <Route
        path="/article-formulario-contacto-resend"
        element={<FormularioContactoResend />}
      />
      <Route
        path="/article-de-express-a-nestjs"
        element={<DeExpressANestjs />}
      />
      <Route
        path="/article-automatizar-tableau-python"
        element={<AutomatizarTableauPython />}
      />
      <Route
        path="/article-flujo-cicd-github-actions"
        element={<FlujoCicdGithubActions />}
      />
      <Route
        path="/article-animaciones-gsap-interfaz"
        element={<AnimacionesGsapInterfaz />}
      />
      <Route
        path="/article-tukicode-asistente-terminal"
        element={<TukicodeAsistenteTerminal />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesWithAnimation;

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

function SupabaseAutenticacionPermisos() {
  const clientSetupCode = `// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan las variables de entorno de Supabase.");
}

// Cliente público para el frontend (utiliza la anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);`;

  const authReactCode = `// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión activa al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Escuchar cambios de estado en tiempo real (login, logout, refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, loginWithEmail, logout };
}`;

  const rlsSqlCode = `-- 1. Habilitar Row Level Security (RLS) en la tabla
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;

-- 2. Política: Cualquiera autenticado puede LEER solo sus propias notas
CREATE POLICY "Los usuarios solo ven sus notas"
ON notas
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. Política: Al INSERTAR, el user_id DEBE coincidir con el token JWT
CREATE POLICY "Los usuarios solo crean notas a su nombre"
ON notas
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4. Política: Solo el creador puede EDITAR o ELIMINAR
CREATE POLICY "Los usuarios solo modifican sus notas"
ON notas
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);`;

  const safeQueryCode = `// src/services/notesService.ts
import { supabase } from "../lib/supabaseClient";

export async function fetchUserNotes() {
  // Con RLS activado, ya NO necesitas hacer .eq('user_id', user.id) obligatoriamente.
  // PostgreSQL filtra automáticamente las filas basándose en el JWT del usuario autenticado.
  const { data, error } = await supabase
    .from("notas")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
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

        <h2>Supabase en una aplicación real: autenticación y permisos</h2>

        <ArticleMeta date="23 sep 2025" tag="Supabase" readTime="5 min de lectura" />

        <img
          src="supabase-react-img.jpg"
          alt="Diagrama de flujo de autenticación y Row Level Security con Supabase"
          className="article-img"
        />

        <p className="article-p">
          Cuando conectamos una aplicación React directamente a Supabase, solemos maravillarnos
          con la facilidad para consultar datos usando <code>supabase.from('tabla').select()</code>.
          Sin embargo, esa misma facilidad puede convertirse en una vulnerabilidad crítica si no
          comprendemos cómo proteger la base de datos.
        </p>

        <p className="article-p">
          En este artículo veremos cómo implementar autenticación con Supabase en React y, lo más
          importante, cómo configurar <mark>Row Level Security (RLS)</mark> en PostgreSQL para
          que la seguridad resida en la base de datos y no dependa de la confianza ciega en el frontend.
        </p>

        <h3>1. La ilusión de seguridad en el Frontend</h3>
        <p className="article-p">
          Muchos desarrolladores novatos creen que proteger los datos consiste en agregar un filtro
          en React como <code>.eq('user_id', currentUser.id)</code>. Cualquier usuario curioso
          puede abrir la consola del navegador, modificar la consulta o emitir peticiones cURL usando
          tu anon key para leer los datos de otros usuarios si tu tabla no tiene RLS activo.
        </p>

        <Error data="Nunca confíes en el frontend para filtrar datos privados. La anon key de Supabase es pública por diseño; tu verdadera barrera de defensa es RLS en PostgreSQL." />

        <h3>2. Inicialización segura del cliente</h3>
        <p className="article-p">
          Guarda la URL y la llave anónima en variables de entorno de Vite (prefijo <code>VITE_</code>):
        </p>
        <CodeBlock code={clientSetupCode} language="typescript" filename="src/lib/supabaseClient.ts" />

        <h3>3. Gestión de sesión en React</h3>
        <p className="article-p">
          Escucha el ciclo de vida de la sesión con <code>onAuthStateChange</code> para reaccionar
          cuando el token JWT expire o se renueve automáticamente:
        </p>
        <CodeBlock code={authReactCode} language="typescript" filename="src/hooks/useAuth.ts" />

        <Succes data="Supabase gestiona la persistencia de sesión en localStorage y la rotación de tokens JWT de forma transparente sin que tengas que escribir lógica manual de cookies." />

        <h3>4. Row Level Security (RLS): La clave de todo</h3>
        <p className="article-p">
          Row Level Security le indica al motor PostgreSQL que filtre cada fila según el usuario que
          firma la petición. La función <code>auth.uid()</code> extrae el ID del usuario directamente
          del token JWT criptográficamente verificado:
        </p>
        <CodeBlock code={rlsSqlCode} language="sql" filename="supabase/migrations/rls_policies.sql" />

        <Alert data="Al crear una nueva tabla en Supabase, RLS viene desactivado por defecto si usas scripts SQL puros. Asegúrate de ejecutar siempre 'ALTER TABLE ... ENABLE ROW LEVEL SECURITY;'." />

        <h3>5. Consultas limpias y protegidas</h3>
        <p className="article-p">
          Una vez configuradas las políticas RLS, tu código en React se vuelve más limpio y seguro.
          Aunque un atacante intente consultar toda la tabla, PostgreSQL solo le devolverá sus
          propias filas:
        </p>
        <CodeBlock code={safeQueryCode} language="typescript" filename="src/services/notesService.ts" />

        <Succes data="Con RLS bien configurado, puedes exponer consultas directamente desde React a Supabase con total tranquilidad y rendimiento nativo de base de datos relacional." />

        <ArticleFooter />
      </div>
    </motion.div>
  );
}

export default SupabaseAutenticacionPermisos;

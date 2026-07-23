// =====================================================================
// AuthProvider (FEHNA) — contexto de autenticación
// ---------------------------------------------------------------------
// Centraliza la sesión de Supabase y el perfil (rol) del usuario para
// toda la app. La seguridad REAL vive en las políticas RLS de la base
// de datos; este contexto solo controla la experiencia de la interfaz.
// =====================================================================
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";

type Perfil = Pick<Tables<"perfiles">, "id" | "nombre" | "rol" | "activo">;

interface AuthValue {
  session: Session | null;
  perfil: Perfil | null;
  cargando: boolean;
  cerrarSesion: () => Promise<void>;
  tieneAcceso: boolean; // perfil existe y está activo → puede entrar al panel
  esAdmin: boolean; // perfil activo con rol 'admin'
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargarPerfil(userId: string) {
      const { data } = await supabase
        .from("perfiles")
        .select("id, nombre, rol, activo")
        .eq("id", userId)
        .single();
      if (activo) setPerfil((data as Perfil) ?? null);
    }

    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!activo) return;
      setSession(session);
      if (session?.user) {
        cargarPerfil(session.user.id).finally(() => {
          if (activo) setCargando(false);
        });
      } else {
        setCargando(false);
      }
    });

    // Cambios de sesión: login, logout, refresco de token
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!activo) return;
      setSession(session);
      if (session?.user) {
        cargarPerfil(session.user.id);
      } else {
        setPerfil(null);
      }
    });

    return () => {
      activo = false;
      subscription.unsubscribe();
    };
  }, []);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    setPerfil(null);
  }

  const value: AuthValue = {
    session,
    perfil,
    cargando,
    cerrarSesion,
    tieneAcceso: !!perfil?.activo,
    esAdmin: perfil?.rol === "admin" && !!perfil?.activo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}

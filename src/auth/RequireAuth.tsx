// =====================================================================
// RequireAuth (FEHNA) — protege rutas del panel de administración
// ---------------------------------------------------------------------
// - Sin sesión           → redirige a /admin/login
// - Sesión sin perfil activo → mensaje de acceso denegado
// - soloAdmin y no admin → redirige al panel base
// La API igual rechaza cualquier escritura no autorizada por RLS, esto
// es solo la capa de usabilidad del cliente.
// =====================================================================
import type { ReactNode } from "react";
import { Navigate } from "@/lib/router";
import { useAuth } from "./AuthProvider";

export function RequireAuth({
  children,
  soloAdmin = false,
}: {
  children: ReactNode;
  soloAdmin?: boolean;
}) {
  const { session, cargando, tieneAcceso, esAdmin } = useAuth();

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white/60">
        Cargando…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!tieneAcceso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center">
          <h1
            className="text-2xl font-black text-white uppercase mb-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Acceso denegado
          </h1>
          <p className="text-white/60 text-sm">
            Tu cuenta no tiene acceso al panel o está desactivada. Contacta a un
            administrador de la FEHNA.
          </p>
        </div>
      </div>
    );
  }

  if (soloAdmin && !esAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

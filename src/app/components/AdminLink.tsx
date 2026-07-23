// =====================================================================
// AdminLink (FEHNA) — acceso discreto al panel desde el footer
// ---------------------------------------------------------------------
// Icono pequeño y tenue que solo se aviva al pasar el mouse. Lleva a la
// ruta /admin (protegida). No muestra texto "Admin" al público general,
// pero conserva aria-label para accesibilidad.
// =====================================================================
import { Link } from "@/lib/router";
import { Lock } from "lucide-react";

export function AdminLink() {
  return (
    <Link
      to="/admin"
      aria-label="Acceso administrativo"
      title="Acceso administrativo"
      className="inline-flex items-center text-white/20 hover:text-accent transition-colors"
    >
      <Lock size={14} />
    </Link>
  );
}

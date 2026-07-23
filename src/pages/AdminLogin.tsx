// =====================================================================
// AdminLogin (FEHNA) — página de inicio de sesión del panel
// ---------------------------------------------------------------------
// Autenticación con correo + contraseña vía Supabase Auth.
// Mensaje de error genérico (no revela si el correo existe).
// =====================================================================
import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "@/lib/router";
import { Lock, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/auth/AuthProvider";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();
  const { session } = useAuth();

  const destino = "/admin";

  // Ya autenticado → al panel
  if (session) {
    navigate(destino, { replace: true });
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setEnviando(false);
    if (error) {
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
      return;
    }
    navigate(destino, { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-accent text-xs mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Volver al sitio
        </Link>

        <form
          onSubmit={onSubmit}
          className="bg-card border border-white/10 rounded-xl p-8 space-y-5"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center mx-auto mb-4">
              <Lock size={20} className="text-accent" />
            </div>
            <h1
              className="text-2xl font-black text-white uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Panel FEHNA
            </h1>
            <p className="text-white/50 text-xs mt-1">
              Acceso exclusivo para personal autorizado
            </p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
              Correo
            </label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
              placeholder="correo@fenah.hn"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full py-3.5 bg-accent text-[#061529] font-black rounded hover:bg-white transition-all duration-200 tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {enviando ? "Ingresando…" : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

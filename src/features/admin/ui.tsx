// =====================================================================
// UI reutilizable del panel (FEHNA) — controles ligeros con el tema
// oscuro del sitio. Sin dependencias externas.
// =====================================================================
import type { ReactNode } from "react";
import { X } from "lucide-react";

const inputCls =
  "w-full bg-secondary border border-white/10 rounded px-3 py-2.5 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20 disabled:opacity-50";

export function Campo({
  label,
  children,
  requerido,
}: {
  label: string;
  children: ReactNode;
  requerido?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
        {label} {requerido && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}

export function Texto(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

export function AreaTexto(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} resize-y`} />;
}

export function Selector({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select {...props} className={`${inputCls} cursor-pointer`}>
      {children}
    </select>
  );
}

export function Interruptor({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2 text-sm text-white/80"
    >
      <span
        className={`w-9 h-5 rounded-full transition-colors relative ${
          checked ? "bg-accent" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
            checked ? "left-4.5 translate-x-0" : "left-0.5"
          }`}
          style={{ left: checked ? "18px" : "2px" }}
        />
      </span>
      {label}
    </button>
  );
}

export function Boton({
  variante = "primario",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "primario" | "secundario" | "peligro";
}) {
  const estilos = {
    primario:
      "bg-accent text-[#061529] hover:bg-white font-bold disabled:opacity-60",
    secundario:
      "border border-white/15 text-white/80 hover:border-white/40",
    peligro: "border border-red-500/30 text-red-300 hover:bg-red-500/10",
  }[variante];
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded text-sm transition-all duration-200 disabled:cursor-not-allowed ${estilos} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Etiqueta({ activo, texto }: { activo: boolean; texto?: string }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded font-semibold ${
        activo
          ? "bg-accent/15 text-accent border border-accent/30"
          : "bg-white/5 text-white/40 border border-white/10"
      }`}
    >
      {texto ?? (activo ? "Sí" : "No")}
    </span>
  );
}

export function Modal({
  titulo,
  abierto,
  onCerrar,
  children,
}: {
  titulo: string;
  abierto: boolean;
  onCerrar: () => void;
  children: ReactNode;
}) {
  if (!abierto) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      onClick={onCerrar}
    >
      <div
        className="bg-card border border-white/10 rounded-xl w-full max-w-lg my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3
            className="text-lg font-black text-white uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {titulo}
          </h3>
          <button onClick={onCerrar} className="text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ErrorMsg({ mensaje }: { mensaje: string | null }) {
  if (!mensaje) return null;
  return (
    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
      {mensaje}
    </p>
  );
}

export function Vacio({ mensaje }: { mensaje: string }) {
  return (
    <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
      {mensaje}
    </div>
  );
}

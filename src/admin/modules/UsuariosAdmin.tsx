// Módulo Usuarios (solo admin) — gestión de perfiles y cuentas.
// - Crear / eliminar cuentas auth: vía Edge Function segura (service role
//   del lado servidor). Nunca se expone la clave de servicio al navegador.
// - Editar nombre / rol / estado: directo por RLS (solo admin).
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/auth/AuthProvider";
import { ShieldCheck } from "lucide-react";
import {
  Boton,
  Campo,
  Etiqueta,
  ErrorMsg,
  Interruptor,
  Modal,
  Selector,
  Texto,
  Vacio,
} from "../ui";
import { Encabezado, AccionesFila } from "./ClubesAdmin";

interface Perfil {
  id: string;
  nombre: string;
  rol: "admin" | "digitador";
  activo: boolean;
  creado_en: string;
}

// Invoca la Edge Function y normaliza el mensaje de error.
async function invocar(body: Record<string, unknown>): Promise<{ error: string | null }> {
  const { data, error } = await supabase.functions.invoke("gestion-usuarios", { body });
  if (error) {
    let msg = error.message;
    try {
      const j = await (error as any).context?.json?.();
      if (j?.error) msg = j.error;
    } catch { /* ignora */ }
    return { error: msg };
  }
  if (data?.error) return { error: data.error };
  return { error: null };
}

export default function UsuariosAdmin() {
  const { perfil: yo } = useAuth();
  const [rows, setRows] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function cargar() {
    setLoading(true);
    const { data, error } = await supabase
      .from("perfiles")
      .select("id,nombre,rol,activo,creado_en")
      .order("creado_en", { ascending: true });
    if (error) setError(error.message);
    else setRows((data as Perfil[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { cargar(); }, []);

  // ---- Crear ----
  const [crearAbierto, setCrearAbierto] = useState(false);
  const [nuevo, setNuevo] = useState({ email: "", nombre: "", password: "", rol: "digitador" as "admin" | "digitador" });
  const [creando, setCreando] = useState(false);
  const [errCrear, setErrCrear] = useState<string | null>(null);

  function abrirCrear() {
    setNuevo({ email: "", nombre: "", password: "", rol: "digitador" });
    setErrCrear(null);
    setCrearAbierto(true);
  }
  async function crear(e: React.FormEvent) {
    e.preventDefault();
    if (nuevo.password.length < 8) { setErrCrear("La contraseña debe tener al menos 8 caracteres."); return; }
    setCreando(true);
    setErrCrear(null);
    const { error } = await invocar({ accion: "crear", ...nuevo });
    setCreando(false);
    if (error) setErrCrear(error);
    else { setCrearAbierto(false); await cargar(); }
  }

  // ---- Editar ----
  const [editAbierto, setEditAbierto] = useState(false);
  const [editando, setEditando] = useState<Perfil | null>(null);
  const [form, setForm] = useState({ nombre: "", rol: "digitador" as "admin" | "digitador", activo: true });
  const [guardando, setGuardando] = useState(false);
  const [errEdit, setErrEdit] = useState<string | null>(null);

  function abrirEditar(p: Perfil) {
    setEditando(p);
    setForm({ nombre: p.nombre, rol: p.rol, activo: p.activo });
    setErrEdit(null);
    setEditAbierto(true);
  }
  async function guardarEdit(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setErrEdit(null);
    const { error } = await supabase
      .from("perfiles")
      .update({ nombre: form.nombre.trim(), rol: form.rol, activo: form.activo })
      .eq("id", editando!.id);
    setGuardando(false);
    if (error) setErrEdit(error.message);
    else { setEditAbierto(false); await cargar(); }
  }

  async function eliminar(p: Perfil) {
    if (p.id === yo?.id) { alert("No puedes eliminar tu propia cuenta."); return; }
    if (!confirm(`¿Eliminar la cuenta de "${p.nombre}"? Esto borra el acceso por completo.`)) return;
    const { error } = await invocar({ accion: "eliminar", id: p.id });
    if (error) alert("No se pudo eliminar: " + error);
    else await cargar();
  }

  const esYo = editando?.id === yo?.id;

  return (
    <div>
      <Encabezado titulo="Usuarios" cantidad={rows.length} onNuevo={abrirCrear} etiqueta="Nuevo usuario" />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay usuarios." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3 text-white font-medium">
                    {p.nombre}
                    {p.id === yo?.id && <span className="text-white/30 text-xs ml-2">(tú)</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-white/70">
                      {p.rol === "admin" && <ShieldCheck size={13} className="text-accent" />}
                      {p.rol}
                    </span>
                  </td>
                  <td className="px-4 py-3"><Etiqueta activo={p.activo} texto={p.activo ? "Activo" : "Inactivo"} /></td>
                  <td className="px-4 py-3"><AccionesFila onEditar={() => abrirEditar(p)} onBorrar={() => eliminar(p)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Crear */}
      <Modal titulo="Nuevo usuario" abierto={crearAbierto} onCerrar={() => setCrearAbierto(false)}>
        <form onSubmit={crear} className="space-y-4">
          <Campo label="Correo" requerido>
            <Texto type="email" required value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} placeholder="persona@fenah.hn" />
          </Campo>
          <Campo label="Nombre" requerido>
            <Texto required value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} placeholder="Nombre y apellido" />
          </Campo>
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Contraseña temporal" requerido>
              <Texto type="text" required value={nuevo.password} onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })} placeholder="mín. 8 caracteres" />
            </Campo>
            <Campo label="Rol" requerido>
              <Selector value={nuevo.rol} onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value as "admin" | "digitador" })}>
                <option value="digitador">Digitador</option>
                <option value="admin">Administrador</option>
              </Selector>
            </Campo>
          </div>
          <p className="text-xs text-white/40">La cuenta se crea con correo confirmado. Comparte la contraseña temporal de forma segura y pide que la cambie.</p>
          <ErrorMsg mensaje={errCrear} />
          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" variante="secundario" onClick={() => setCrearAbierto(false)}>Cancelar</Boton>
            <Boton type="submit" disabled={creando}>{creando ? "Creando…" : "Crear usuario"}</Boton>
          </div>
        </form>
      </Modal>

      {/* Editar */}
      <Modal titulo="Editar usuario" abierto={editAbierto} onCerrar={() => setEditAbierto(false)}>
        <form onSubmit={guardarEdit} className="space-y-4">
          <Campo label="Nombre" requerido>
            <Texto required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          </Campo>
          <Campo label="Rol" requerido>
            <Selector value={form.rol} disabled={esYo} onChange={(e) => setForm({ ...form, rol: e.target.value as "admin" | "digitador" })}>
              <option value="digitador">Digitador</option>
              <option value="admin">Administrador</option>
            </Selector>
          </Campo>
          <Interruptor checked={form.activo} onChange={(v) => !esYo && setForm({ ...form, activo: v })} label="Cuenta activa" />
          {esYo && <p className="text-xs text-amber-300/80">Por seguridad no puedes cambiar tu propio rol ni desactivarte.</p>}
          <ErrorMsg mensaje={errEdit} />
          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" variante="secundario" onClick={() => setEditAbierto(false)}>Cancelar</Boton>
            <Boton type="submit" disabled={guardando}>{guardando ? "Guardando…" : "Guardar"}</Boton>
          </div>
        </form>
      </Modal>
    </div>
  );
}

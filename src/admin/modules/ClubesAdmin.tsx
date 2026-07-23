// Módulo Clubes — CRUD real contra Supabase (tabla public.clubes)
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Tables } from "@/lib/supabase";
import { useCrud } from "../useCrud";
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

type Club = Tables<"clubes">;

const CIUDADES = [
  "Tegucigalpa",
  "San Pedro Sula",
  "La Ceiba",
  "Choluteca",
  "Comayagua",
  "Danlí",
  "Puerto Cortés",
  "Otra",
];

export default function ClubesAdmin() {
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<Club>(
    "clubes",
    { orderBy: { column: "nombre" } }
  );

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<Club | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    abreviatura: "",
    ciudad: "",
    activo: true,
  });
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  function nuevo() {
    setEditando(null);
    setForm({ nombre: "", abreviatura: "", ciudad: "", activo: true });
    setErrForm(null);
    setAbierto(true);
  }

  function editar(c: Club) {
    setEditando(c);
    setForm({
      nombre: c.nombre,
      abreviatura: c.abreviatura ?? "",
      ciudad: c.ciudad ?? "",
      activo: c.activo,
    });
    setErrForm(null);
    setAbierto(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setErrForm(null);
    const valores = {
      nombre: form.nombre.trim(),
      abreviatura: form.abreviatura.trim() || null,
      ciudad: form.ciudad || null,
      activo: form.activo,
    };
    const { error } = editando
      ? await actualizar(editando.id, valores)
      : await crear(valores);
    setGuardando(false);
    if (error) setErrForm(error);
    else setAbierto(false);
  }

  async function borrar(c: Club) {
    if (!confirm(`¿Eliminar el club "${c.nombre}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await eliminar(c.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado titulo="Clubes" cantidad={rows.length} onNuevo={nuevo} etiqueta="Nuevo club" />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay clubes registrados. Crea el primero." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Abrev.</th>
                <th className="px-4 py-3">Ciudad</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3 text-white font-medium">{c.nombre}</td>
                  <td className="px-4 py-3 text-white/60">{c.abreviatura ?? "—"}</td>
                  <td className="px-4 py-3 text-white/60">{c.ciudad ?? "—"}</td>
                  <td className="px-4 py-3"><Etiqueta activo={c.activo} texto={c.activo ? "Activo" : "Inactivo"} /></td>
                  <td className="px-4 py-3">
                    <AccionesFila onEditar={() => editar(c)} onBorrar={() => borrar(c)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal titulo={editando ? "Editar club" : "Nuevo club"} abierto={abierto} onCerrar={() => setAbierto(false)}>
        <form onSubmit={guardar} className="space-y-4">
          <Campo label="Nombre" requerido>
            <Texto required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Club Depor Tegucigalpa" />
          </Campo>
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Abreviatura">
              <Texto value={form.abreviatura} maxLength={12} onChange={(e) => setForm({ ...form, abreviatura: e.target.value })} placeholder="CDT" />
            </Campo>
            <Campo label="Ciudad">
              <Selector value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })}>
                <option value="">Sin especificar</option>
                {CIUDADES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Selector>
            </Campo>
          </div>
          <Interruptor checked={form.activo} onChange={(v) => setForm({ ...form, activo: v })} label="Club activo" />
          <ErrorMsg mensaje={errForm} />
          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" variante="secundario" onClick={() => setAbierto(false)}>Cancelar</Boton>
            <Boton type="submit" disabled={guardando}>{guardando ? "Guardando…" : "Guardar"}</Boton>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export function Encabezado({
  titulo,
  cantidad,
  onNuevo,
  etiqueta,
}: {
  titulo: string;
  cantidad: number;
  onNuevo?: () => void;
  etiqueta?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{titulo}</h1>
        <p className="text-white/40 text-xs mt-0.5">{cantidad} registro{cantidad !== 1 ? "s" : ""}</p>
      </div>
      {onNuevo && (
        <Boton onClick={onNuevo} className="inline-flex items-center gap-1.5">
          <Plus size={15} /> {etiqueta ?? "Nuevo"}
        </Boton>
      )}
    </div>
  );
}

export function AccionesFila({ onEditar, onBorrar }: { onEditar: () => void; onBorrar: () => void }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button onClick={onEditar} title="Editar" className="p-1.5 rounded text-white/50 hover:text-accent hover:bg-white/5">
        <Pencil size={15} />
      </button>
      <button onClick={onBorrar} title="Eliminar" className="p-1.5 rounded text-white/50 hover:text-red-400 hover:bg-white/5">
        <Trash2 size={15} />
      </button>
    </div>
  );
}

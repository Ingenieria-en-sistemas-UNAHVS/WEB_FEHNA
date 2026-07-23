// Módulo Eventos — CRUD real (tabla public.eventos)
import { useState } from "react";
import { useCrud } from "../useCrud";
import { useCatalogos } from "../useCatalogos";
import {
  Boton,
  Campo,
  Etiqueta,
  ErrorMsg,
  Interruptor,
  Modal,
  Selector,
  Texto,
  AreaTexto,
  Vacio,
} from "../ui";
import { Encabezado, AccionesFila } from "./ClubesAdmin";

interface Evento {
  id: number;
  nombre: string;
  sede: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  descripcion: string | null;
  piscina_id: number;
  publicado: boolean;
  tipos_piscina?: { nombre: string } | null;
}

const vacio = {
  nombre: "",
  sede: "",
  fecha_inicio: "",
  fecha_fin: "",
  descripcion: "",
  piscina_id: "" as string,
  publicado: true,
};

function fmtFecha(f: string | null) {
  if (!f) return "—";
  return new Date(f + "T00:00:00").toLocaleDateString("es-HN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function EventosAdmin() {
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<Evento>(
    "eventos",
    { select: "id,nombre,sede,fecha_inicio,fecha_fin,descripcion,piscina_id,publicado,tipos_piscina(nombre)", orderBy: { column: "fecha_inicio", ascending: false } }
  );
  const { tiposPiscina } = useCatalogos();

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<Evento | null>(null);
  const [form, setForm] = useState(vacio);
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  function nuevo() {
    setEditando(null);
    setForm(vacio);
    setErrForm(null);
    setAbierto(true);
  }
  function editar(ev: Evento) {
    setEditando(ev);
    setForm({
      nombre: ev.nombre,
      sede: ev.sede ?? "",
      fecha_inicio: ev.fecha_inicio,
      fecha_fin: ev.fecha_fin ?? "",
      descripcion: ev.descripcion ?? "",
      piscina_id: String(ev.piscina_id),
      publicado: ev.publicado,
    });
    setErrForm(null);
    setAbierto(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.piscina_id) { setErrForm("Selecciona el tipo de piscina."); return; }
    setGuardando(true);
    setErrForm(null);
    const valores = {
      nombre: form.nombre.trim(),
      sede: form.sede.trim() || null,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin || null,
      descripcion: form.descripcion.trim() || null,
      piscina_id: Number(form.piscina_id),
      publicado: form.publicado,
    };
    const { error } = editando ? await actualizar(editando.id, valores) : await crear(valores);
    setGuardando(false);
    if (error) setErrForm(error);
    else setAbierto(false);
  }

  async function borrar(ev: Evento) {
    if (!confirm(`¿Eliminar el evento "${ev.nombre}"?`)) return;
    const { error } = await eliminar(ev.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado titulo="Eventos" cantidad={rows.length} onNuevo={nuevo} etiqueta="Nuevo evento" />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay eventos registrados. Crea el primero." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Evento</th>
                <th className="px-4 py-3">Sede</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Piscina</th>
                <th className="px-4 py-3">Publicado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((ev) => (
                <tr key={ev.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3 text-white font-medium">{ev.nombre}</td>
                  <td className="px-4 py-3 text-white/60">{ev.sede ?? "—"}</td>
                  <td className="px-4 py-3 text-white/60">{fmtFecha(ev.fecha_inicio)}</td>
                  <td className="px-4 py-3 text-white/60">{ev.tipos_piscina?.nombre ?? "—"}</td>
                  <td className="px-4 py-3"><Etiqueta activo={ev.publicado} texto={ev.publicado ? "Público" : "Oculto"} /></td>
                  <td className="px-4 py-3"><AccionesFila onEditar={() => editar(ev)} onBorrar={() => borrar(ev)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal titulo={editando ? "Editar evento" : "Nuevo evento"} abierto={abierto} onCerrar={() => setAbierto(false)}>
        <form onSubmit={guardar} className="space-y-4">
          <Campo label="Nombre del evento" requerido>
            <Texto required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Campeonato Nacional Juvenil" />
          </Campo>
          <Campo label="Sede">
            <Texto value={form.sede} onChange={(e) => setForm({ ...form, sede: e.target.value })} placeholder="Tegucigalpa" />
          </Campo>
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Fecha inicio" requerido>
              <Texto type="date" required value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })} />
            </Campo>
            <Campo label="Fecha fin">
              <Texto type="date" value={form.fecha_fin} onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })} />
            </Campo>
          </div>
          <Campo label="Tipo de piscina" requerido>
            <Selector value={form.piscina_id} onChange={(e) => setForm({ ...form, piscina_id: e.target.value })}>
              <option value="">Selecciona…</option>
              {tiposPiscina.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </Selector>
          </Campo>
          <Campo label="Descripción">
            <AreaTexto rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Detalles del evento…" />
          </Campo>
          <Interruptor checked={form.publicado} onChange={(v) => setForm({ ...form, publicado: v })} label="Visible en el sitio público" />
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

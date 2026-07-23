// Módulo Tiempos — CRUD real (tabla public.tiempos)
// Registra marcas ligando deportista + evento + prueba + categoría.
// El tiempo se ingresa como texto ("57.43" o "2:14.56") y se guarda en
// centésimas. edad_evento se calcula del nacimiento y la fecha del evento.
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/auth/AuthProvider";
import { useCrud } from "../useCrud";
import { useCatalogos } from "../useCatalogos";
import { calcularEdad, formatearTiempo, parsearTiempo } from "@/lib/tiempo";
import {
  Boton,
  Campo,
  ErrorMsg,
  Modal,
  Selector,
  Texto,
  Vacio,
} from "../ui";
import { Encabezado, AccionesFila } from "./ClubesAdmin";

interface TiempoRow {
  id: number;
  tiempo_final: number;
  posicion: number | null;
  deportista_id: number;
  evento_id: number;
  prueba_id: number;
  categoria_id: number;
  deportistas?: { nombres: string; apellidos: string } | null;
  eventos?: { nombre: string; fecha_inicio: string } | null;
  pruebas?: { distancia: number; estilos?: { nombre: string } | null } | null;
  categorias?: { nombre: string } | null;
}

interface DeportistaOpt { id: number; nombres: string; apellidos: string; fecha_nacimiento: string }
interface EventoOpt { id: number; nombre: string; fecha_inicio: string }

const vacio = {
  deportista_id: "",
  evento_id: "",
  prueba_id: "",
  categoria_id: "",
  tiempo_final: "",
  tiempo_siembra: "",
  posicion: "",
  puntos: "",
};

export default function TiemposAdmin() {
  const { perfil } = useAuth();
  const { pruebas, categorias } = useCatalogos();
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<TiempoRow>(
    "tiempos",
    {
      select:
        "id,tiempo_final,posicion,deportista_id,evento_id,prueba_id,categoria_id,deportistas(nombres,apellidos),eventos(nombre,fecha_inicio),pruebas(distancia,estilos(nombre)),categorias(nombre)",
      orderBy: { column: "id", ascending: false },
    }
  );

  const [deportistas, setDeportistas] = useState<DeportistaOpt[]>([]);
  const [eventos, setEventos] = useState<EventoOpt[]>([]);

  useEffect(() => {
    supabase.from("deportistas").select("id,nombres,apellidos,fecha_nacimiento").eq("activo", true).order("apellidos")
      .then(({ data }) => setDeportistas((data as DeportistaOpt[]) ?? []));
    supabase.from("eventos").select("id,nombre,fecha_inicio").order("fecha_inicio", { ascending: false })
      .then(({ data }) => setEventos((data as EventoOpt[]) ?? []));
  }, []);

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<TiempoRow | null>(null);
  const [form, setForm] = useState(vacio);
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  // Edad calculada al momento del evento (para guardar edad_evento)
  const dep = deportistas.find((d) => String(d.id) === form.deportista_id);
  const evt = eventos.find((e) => String(e.id) === form.evento_id);
  const edadEvento = dep && evt ? calcularEdad(dep.fecha_nacimiento, evt.fecha_inicio) : null;

  function nuevo() {
    setEditando(null);
    setForm(vacio);
    setErrForm(null);
    setAbierto(true);
  }
  function editar(t: TiempoRow) {
    setEditando(t);
    setForm({
      deportista_id: String(t.deportista_id),
      evento_id: String(t.evento_id),
      prueba_id: String(t.prueba_id),
      categoria_id: String(t.categoria_id),
      tiempo_final: formatearTiempo(t.tiempo_final),
      tiempo_siembra: "",
      posicion: t.posicion != null ? String(t.posicion) : "",
      puntos: "",
    });
    setErrForm(null);
    setAbierto(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.deportista_id || !form.evento_id || !form.prueba_id || !form.categoria_id) {
      setErrForm("Completa deportista, evento, prueba y categoría."); return;
    }
    const cent = parsearTiempo(form.tiempo_final);
    if (cent === null || cent <= 0) { setErrForm("Tiempo inválido. Usa formato 57.43 o 2:14.56."); return; }
    if (edadEvento === null) { setErrForm("No se pudo calcular la edad del deportista al evento."); return; }

    const siembra = form.tiempo_siembra ? parsearTiempo(form.tiempo_siembra) : null;

    setGuardando(true);
    setErrForm(null);
    const valores = {
      deportista_id: Number(form.deportista_id),
      evento_id: Number(form.evento_id),
      prueba_id: Number(form.prueba_id),
      categoria_id: Number(form.categoria_id),
      edad_evento: edadEvento,
      tiempo_final: cent,
      tiempo_siembra: siembra,
      posicion: form.posicion ? Number(form.posicion) : null,
      puntos: form.puntos ? Number(form.puntos) : null,
      registrado_por: perfil?.id ?? null,
    };
    const { error } = editando ? await actualizar(editando.id, valores) : await crear(valores);
    setGuardando(false);
    if (error) setErrForm(error);
    else setAbierto(false);
  }

  async function borrar(t: TiempoRow) {
    if (!confirm("¿Eliminar este registro de tiempo?")) return;
    const { error } = await eliminar(t.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado titulo="Tiempos" cantidad={rows.length} onNuevo={nuevo} etiqueta="Registrar tiempo" />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay tiempos registrados. Registra el primero." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Deportista</th>
                <th className="px-4 py-3">Prueba</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Tiempo</th>
                <th className="px-4 py-3">Pos.</th>
                <th className="px-4 py-3">Evento</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3 text-white font-medium">{t.deportistas ? `${t.deportistas.apellidos}, ${t.deportistas.nombres}` : "—"}</td>
                  <td className="px-4 py-3 text-white/60">{t.pruebas ? `${t.pruebas.distancia}m ${t.pruebas.estilos?.nombre ?? ""}` : "—"}</td>
                  <td className="px-4 py-3 text-white/60">{t.categorias?.nombre ?? "—"}</td>
                  <td className="px-4 py-3 text-accent font-bold tabular-nums" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{formatearTiempo(t.tiempo_final)}</td>
                  <td className="px-4 py-3 text-white/60">{t.posicion ?? "—"}</td>
                  <td className="px-4 py-3 text-white/50 text-xs">{t.eventos?.nombre ?? "—"}</td>
                  <td className="px-4 py-3"><AccionesFila onEditar={() => editar(t)} onBorrar={() => borrar(t)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal titulo={editando ? "Editar tiempo" : "Registrar tiempo"} abierto={abierto} onCerrar={() => setAbierto(false)}>
        <form onSubmit={guardar} className="space-y-4">
          <Campo label="Deportista" requerido>
            <Selector value={form.deportista_id} onChange={(e) => setForm({ ...form, deportista_id: e.target.value })}>
              <option value="">Selecciona…</option>
              {deportistas.map((d) => <option key={d.id} value={d.id}>{d.apellidos}, {d.nombres}</option>)}
            </Selector>
          </Campo>
          <Campo label="Evento" requerido>
            <Selector value={form.evento_id} onChange={(e) => setForm({ ...form, evento_id: e.target.value })}>
              <option value="">Selecciona…</option>
              {eventos.map((ev) => <option key={ev.id} value={ev.id}>{ev.nombre}</option>)}
            </Selector>
          </Campo>
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Prueba" requerido>
              <Selector value={form.prueba_id} onChange={(e) => setForm({ ...form, prueba_id: e.target.value })}>
                <option value="">Selecciona…</option>
                {pruebas.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </Selector>
            </Campo>
            <Campo label="Categoría" requerido>
              <Selector value={form.categoria_id} onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}>
                <option value="">Selecciona…</option>
                {categorias.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </Selector>
            </Campo>
          </div>
          {edadEvento !== null && (
            <p className="text-xs text-white/40">Edad al evento: <span className="text-accent">{edadEvento} años</span> (se guarda automáticamente)</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Tiempo final" requerido>
              <Texto value={form.tiempo_final} onChange={(e) => setForm({ ...form, tiempo_final: e.target.value })} placeholder="57.43 o 2:14.56" />
            </Campo>
            <Campo label="Tiempo de siembra">
              <Texto value={form.tiempo_siembra} onChange={(e) => setForm({ ...form, tiempo_siembra: e.target.value })} placeholder="opcional" />
            </Campo>
            <Campo label="Posición">
              <Texto type="number" min={1} value={form.posicion} onChange={(e) => setForm({ ...form, posicion: e.target.value })} placeholder="opcional" />
            </Campo>
            <Campo label="Puntos">
              <Texto type="number" min={0} value={form.puntos} onChange={(e) => setForm({ ...form, puntos: e.target.value })} placeholder="opcional" />
            </Campo>
          </div>
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

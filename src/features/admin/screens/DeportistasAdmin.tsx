// Módulo Deportistas — CRUD real (tabla public.deportistas)
import { useState } from "react";
import { useCrud } from "../useCrud";
import { useCatalogos } from "../useCatalogos";
import { calcularEdad } from "@/lib/tiempo";
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

interface Deportista {
  id: number;
  nombres: string;
  apellidos: string;
  sexo: "F" | "M";
  fecha_nacimiento: string;
  club_id: number | null;
  activo: boolean;
  clubes?: { nombre: string } | null;
}

const vacio = {
  nombres: "",
  apellidos: "",
  sexo: "F" as "F" | "M",
  fecha_nacimiento: "",
  club_id: "" as string,
  activo: true,
};

export default function DeportistasAdmin() {
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<Deportista>(
    "deportistas",
    { select: "id,nombres,apellidos,sexo,fecha_nacimiento,club_id,activo,clubes(nombre)", orderBy: { column: "apellidos" } }
  );
  const { clubes } = useCatalogos();

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<Deportista | null>(null);
  const [form, setForm] = useState(vacio);
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  function nuevo() {
    setEditando(null);
    setForm(vacio);
    setErrForm(null);
    setAbierto(true);
  }
  function editar(d: Deportista) {
    setEditando(d);
    setForm({
      nombres: d.nombres,
      apellidos: d.apellidos,
      sexo: d.sexo,
      fecha_nacimiento: d.fecha_nacimiento,
      club_id: d.club_id ? String(d.club_id) : "",
      activo: d.activo,
    });
    setErrForm(null);
    setAbierto(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setErrForm(null);
    const valores = {
      nombres: form.nombres.trim(),
      apellidos: form.apellidos.trim(),
      sexo: form.sexo,
      fecha_nacimiento: form.fecha_nacimiento,
      club_id: form.club_id ? Number(form.club_id) : null,
      activo: form.activo,
    };
    const { error } = editando ? await actualizar(editando.id, valores) : await crear(valores);
    setGuardando(false);
    if (error) setErrForm(error);
    else setAbierto(false);
  }

  async function borrar(d: Deportista) {
    if (!confirm(`¿Eliminar a ${d.nombres} ${d.apellidos}?`)) return;
    const { error } = await eliminar(d.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado titulo="Deportistas" cantidad={rows.length} onNuevo={nuevo} etiqueta="Nuevo deportista" />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay deportistas registrados. Crea el primero." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Sexo</th>
                <th className="px-4 py-3">Edad</th>
                <th className="px-4 py-3">Club</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3 text-white font-medium">{d.apellidos}, {d.nombres}</td>
                  <td className="px-4 py-3 text-white/60">{d.sexo === "F" ? "Femenino" : "Masculino"}</td>
                  <td className="px-4 py-3 text-white/60">{calcularEdad(d.fecha_nacimiento)}</td>
                  <td className="px-4 py-3 text-white/60">{d.clubes?.nombre ?? "Sin club"}</td>
                  <td className="px-4 py-3"><Etiqueta activo={d.activo} texto={d.activo ? "Activo" : "Inactivo"} /></td>
                  <td className="px-4 py-3"><AccionesFila onEditar={() => editar(d)} onBorrar={() => borrar(d)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal titulo={editando ? "Editar deportista" : "Nuevo deportista"} abierto={abierto} onCerrar={() => setAbierto(false)}>
        <form onSubmit={guardar} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Nombres" requerido>
              <Texto required value={form.nombres} onChange={(e) => setForm({ ...form, nombres: e.target.value })} placeholder="Karla" />
            </Campo>
            <Campo label="Apellidos" requerido>
              <Texto required value={form.apellidos} onChange={(e) => setForm({ ...form, apellidos: e.target.value })} placeholder="Mendoza" />
            </Campo>
            <Campo label="Sexo" requerido>
              <Selector value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value as "F" | "M" })}>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </Selector>
            </Campo>
            <Campo label="Fecha de nacimiento" requerido>
              <Texto type="date" required value={form.fecha_nacimiento} onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })} />
            </Campo>
          </div>
          <Campo label="Club">
            <Selector value={form.club_id} onChange={(e) => setForm({ ...form, club_id: e.target.value })}>
              <option value="">Sin club</option>
              {clubes.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </Selector>
          </Campo>
          <Interruptor checked={form.activo} onChange={(v) => setForm({ ...form, activo: v })} label="Deportista activo" />
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

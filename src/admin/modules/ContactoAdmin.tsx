// =====================================================================
// Módulo Contáctanos (FEHNA) — administra el contenido de la sección
// pública "Contáctanos": redes sociales (tabla redes_sociales, catálogo
// fijo de 8 redes) e información de contacto (tabla informacion_contacto,
// lista libre que el admin arma). Solo admin puede escribir (RLS).
// =====================================================================
import { useState } from "react";
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
  AreaTexto,
  Vacio,
} from "../ui";
import { Encabezado, AccionesFila } from "./ClubesAdmin";
import {
  REDES_SOCIALES_INFO,
  ICONOS_CONTACTO_INFO,
  ICONO_CONTACTO_DEFECTO,
  iconoContacto,
} from "@/lib/contactoIconos";

type RedSocial = Tables<"redes_sociales">;
type ItemContacto = Tables<"informacion_contacto">;

const TABS = [
  { id: "redes", label: "Redes Sociales" },
  { id: "info", label: "Información de Contacto" },
] as const;

export default function ContactoAdmin() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("redes");

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-3xl font-black text-white uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Contáctanos
        </h1>
        <p className="text-white/40 text-xs mt-0.5">Contenido de la sección pública "Contáctanos"</p>
      </div>

      <div className="flex gap-2 mb-8 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? "border-accent text-accent"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "redes" ? <RedesSocialesTab /> : <InformacionContactoTab />}
    </div>
  );
}

// =====================================================================
// Redes sociales — catálogo fijo de 8 filas (una por red). El admin solo
// edita link, visibilidad y orden; no crea ni elimina filas.
// =====================================================================
function RedesSocialesTab() {
  const { rows, loading, error, actualizar } = useCrud<RedSocial>("redes_sociales", {
    orderBy: { column: "orden" },
  });
  const [borradores, setBorradores] = useState<Record<number, string>>({});
  const [guardandoId, setGuardandoId] = useState<number | null>(null);

  function urlActual(r: RedSocial) {
    return borradores[r.id] ?? r.url;
  }

  async function guardarUrl(r: RedSocial) {
    setGuardandoId(r.id);
    const { error } = await actualizar(r.id, { url: urlActual(r).trim() });
    setGuardandoId(null);
    if (error) alert("No se pudo guardar: " + error);
    else setBorradores((b) => { const c = { ...b }; delete c[r.id]; return c; });
  }

  async function toggleVisible(r: RedSocial) {
    const { error } = await actualizar(r.id, { visible: !r.visible });
    if (error) alert("No se pudo actualizar: " + error);
  }

  return (
    <div>
      <p className="text-white/40 text-xs mb-4">
        Elige qué redes se muestran en el home y edita el link de cada una. Estas 8 redes son fijas.
      </p>
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Red</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">En el home</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const info = REDES_SOCIALES_INFO[r.red];
                const Icon = info.Icon;
                const sucio = borradores[r.id] !== undefined && borradores[r.id] !== r.url;
                return (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-secondary/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-white font-medium whitespace-nowrap">
                        <Icon size={16} className="text-accent shrink-0" /> {info.label}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Texto
                        value={urlActual(r)}
                        onChange={(e) =>
                          setBorradores((b) => ({ ...b, [r.id]: e.target.value }))
                        }
                        placeholder="https://…"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Interruptor
                        checked={r.visible}
                        onChange={() => toggleVisible(r)}
                        label={r.visible ? "Visible" : "Oculto"}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Boton
                        onClick={() => guardarUrl(r)}
                        disabled={guardandoId === r.id || !sucio}
                      >
                        {guardandoId === r.id ? "Guardando…" : "Guardar"}
                      </Boton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// Información de contacto — lista libre (CRUD completo).
// =====================================================================
const vacioItem = {
  icono: ICONO_CONTACTO_DEFECTO,
  titulo: "",
  descripcion: "",
  visible: true,
  orden: 0,
};

function InformacionContactoTab() {
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<ItemContacto>(
    "informacion_contacto",
    { orderBy: { column: "orden" } }
  );

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<ItemContacto | null>(null);
  const [form, setForm] = useState(vacioItem);
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  function nuevo() {
    setEditando(null);
    setForm({ ...vacioItem, orden: rows.length });
    setErrForm(null);
    setAbierto(true);
  }

  function editar(item: ItemContacto) {
    setEditando(item);
    setForm({
      icono: item.icono,
      titulo: item.titulo,
      descripcion: item.descripcion,
      visible: item.visible,
      orden: item.orden,
    });
    setErrForm(null);
    setAbierto(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setErrForm(null);
    const valores: Record<string, unknown> = {
      icono: form.icono,
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      visible: form.visible,
      orden: form.orden,
    };
    const { error } = editando ? await actualizar(editando.id, valores) : await crear(valores);
    setGuardando(false);
    if (error) setErrForm(error);
    else setAbierto(false);
  }

  async function borrar(item: ItemContacto) {
    if (!confirm(`¿Eliminar "${item.titulo}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await eliminar(item.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado
        titulo="Información de Contacto"
        cantidad={rows.length}
        onNuevo={nuevo}
        etiqueta="Nuevo item"
      />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay información de contacto. Crea el primer item." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Ícono</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const Icon = iconoContacto(item.icono);
                return (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-secondary/40">
                    <td className="px-4 py-3">
                      <Icon size={16} className="text-accent" />
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{item.titulo}</td>
                    <td className="px-4 py-3 text-white/60 max-w-xs truncate">{item.descripcion}</td>
                    <td className="px-4 py-3">
                      <Etiqueta activo={item.visible} texto={item.visible ? "Visible" : "Oculto"} />
                    </td>
                    <td className="px-4 py-3">
                      <AccionesFila onEditar={() => editar(item)} onBorrar={() => borrar(item)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        titulo={editando ? "Editar item" : "Nuevo item de contacto"}
        abierto={abierto}
        onCerrar={() => setAbierto(false)}
      >
        <form onSubmit={guardar} className="space-y-4">
          <Campo label="Ícono" requerido>
            <Selector value={form.icono} onChange={(e) => setForm({ ...form, icono: e.target.value })}>
              {Object.entries(ICONOS_CONTACTO_INFO).map(([clave, { label }]) => (
                <option key={clave} value={clave}>
                  {label}
                </option>
              ))}
            </Selector>
          </Campo>
          <Campo label="Título" requerido>
            <Texto
              required
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Teléfono"
            />
          </Campo>
          <Campo label="Descripción / dato" requerido>
            <AreaTexto
              rows={2}
              required
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="+504 2235-0184"
            />
          </Campo>
          <Campo label="Orden">
            <Texto
              type="number"
              value={form.orden}
              onChange={(e) => setForm({ ...form, orden: Number(e.target.value) || 0 })}
            />
          </Campo>
          <Interruptor
            checked={form.visible}
            onChange={(v) => setForm({ ...form, visible: v })}
            label="Visible en el sitio"
          />
          <ErrorMsg mensaje={errForm} />
          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" variante="secundario" onClick={() => setAbierto(false)}>
              Cancelar
            </Boton>
            <Boton type="submit" disabled={guardando}>
              {guardando ? "Guardando…" : "Guardar"}
            </Boton>
          </div>
        </form>
      </Modal>
    </div>
  );
}

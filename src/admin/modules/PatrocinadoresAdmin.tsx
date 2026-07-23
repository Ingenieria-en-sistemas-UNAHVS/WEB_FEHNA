// Módulo Patrocinadores — CRUD real (tabla public.patrocinadores). Solo admin.
import { useEffect, useState } from "react";
import type { Tables } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { useCrud } from "../useCrud";
import {
  Boton,
  Campo,
  Etiqueta,
  ErrorMsg,
  Interruptor,
  Modal,
  Texto,
  Vacio,
} from "../ui";
import { Encabezado, AccionesFila } from "./ClubesAdmin";

type Patrocinador = Tables<"patrocinadores">;

const BUCKET_LOGOS = "patrocinadores";
const TIPOS_ACEPTADOS = "image/png,image/jpeg,image/webp,image/avif";

const vacio = {
  nombre: "",
  logo_url: "",
  orden: 0,
  visible: true,
};

const SECCION = "patrocinadores";

// Interruptor global e independiente de cada patrocinador: permite
// ocultar TODO el carrusel de la página principal sin tener que marcar
// cada patrocinador como oculto uno por uno (tabla configuracion_secciones).
function useSeccionCompleta() {
  const [visible, setVisible] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ok = true;
    supabase
      .from("configuracion_secciones")
      .select("visible")
      .eq("seccion", SECCION)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!ok) return;
        if (error) setError(error.message);
        else if (data) setVisible(data.visible);
        setCargando(false);
      });
    return () => {
      ok = false;
    };
  }, []);

  async function cambiar(v: boolean) {
    const anterior = visible;
    setVisible(v);
    setGuardando(true);
    setError(null);
    const { error } = await supabase
      .from("configuracion_secciones")
      .update({ visible: v })
      .eq("seccion", SECCION);
    if (error) {
      setError(error.message);
      setVisible(anterior);
    }
    setGuardando(false);
  }

  return { visible, cargando, guardando, error, cambiar };
}

export default function PatrocinadoresAdmin() {
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<Patrocinador>(
    "patrocinadores",
    { orderBy: { column: "orden", ascending: true } }
  );

  const {
    visible: seccionVisible,
    cargando: cargandoSeccion,
    error: errorSeccion,
    cambiar: cambiarSeccionVisible,
  } = useSeccionCompleta();

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<Patrocinador | null>(null);
  const [form, setForm] = useState(vacio);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  function nuevo() {
    setEditando(null);
    setForm({
      ...vacio,
      orden: rows.length ? Math.max(...rows.map((r) => r.orden)) + 1 : 0,
    });
    setArchivo(null);
    setErrForm(null);
    setAbierto(true);
  }

  function editar(p: Patrocinador) {
    setEditando(p);
    setForm({
      nombre: p.nombre,
      logo_url: p.logo_url,
      orden: p.orden,
      visible: p.visible,
    });
    setArchivo(null);
    setErrForm(null);
    setAbierto(true);
  }

  async function subirLogo(file: File): Promise<string> {
    const extension = file.name.split(".").pop() ?? "png";
    const ruta = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(BUCKET_LOGOS).upload(ruta, file);
    if (error) throw new Error(`No se pudo subir el logo: ${error.message}`);
    const { data } = supabase.storage.from(BUCKET_LOGOS).getPublicUrl(ruta);
    return data.publicUrl;
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setErrForm(null);

    if (!editando && !archivo) {
      setErrForm("Selecciona una imagen de logo.");
      return;
    }

    setGuardando(true);
    try {
      let logoUrl = form.logo_url;
      if (archivo) {
        setSubiendo(true);
        logoUrl = await subirLogo(archivo);
        setSubiendo(false);
      }

      const valores = {
        nombre: form.nombre.trim(),
        logo_url: logoUrl,
        orden: Number(form.orden) || 0,
        visible: form.visible,
      };

      const { error } = editando
        ? await actualizar(editando.id, valores)
        : await crear(valores);

      if (error) setErrForm(error);
      else setAbierto(false);
    } catch (err) {
      setErrForm(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setGuardando(false);
      setSubiendo(false);
    }
  }

  async function borrar(p: Patrocinador) {
    if (!confirm(`¿Eliminar al patrocinador "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await eliminar(p.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado titulo="Patrocinadores" cantidad={rows.length} onNuevo={nuevo} etiqueta="Nuevo patrocinador" />

      <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-card p-4">
        <div>
          <p className="text-sm font-medium text-white">Sección de patrocinadores en la página principal</p>
          <p className="mt-0.5 text-xs text-white/40">
            Si la desactivas, el carrusel completo se oculta del sitio público sin borrar ni desmarcar cada patrocinador.
          </p>
        </div>
        {cargandoSeccion ? (
          <span className="text-xs text-white/30 shrink-0">Cargando…</span>
        ) : (
          <div className="shrink-0">
            <Interruptor
              checked={seccionVisible}
              onChange={cambiarSeccionVisible}
              label={seccionVisible ? "Sección visible" : "Sección oculta"}
            />
          </div>
        )}
      </div>
      <ErrorMsg mensaje={errorSeccion} />

      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay patrocinadores. Crea el primero." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Orden</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <img
                      src={p.logo_url}
                      alt={p.nombre}
                      className="h-10 w-16 object-contain bg-white/5 rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{p.nombre}</td>
                  <td className="px-4 py-3 text-white/60">{p.orden}</td>
                  <td className="px-4 py-3">
                    <Etiqueta activo={p.visible} texto={p.visible ? "Visible" : "Oculto"} />
                  </td>
                  <td className="px-4 py-3">
                    <AccionesFila onEditar={() => editar(p)} onBorrar={() => borrar(p)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal titulo={editando ? "Editar patrocinador" : "Nuevo patrocinador"} abierto={abierto} onCerrar={() => setAbierto(false)}>
        <form onSubmit={guardar} className="space-y-4">
          <Campo label="Nombre" requerido>
            <Texto
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Banco Atlántida"
            />
          </Campo>

          <Campo label="Logo" requerido={!editando}>
            <input
              type="file"
              accept={TIPOS_ACEPTADOS}
              onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-white/70 file:mr-3 file:px-3 file:py-2 file:rounded file:border-0 file:bg-accent file:text-[#061529] file:text-sm file:font-semibold"
            />
            {editando?.logo_url && !archivo && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={editando.logo_url}
                  alt={editando.nombre}
                  className="h-10 w-16 object-contain bg-white/5 rounded"
                />
                <span className="text-xs text-white/40">
                  Logo actual (sube uno nuevo para reemplazarlo)
                </span>
              </div>
            )}
          </Campo>

          <Campo label="Orden en el carrusel">
            <Texto
              type="number"
              value={form.orden}
              onChange={(e) => setForm({ ...form, orden: Number(e.target.value) })}
            />
          </Campo>

          <Interruptor
            checked={form.visible}
            onChange={(v) => setForm({ ...form, visible: v })}
            label="Visible en la página principal"
          />

          <ErrorMsg mensaje={errForm} />
          <div className="flex justify-end gap-3 pt-2">
            <Boton type="button" variante="secundario" onClick={() => setAbierto(false)}>
              Cancelar
            </Boton>
            <Boton type="submit" disabled={guardando}>
              {subiendo ? "Subiendo logo…" : guardando ? "Guardando…" : "Guardar"}
            </Boton>
          </div>
        </form>
      </Modal>
    </div>
  );
}

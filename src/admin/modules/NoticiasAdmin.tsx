// Módulo Noticias — CRUD real (tabla public.noticias). Solo admin.
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
  Texto,
  AreaTexto,
  Vacio,
} from "../ui";
import { Encabezado, AccionesFila } from "./ClubesAdmin";

type Noticia = Tables<"noticias">;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

const vacio = {
  titulo: "",
  slug: "",
  resumen: "",
  contenido: "",
  imagen_portada: "",
  publicada: false,
};

export default function NoticiasAdmin() {
  const { rows, loading, error, crear, actualizar, eliminar } = useCrud<Noticia>(
    "noticias",
    { orderBy: { column: "creada_en", ascending: false } }
  );

  const [abierto, setAbierto] = useState(false);
  const [editando, setEditando] = useState<Noticia | null>(null);
  const [form, setForm] = useState(vacio);
  const [slugManual, setSlugManual] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errForm, setErrForm] = useState<string | null>(null);

  function nuevo() {
    setEditando(null);
    setForm(vacio);
    setSlugManual(false);
    setErrForm(null);
    setAbierto(true);
  }
  function editar(n: Noticia) {
    setEditando(n);
    setForm({
      titulo: n.titulo,
      slug: n.slug,
      resumen: n.resumen ?? "",
      contenido: n.contenido,
      imagen_portada: n.imagen_portada ?? "",
      publicada: n.publicada,
    });
    setSlugManual(true);
    setErrForm(null);
    setAbierto(true);
  }

  function cambiarTitulo(v: string) {
    setForm((f) => ({ ...f, titulo: v, slug: slugManual ? f.slug : slugify(v) }));
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setErrForm(null);
    const valores: Record<string, unknown> = {
      titulo: form.titulo.trim(),
      slug: (form.slug || slugify(form.titulo)).trim(),
      resumen: form.resumen.trim() || null,
      contenido: form.contenido,
      imagen_portada: form.imagen_portada.trim() || null,
      publicada: form.publicada,
    };
    // Al publicar por primera vez, fija la fecha de publicación
    if (form.publicada && (!editando || !editando.fecha_publicacion)) {
      valores.fecha_publicacion = new Date().toISOString();
    }
    const { error } = editando ? await actualizar(editando.id, valores) : await crear(valores);
    setGuardando(false);
    if (error) setErrForm(error);
    else setAbierto(false);
  }

  async function borrar(n: Noticia) {
    if (!confirm(`¿Eliminar la noticia "${n.titulo}"?`)) return;
    const { error } = await eliminar(n.id);
    if (error) alert("No se pudo eliminar: " + error);
  }

  return (
    <div>
      <Encabezado titulo="Noticias" cantidad={rows.length} onNuevo={nuevo} etiqueta="Nueva noticia" />
      <ErrorMsg mensaje={error} />

      {loading ? (
        <Vacio mensaje="Cargando…" />
      ) : rows.length === 0 ? (
        <Vacio mensaje="No hay noticias. Crea la primera." />
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-secondary border-b border-white/10 text-left text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((n) => (
                <tr key={n.id} className="border-b border-white/5 hover:bg-secondary/40">
                  <td className="px-4 py-3 text-white font-medium">{n.titulo}</td>
                  <td className="px-4 py-3"><Etiqueta activo={n.publicada} texto={n.publicada ? "Publicada" : "Borrador"} /></td>
                  <td className="px-4 py-3"><AccionesFila onEditar={() => editar(n)} onBorrar={() => borrar(n)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal titulo={editando ? "Editar noticia" : "Nueva noticia"} abierto={abierto} onCerrar={() => setAbierto(false)}>
        <form onSubmit={guardar} className="space-y-4">
          <Campo label="Título" requerido>
            <Texto required value={form.titulo} onChange={(e) => cambiarTitulo(e.target.value)} placeholder="Honduras domina en los Juegos…" />
          </Campo>
          <Campo label="Slug (URL)" requerido>
            <Texto required value={form.slug} onChange={(e) => { setSlugManual(true); setForm({ ...form, slug: e.target.value }); }} placeholder="honduras-domina-juegos" />
          </Campo>
          <Campo label="Resumen">
            <AreaTexto rows={2} value={form.resumen} onChange={(e) => setForm({ ...form, resumen: e.target.value })} placeholder="Frase corta que aparece en la portada…" />
          </Campo>
          <Campo label="Contenido" requerido>
            <AreaTexto rows={6} required value={form.contenido} onChange={(e) => setForm({ ...form, contenido: e.target.value })} placeholder="Cuerpo de la noticia…" />
          </Campo>
          <Campo label="URL de imagen de portada">
            <Texto value={form.imagen_portada} onChange={(e) => setForm({ ...form, imagen_portada: e.target.value })} placeholder="https://…" />
          </Campo>
          <Interruptor checked={form.publicada} onChange={(v) => setForm({ ...form, publicada: v })} label="Publicada en el sitio" />
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

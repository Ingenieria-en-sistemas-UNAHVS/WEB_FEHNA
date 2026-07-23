// =====================================================================
// mediaService (FEHNA) — núcleo reutilizable para subir, listar, ordenar
// y eliminar medios en Supabase Storage + tabla `medios`.
// ---------------------------------------------------------------------
// Seguridad:
//  - Valida mime type y tamaño en cliente (el bucket lo re-valida en el
//    servidor).
//  - Genera el nombre del archivo con crypto.randomUUID() y extensión
//    derivada del mime type -> evita path traversal y colisiones; nunca
//    confía en el filename original.
//  - Las políticas RLS/Storage garantizan que solo admin/digitador puede
//    escribir; la validación de cliente es solo UX.
// =====================================================================
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";
import {
  MEDIA_CONFIG,
  BUCKET_PRIVADO,
  EXT_POR_MIME,
  type Modulo,
} from "@/lib/mediaConfig";

/** Fila de `medios` + una `url` lista para usar (se agrega al leer). */
export type Medio = Tables<"medios"> & { url?: string };

export interface SubirOpciones {
  modulo: Modulo;
  /** id de la noticia/evento/deportista/etc. Null para branding global. */
  entidadId?: number | null;
  file: File;
  /** Marca este archivo como portada / foto de perfil de la entidad. */
  esPortada?: boolean;
  /** false => se sube al bucket privado y se lee con URL firmada. Default: true. */
  esPublico?: boolean;
  titulo?: string;
  descripcion?: string;
  orden?: number;
}

export class MediaError extends Error {}

/** Valida un archivo contra la config del módulo. Lanza MediaError si no cumple. */
export function validarArchivo(modulo: Modulo, file: File): void {
  const cfg = MEDIA_CONFIG[modulo];
  if (!cfg) throw new MediaError(`Módulo desconocido: ${modulo}`);
  if (!cfg.accept.includes(file.type)) {
    throw new MediaError(
      `Tipo de archivo no permitido (${file.type || "desconocido"}). Permitidos: ${cfg.accept.join(", ")}`,
    );
  }
  if (file.size > cfg.maxBytes) {
    const mb = (cfg.maxBytes / (1024 * 1024)).toFixed(0);
    throw new MediaError(`El archivo supera el límite de ${mb} MB.`);
  }
  if (file.size === 0) throw new MediaError("El archivo está vacío.");
}

/** Lee ancho/alto si es imagen (mejor esfuerzo; no bloquea si falla). */
async function medirImagen(file: File): Promise<{ ancho?: number; alto?: number }> {
  if (!file.type.startsWith("image/")) return {};
  try {
    const bitmap = await createImageBitmap(file);
    const r = { ancho: bitmap.width, alto: bitmap.height };
    bitmap.close?.();
    return r;
  } catch {
    return {};
  }
}

/** Sube un archivo y registra la fila en `medios`. Devuelve el Medio (con url). */
export async function subirMedio(opts: SubirOpciones): Promise<Medio> {
  const { modulo, entidadId = null, file } = opts;
  const esPublico = opts.esPublico ?? true;
  const cfg = MEDIA_CONFIG[modulo];

  validarArchivo(modulo, file);

  const bucket = esPublico ? cfg.bucket : BUCKET_PRIVADO;
  const ext = EXT_POR_MIME[file.type] ?? "bin";
  // ruta: <modulo>/<entidad|global>/<uuid>.<ext>  -> segura y única
  const carpetaEntidad = entidadId != null ? String(entidadId) : "global";
  const path = `${modulo}/${carpetaEntidad}/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) throw new MediaError(`Error al subir: ${upErr.message}`);

  const { ancho, alto } = await medirImagen(file);
  const { data: usuario } = await supabase.auth.getUser();

  const { data, error: dbErr } = await supabase
    .from("medios")
    .insert({
      modulo,
      entidad_id: entidadId,
      bucket,
      path,
      tipo: cfg.tipo,
      mime_type: file.type,
      tamano_bytes: file.size,
      ancho: ancho ?? null,
      alto: alto ?? null,
      titulo: opts.titulo ?? file.name,
      descripcion: opts.descripcion ?? null,
      es_portada: opts.esPortada ?? false,
      es_publico: esPublico,
      orden: opts.orden ?? 0,
      subido_por: usuario?.user?.id ?? null,
    })
    .select()
    .single();

  if (dbErr) {
    // rollback del archivo si falla el registro
    await supabase.storage.from(bucket).remove([path]);
    throw new MediaError(`Error al registrar el medio: ${dbErr.message}`);
  }

  return { ...(data as Medio), url: await obtenerUrl(data as Medio) };
}

/** Sube varios archivos en serie, respetando el orden recibido. */
export async function subirVarios(
  base: Omit<SubirOpciones, "file" | "orden">,
  files: File[],
  onProgress?: (hechos: number, total: number) => void,
): Promise<Medio[]> {
  const res: Medio[] = [];
  for (let i = 0; i < files.length; i++) {
    res.push(await subirMedio({ ...base, file: files[i], orden: i }));
    onProgress?.(i + 1, files.length);
  }
  return res;
}

/** Devuelve una URL utilizable: pública directa o firmada (privado, 1h). */
export async function obtenerUrl(medio: Medio, expiraSeg = 3600): Promise<string> {
  if (medio.es_publico) {
    return supabase.storage.from(medio.bucket).getPublicUrl(medio.path).data.publicUrl;
  }
  const { data, error } = await supabase.storage
    .from(medio.bucket)
    .createSignedUrl(medio.path, expiraSeg);
  if (error) throw new MediaError(`No se pudo firmar la URL: ${error.message}`);
  return data.signedUrl;
}

/** Lista los medios de una entidad (o del módulo global) ordenados. */
export async function listarMedios(params: {
  modulo: Modulo;
  entidadId?: number | null;
}): Promise<Medio[]> {
  let q = supabase
    .from("medios")
    .select("*")
    .eq("modulo", params.modulo)
    .order("es_portada", { ascending: false })
    .order("orden", { ascending: true })
    .order("creado_en", { ascending: true });

  q = params.entidadId != null ? q.eq("entidad_id", params.entidadId) : q.is("entidad_id", null);

  const { data, error } = await q;
  if (error) throw new MediaError(error.message);

  const medios = (data ?? []) as Medio[];
  return Promise.all(medios.map(async (m) => ({ ...m, url: await obtenerUrl(m) })));
}

/** Devuelve la portada/foto de perfil de una entidad (o null). */
export async function obtenerPortada(
  modulo: Modulo,
  entidadId: number,
): Promise<Medio | null> {
  const { data, error } = await supabase
    .from("medios")
    .select("*")
    .eq("modulo", modulo)
    .eq("entidad_id", entidadId)
    .eq("es_portada", true)
    .maybeSingle();
  if (error) throw new MediaError(error.message);
  if (!data) return null;
  const m = data as Medio;
  return { ...m, url: await obtenerUrl(m) };
}

/** Elimina un medio: primero del Storage y luego de la tabla. */
export async function eliminarMedio(
  medio: Pick<Medio, "id" | "bucket" | "path">,
): Promise<void> {
  const { error: sErr } = await supabase.storage.from(medio.bucket).remove([medio.path]);
  if (sErr) throw new MediaError(`Error al borrar el archivo: ${sErr.message}`);
  const { error: dErr } = await supabase.from("medios").delete().eq("id", medio.id);
  if (dErr) throw new MediaError(`Error al borrar el registro: ${dErr.message}`);
}

/** Elimina TODOS los medios de una entidad (llamar antes de borrar la entidad padre). */
export async function eliminarMediosDeEntidad(
  modulo: Modulo,
  entidadId: number,
): Promise<void> {
  const medios = await listarMedios({ modulo, entidadId });
  for (const m of medios) await eliminarMedio(m);
}

/** Marca un medio como portada (el índice único garantiza que solo haya una). */
export async function marcarPortada(
  modulo: Modulo,
  entidadId: number,
  medioId: number,
): Promise<void> {
  // 1) quitar portada actual  2) asignar la nueva
  await supabase
    .from("medios")
    .update({ es_portada: false })
    .eq("modulo", modulo)
    .eq("entidad_id", entidadId)
    .eq("es_portada", true);
  const { error } = await supabase
    .from("medios")
    .update({ es_portada: true })
    .eq("id", medioId);
  if (error) throw new MediaError(error.message);
}

/** Reordena una galería: recibe los ids en el orden deseado. */
export async function reordenar(ids: number[]): Promise<void> {
  await Promise.all(
    ids.map((id, i) => supabase.from("medios").update({ orden: i }).eq("id", id)),
  );
}

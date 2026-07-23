// =====================================================================
// MediaUploader (FEHNA) — componente reutilizable de subida de medios.
// ---------------------------------------------------------------------
// Sirve para TODOS los módulos (patrocinadores, noticias, eventos,
// deportistas, clubes, documentos, resultados). Cambia el comportamiento
// solo con props. Estilizado con el tema oscuro del panel admin.
//
// Uso:
//   <MediaUploader modulo="deportistas" entidadId={deportistaId} />
//   <MediaUploader modulo="patrocinadores" entidadId={id} multiple={false} />
//   <MediaUploader modulo="documentos" />   // branding global
// =====================================================================
import { useRef, useState } from "react";
import { UploadCloud, Star, Trash2, FileText, Lock } from "lucide-react";
import { useMedios } from "@/lib/useMedios";
import { MEDIA_CONFIG, type Modulo } from "@/lib/mediaConfig";
import type { Medio } from "@/lib/mediaService";
import { ErrorMsg, Interruptor } from "@/admin/ui";

interface Props {
  modulo: Modulo;
  /** id de la entidad (noticia, evento, deportista...). Omitir para branding global. */
  entidadId?: number | null;
  /** Permitir varias imágenes. Default: valor del módulo. */
  multiple?: boolean;
  /** Mostrar el selector de portada / foto de perfil. Default: true. */
  permitirPortada?: boolean;
  /** Mostrar el toggle público/privado. Default: true (arranca en público). */
  permitirPrivado?: boolean;
  titulo?: string;
}

export default function MediaUploader({
  modulo,
  entidadId = null,
  multiple,
  permitirPortada = true,
  permitirPrivado = true,
  titulo,
}: Props) {
  const cfg = MEDIA_CONFIG[modulo];
  const permitirMultiple = multiple ?? cfg.multiplePorDefecto;

  const { medios, cargando, subiendo, progreso, error, subir, eliminar, setPortada } =
    useMedios({ modulo, entidadId });

  const inputRef = useRef<HTMLInputElement>(null);
  const [esPublico, setEsPublico] = useState(true);
  const [arrastrando, setArrastrando] = useState(false);
  const [errLocal, setErrLocal] = useState<string | null>(null);

  const maxMB = (cfg.maxBytes / (1024 * 1024)).toFixed(0);

  async function manejarArchivos(lista: FileList | null) {
    if (!lista || lista.length === 0) return;
    setErrLocal(null);
    const files = Array.from(lista).slice(0, permitirMultiple ? undefined : 1);
    try {
      await subir(files, { esPublico });
    } catch (e) {
      setErrLocal(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <section className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
          {titulo ?? cfg.label}
        </h3>
        {permitirPrivado && (
          <Interruptor
            checked={!esPublico}
            onChange={(v) => setEsPublico(!v)}
            label="Privado"
          />
        )}
      </div>

      {/* Zona de arrastre */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setArrastrando(true);
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastrando(false);
          manejarArchivos(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          arrastrando ? "border-accent bg-accent/5" : "border-white/15 hover:border-white/30"
        }`}
      >
        <UploadCloud size={24} className="text-white/40" />
        <p className="text-sm text-white/70">
          Arrastra {permitirMultiple ? "archivos" : "un archivo"} o haz clic para seleccionar
        </p>
        <p className="text-xs text-white/30">
          {cfg.accept.map((m) => m.split("/")[1]).join(", ")} · máx {maxMB} MB
        </p>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={permitirMultiple}
          accept={cfg.accept.join(",")}
          onChange={(e) => manejarArchivos(e.target.files)}
        />
      </div>

      {subiendo && progreso && (
        <p className="text-xs text-accent">
          Subiendo {progreso.hechos}/{progreso.total}...
        </p>
      )}
      <ErrorMsg mensaje={errLocal ?? error} />
      {cargando && <p className="text-xs text-white/30">Cargando...</p>}

      {/* Galería */}
      {medios.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {medios.map((m) => (
            <MediaCard
              key={m.id}
              medio={m}
              permitirPortada={permitirPortada && entidadId != null}
              onEliminar={() => eliminar(m)}
              onPortada={() => setPortada(m.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function MediaCard({
  medio,
  permitirPortada,
  onEliminar,
  onPortada,
}: {
  medio: Medio;
  permitirPortada: boolean;
  onEliminar: () => void;
  onPortada: () => void;
}) {
  const esImg = medio.tipo === "imagen";
  return (
    <li className="group relative overflow-hidden rounded-lg border border-white/10 bg-secondary">
      {esImg ? (
        <img
          src={medio.url}
          alt={medio.titulo ?? ""}
          loading="lazy"
          className="h-28 w-full object-cover"
        />
      ) : (
        <a
          href={medio.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-28 w-full flex-col items-center justify-center gap-1 p-2 text-center"
        >
          <FileText size={22} className="text-white/50" />
          <span className="line-clamp-2 text-xs text-white/60">{medio.titulo}</span>
        </a>
      )}

      {medio.es_portada && (
        <span className="absolute left-1 top-1 flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-[#061529]">
          <Star size={10} /> Portada
        </span>
      )}
      {!medio.es_publico && (
        <span className="absolute right-1 top-1 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
          <Lock size={10} /> Privado
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/60 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
        {permitirPortada && esImg && !medio.es_portada ? (
          <button
            onClick={onPortada}
            className="text-[10px] text-white/80 hover:text-accent"
          >
            Hacer portada
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={onEliminar}
          className="flex items-center gap-1 text-[10px] text-red-300 hover:text-red-200"
        >
          <Trash2 size={11} /> Eliminar
        </button>
      </div>
    </li>
  );
}

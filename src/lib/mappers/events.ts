import type { CalendarEvent, ParticipantCategory } from "@/features/events";
import type { EventoRow } from "@/lib/data/eventos";
import type { TiempoRow } from "@/lib/data/tiempos";

/**
 * La tabla `eventos` no distingue competencia, práctica ni amistoso:
 * todo lo que se registra hoy son competencias federadas.
 */
const TIPO_POR_DEFECTO = "competition" as const;

/**
 * Tampoco hay columna de disciplina. La base solo modela natación de
 * piscina (estilos, pruebas y tipos_piscina), así que es la única que
 * se puede afirmar de un evento real.
 */
const DISCIPLINAS_POR_DEFECTO = ["swimming"] as const;

/** Código legible del evento: FEH-AAMM-NNN a partir de la fecha y el id. */
function codigoEvento(evento: EventoRow): string {
  const [anio, mes] = evento.fecha_inicio.split("-");
  return `FEH-${anio.slice(2)}${mes}-${String(evento.id).padStart(3, "0")}`;
}

/**
 * Convierte las filas de `eventos` al tipo que consume el módulo de
 * calendario, sin modificar ese módulo ni el esquema de la base.
 *
 * Lo que sí sale de datos reales: nombre, fechas, sede, descripción,
 * categorías participantes y número de participantes (derivados de los
 * tiempos registrados en cada evento) e imagen de portada (`medios`).
 *
 * Lo que se rellena con un valor neutro por no existir en la base:
 * `type`, `disciplines` y `sponsors`. Para que dejen de ser constantes
 * hacen falta columnas nuevas en `eventos` y una tabla puente
 * evento-patrocinador.
 */
export function aEventosCalendario(
  eventos: EventoRow[],
  tiempos: TiempoRow[],
  imagenes: Map<number, string> = new Map()
): CalendarEvent[] {
  const categoriasPorEvento = new Map<number, Map<string, ParticipantCategory>>();
  const deportistasPorEvento = new Map<number, Set<number>>();

  for (const tiempo of tiempos) {
    const eventoId = tiempo.eventos?.id;
    if (eventoId === undefined) continue;

    const categoria = tiempo.categorias?.nombre;
    if (categoria) {
      let categorias = categoriasPorEvento.get(eventoId);
      if (!categorias) {
        categorias = new Map();
        categoriasPorEvento.set(eventoId, categorias);
      }
      if (!categorias.has(categoria)) {
        categorias.set(categoria, { id: categoria, label: categoria });
      }
    }

    const deportistaId = tiempo.deportistas?.id;
    if (deportistaId !== undefined) {
      const deportistas = deportistasPorEvento.get(eventoId);
      if (deportistas) deportistas.add(deportistaId);
      else deportistasPorEvento.set(eventoId, new Set([deportistaId]));
    }
  }

  return eventos.map((evento) => {
    const participantes = deportistasPorEvento.get(evento.id)?.size ?? 0;
    const imagen = imagenes.get(evento.id);

    return {
      id: String(evento.id),
      code: codigoEvento(evento),
      name: evento.nombre,
      description: evento.descripcion ?? undefined,
      startDate: evento.fecha_inicio,
      endDate: evento.fecha_fin ?? undefined,
      location: evento.sede ?? undefined,
      type: TIPO_POR_DEFECTO,
      image: imagen ? { src: imagen, alt: evento.nombre } : undefined,
      sponsors: [],
      disciplines: [...DISCIPLINAS_POR_DEFECTO],
      participantCategories: [...(categoriasPorEvento.get(evento.id)?.values() ?? [])],
      participantCount: participantes || undefined,
    };
  });
}

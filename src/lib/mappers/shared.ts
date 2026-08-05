import type { RankingCourse } from "@/features/rankings";

/** Id de club en la UI. Debe coincidir con `Athlete["team"].id` y `Club["id"]`. */
export function clubUiId(id: number): string {
  return `club-${id}`;
}

/** Id del club ficticio que agrupa a los deportistas sin club asignado. */
export const SIN_CLUB_ID = "club-sin-asignar";

/** Abreviatura del club: la de la base, o las iniciales del nombre. */
export function abreviaturaClub(nombre: string, abreviatura: string | null): string {
  if (abreviatura?.trim()) return abreviatura.trim();
  const iniciales = nombre
    .split(/\s+/)
    .filter((palabra) => palabra.length > 2)
    .map((palabra) => palabra[0])
    .join("")
    .toLocaleUpperCase();
  return (iniciales || nombre.slice(0, 3)).slice(0, 4);
}

/** `tipos_piscina.codigo` -> tipo de piscina de la UI. */
export function codigoAPiscina(codigo: string | null | undefined): RankingCourse {
  return codigo === "LC" || codigo === "OW" ? codigo : "SC";
}

/** Centésimas de segundo (base) -> milisegundos (UI). */
export function centesimasAMs(centesimas: number): number {
  return centesimas * 10;
}

/** Nombre de prueba legible: "100 m Libre". */
export function nombrePrueba(distancia: number, estilo: string): string {
  return `${distancia} m ${estilo}`.trim();
}

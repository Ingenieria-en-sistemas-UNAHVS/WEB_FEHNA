// =====================================================================
// Helpers de tiempo (FEHNA)
// ---------------------------------------------------------------------
// En la base, `tiempo_final` / `tiempo_siembra` se guardan como ENTERO
// en CENTÉSIMAS de segundo (igual que la función SQL formatear_tiempo):
//   5743  -> "57.43"
//   13456 -> "2:14.56"   (2 min 14.56 s)
// =====================================================================

/** Convierte centésimas (entero) a texto "M:SS.cc" o "SS.cc". */
export function formatearTiempo(cent: number | null | undefined): string {
  if (cent === null || cent === undefined) return "NT";
  const min = Math.floor(cent / 6000);
  const seg = Math.floor((cent % 6000) / 100);
  const cc = cent % 100;
  const cc2 = String(cc).padStart(2, "0");
  if (min > 0) return `${min}:${String(seg).padStart(2, "0")}.${cc2}`;
  return `${seg}.${cc2}`;
}

/**
 * Convierte texto de tiempo a centésimas (entero) o null si es inválido.
 * Acepta: "57.43", "57,43", "1:02.10", "1:02", "62.5", "62"
 */
export function parsearTiempo(texto: string): number | null {
  const t = texto.trim().replace(",", ".");
  if (!t) return null;

  const conMin = t.match(/^(\d+):([0-5]?\d)(?:\.(\d{1,2}))?$/);
  if (conMin) {
    const min = parseInt(conMin[1], 10);
    const seg = parseInt(conMin[2], 10);
    const cc = conMin[3] ? parseInt(conMin[3].padEnd(2, "0"), 10) : 0;
    return min * 6000 + seg * 100 + cc;
  }

  const soloSeg = t.match(/^(\d+)(?:\.(\d{1,2}))?$/);
  if (soloSeg) {
    const seg = parseInt(soloSeg[1], 10);
    const cc = soloSeg[2] ? parseInt(soloSeg[2].padEnd(2, "0"), 10) : 0;
    return seg * 100 + cc;
  }

  return null;
}

/** Edad cumplida a una fecha dada (o a hoy) a partir de la fecha de nacimiento. */
export function calcularEdad(
  fechaNacimiento: string,
  fechaReferencia?: string
): number {
  const nac = new Date(fechaNacimiento);
  const ref = fechaReferencia ? new Date(fechaReferencia) : new Date();
  let edad = ref.getFullYear() - nac.getFullYear();
  const m = ref.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < nac.getDate())) edad--;
  return edad;
}

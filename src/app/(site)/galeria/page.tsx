import { GalleryDirectory } from "@/features/gallery";
import { getEventosPublicos, getGaleriaPublica } from "@/lib/data";
import { aGaleria } from "@/lib/mappers";

export default async function GaleriaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [params, medios, eventos] = await Promise.all([searchParams, getGaleriaPublica(), getEventosPublicos()]);
  const value = (key: string) => typeof params[key] === "string" ? params[key] : "";
  const nombresDeEvento = new Map(eventos.map((evento) => [evento.id, evento.nombre]));
  return <GalleryDirectory items={aGaleria(medios, nombresDeEvento)} initialPage={Number(value("page")) || 1} initialQuery={value("q")} initialType={value("type")} />;
}

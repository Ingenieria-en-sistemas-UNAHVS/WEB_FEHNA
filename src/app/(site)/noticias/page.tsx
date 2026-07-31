import { getNoticiasPublicas } from "@/lib/data/noticias";
import { NoticiasSection } from "@/features/home/sections/noticias-section";

export default async function NoticiasPage() {
  return <NoticiasSection noticias={await getNoticiasPublicas()} />;
}

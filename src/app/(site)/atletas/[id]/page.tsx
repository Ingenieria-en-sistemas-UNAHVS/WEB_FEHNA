import { notFound } from "next/navigation";
import { getAthleteById } from "@/features/athletes";
import { AthleteDetail } from "@/features/athletes/screens/AthleteDetail";
import { getDirectorioSitio } from "@/lib/data";

export default async function AthleteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, { atletas }] = await Promise.all([params, getDirectorioSitio()]);
  const athlete = getAthleteById(atletas, id);
  if (!athlete) notFound();
  return <AthleteDetail athlete={athlete} />;
}

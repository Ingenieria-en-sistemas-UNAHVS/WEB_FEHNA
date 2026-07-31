import { notFound } from "next/navigation";
import { athletes, getAthleteById, rankAthletes } from "@/features/athletes";
import { AthleteDetail } from "@/features/athletes/screens/AthleteDetail";

export function generateStaticParams() {
  return athletes.map((athlete) => ({ id: athlete.id }));
}

export default async function AthleteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const athlete = getAthleteById(rankAthletes(athletes), id);
  if (!athlete) notFound();
  return <AthleteDetail athlete={athlete} />;
}

import { notFound } from "next/navigation";
import { getClubAthletes, getClubById } from "@/features/clubs";
import { ClubDetail } from "@/features/clubs/screens/ClubDetail";
import { getDirectorioSitio } from "@/lib/data";
export default async function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) { const [{ id }, { atletas, clubes }] = await Promise.all([params, getDirectorioSitio()]); const club = getClubById(clubes, id); if (!club) notFound(); return <ClubDetail club={club} athletes={getClubAthletes(club, atletas)} />; }

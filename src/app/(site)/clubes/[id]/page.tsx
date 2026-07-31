import { notFound } from "next/navigation";
import { athletes } from "@/features/athletes";
import { clubs, getClubAthletes, getClubById } from "@/features/clubs";
import { ClubDetail } from "@/features/clubs/screens/ClubDetail";
export function generateStaticParams() { return clubs.map((club) => ({ id: club.id })); }
export default async function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const club = getClubById(clubs, id); if (!club) notFound(); return <ClubDetail club={club} athletes={getClubAthletes(club, athletes)} />; }

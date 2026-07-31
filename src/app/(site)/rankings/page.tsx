import { getTiemposRanking } from "@/lib/data/tiempos";
import { RankingsSection } from "@/features/home/sections/rankings-section";

export default async function RankingsPage() {
  return <RankingsSection tiempos={await getTiemposRanking()} />;
}

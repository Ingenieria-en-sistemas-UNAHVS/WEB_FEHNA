import { athletes, rankAthletes } from "@/features/athletes";
import { AthletesDirectory } from "@/features/athletes/screens/AthletesDirectory";

export default async function AtletasPage() {
  return <AthletesDirectory athletes={rankAthletes(athletes)} />;
}

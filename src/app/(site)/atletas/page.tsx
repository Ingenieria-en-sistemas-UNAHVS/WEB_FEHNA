import { athletes, rankAthletes } from "@/features/athletes";
import { AthletesDirectory } from "@/features/athletes/screens/AthletesDirectory";

export default async function AtletasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] : "";
  return <AthletesDirectory athletes={rankAthletes(athletes)} initialPage={Number(value("page")) || 1} initialSearch={value("search")} initialGender={value("gender")} initialSwimType={value("swimType")} initialTeam={value("team")} />;
}

import { AthletesDirectory } from "@/features/athletes/screens/AthletesDirectory";
import { getDirectorioSitio } from "@/lib/data";

export default async function AtletasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [params, { atletas }] = await Promise.all([searchParams, getDirectorioSitio()]);
  const value = (key: string) => typeof params[key] === "string" ? params[key] : "";
  return <AthletesDirectory athletes={atletas} initialPage={Number(value("page")) || 1} initialSearch={value("search")} initialGender={value("gender")} initialSwimType={value("swimType")} initialTeam={value("team")} />;
}

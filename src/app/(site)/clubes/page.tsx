import { clubs } from "@/features/clubs";
import { ClubsDirectory } from "@/features/clubs/screens/ClubsDirectory";
export default async function ClubsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) { const params = await searchParams; const value = (key: string) => typeof params[key] === "string" ? params[key] : ""; return <ClubsDirectory clubs={clubs} initialPage={Number(value("page")) || 1} initialSearch={value("q")} initialSort={(value("sort") as "points" | "medals" | "athletes" | "competitions" | "name") || "points"} />; }

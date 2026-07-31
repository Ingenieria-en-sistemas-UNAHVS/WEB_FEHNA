import type { Athlete } from "@/features/athletes";
import type { Club } from "../types/club.types";
import { ClubProfileHeader } from "../components/ClubProfileHeader";
import { ClubDetailSections } from "../components/ClubDetailSections";
export function ClubDetail({ club, athletes }: { club: Club; athletes: Athlete[] }) { return <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14"><ClubProfileHeader club={club} /><ClubDetailSections club={club} athletes={athletes} /></main>; }

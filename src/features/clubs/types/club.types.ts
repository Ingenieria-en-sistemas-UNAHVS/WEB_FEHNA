import type { Athlete, AthleteCompetition, AthleteMedal, AthletePerformance } from "@/features/athletes";

export type ClubSort = "points" | "medals" | "athletes" | "competitions" | "name";

export interface Club {
  id: string;
  name: string;
  shortName: string;
  federationCode: string;
  city: string;
  department: string;
  country: string;
  logoUrl?: string;
  isActive: boolean;
  foundedYear: number;
  athleteIds: string[];
  competitions: AthleteCompetition[];
  performances: AthletePerformance[];
  medals: AthleteMedal[];
  totalPoints: number;
}

export interface ClubStats {
  totalPoints: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  totalMedals: number;
  activeAthletes: number;
  competitionsCount: number;
  bestPlace: number | null;
}

export type ClubAthlete = Pick<Athlete, "id" | "firstName" | "lastName" | "gender" | "photoUrl" | "team">;

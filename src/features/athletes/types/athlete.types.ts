export type AthleteGender = "F" | "M";
export type SwimType = "Natación" | "Clavados" | "Waterpolo" | "Aguas abiertas";
export type ResultStatus = "valid" | "disqualified" | "did_not_start";
export type MedalType = "Oro" | "Plata" | "Bronce";

export interface AthleteTeam {
  id: string;
  name: string;
  shortName: string;
  city: string;
  logoUrl?: string;
}

export interface AthletePerformance {
  id: string;
  swimType: SwimType;
  stroke: string;
  distanceMeters: number;
  course: "SC" | "LC" | "OW";
  timeMs: number;
  points: number;
  place: number;
  competitionId: string;
  competitionName: string;
  date: string;
  status: ResultStatus;
}

export interface AthleteCompetition {
  id: string;
  name: string;
  date: string;
  location: string;
  events: number;
  bestPlace: number;
  points: number;
}

export interface AthleteMedal {
  id: string;
  type: MedalType;
  competitionName: string;
  eventName: string;
  date: string;
}

export interface Athlete {
  id: string;
  federationCode: string;
  firstName: string;
  lastName: string;
  gender: AthleteGender;
  birthDate: string;
  nationality: string;
  team: AthleteTeam;
  photoUrl?: string;
  performances: AthletePerformance[];
  competitions: AthleteCompetition[];
  medals: AthleteMedal[];
}

export interface RankedAthlete extends Athlete {
  rankingPosition: number;
  totalPoints: number;
  bestPerformance: AthletePerformance;
}

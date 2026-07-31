export type RankingCourse = "SC" | "LC" | "OW";
export type RankingSort = "time" | "points" | "position" | "date";

export interface RankingEntry {
  id: string;
  position: number;
  athleteId: string;
  athleteName: string;
  clubId: string;
  clubName: string;
  gender: "F" | "M";
  category: string;
  discipline: string;
  stroke: string;
  distanceMeters: number;
  course: RankingCourse;
  timeMs: number;
  points: number;
  competitionId: string;
  competitionName: string;
  date: string;
  location: string;
  status: "valid" | "disqualified";
}

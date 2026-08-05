import { athletes, mockTeams } from "@/features/athletes/data/athletes.mock";
import type { Club } from "../types/club.types";

const metadata: Record<string, { federationCode: string; department: string; foundedYear: number }> = {
  "team-aj": { federationCode: "FEHNA-AJ", department: "Francisco Morazán", foundedYear: 2011 },
  "team-ensigua": { federationCode: "FEHNA-ENS", department: "Comayagua", foundedYear: 2014 },
  "team-barracudas": { federationCode: "FEHNA-BAR", department: "Cortés", foundedYear: 2009 },
  "team-atlantis": { federationCode: "FEHNA-ATL", department: "Francisco Morazán", foundedYear: 2016 },
  "team-seahawks": { federationCode: "FEHNA-SEA", department: "Atlántida", foundedYear: 2012 },
  "team-delfines": { federationCode: "FEHNA-DEL", department: "Olancho", foundedYear: 2018 },
};

export const clubs: Club[] = Object.values(mockTeams).map((team) => {
  const members = athletes.filter((athlete) => athlete.team.id === team.id);
  const performances = members.flatMap((athlete) => athlete.performances);
  const competitions = members.flatMap((athlete) => athlete.competitions);
  const medals = members.flatMap((athlete) => athlete.medals);
  const uniqueCompetitions = Array.from(new Map(competitions.map((competition) => [competition.id, competition])).values());
  const info = metadata[team.id];
  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    federationCode: info.federationCode,
    city: team.city,
    department: info.department,
    country: "Honduras",
    isActive: true,
    foundedYear: info.foundedYear,
    athleteIds: members.map((athlete) => athlete.id),
    competitions: uniqueCompetitions,
    performances,
    medals,
    totalPoints: performances.reduce((total, performance) => total + performance.points, 0),
  };
});

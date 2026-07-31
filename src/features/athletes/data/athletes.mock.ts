import type { Athlete } from "../types/athlete.types";

const teams = {
  aj: { id: "team-aj", name: "AJ Swim Team", shortName: "AJ", city: "Tegucigalpa" },
  ensigua: { id: "team-ensigua", name: "Ensigua", shortName: "ENS", city: "Siguatepeque" },
  barracudas: { id: "team-barracudas", name: "Barracudas", shortName: "BAR", city: "San Pedro Sula" },
  atlantis: { id: "team-atlantis", name: "Atlantis Valle de Ángeles", shortName: "ATL", city: "Valle de Ángeles" },
  seahawks: { id: "team-seahawks", name: "Seahawks", shortName: "SEA", city: "La Ceiba" },
  delfines: { id: "team-delfines", name: "Delfines de Olancho", shortName: "DEL", city: "Juticalpa" },
};

export const athletes: Athlete[] = [
  {
    id: "1", federationCode: "HN-00128", firstName: "Sofía", lastName: "Martínez", gender: "F", birthDate: "2005-04-18", nationality: "Honduras", team: teams.aj,
    performances: [
      { id: "p-101", swimType: "Natación", stroke: "Libre", distanceMeters: 100, course: "LC", timeMs: 56320, points: 892, place: 1, competitionId: "comp-1", competitionName: "Copa Centroamericana 2026", date: "2026-06-14", status: "valid" },
      { id: "p-102", swimType: "Natación", stroke: "Mariposa", distanceMeters: 50, course: "SC", timeMs: 27880, points: 846, place: 2, competitionId: "comp-2", competitionName: "Nacional Federado 2026", date: "2026-03-22", status: "valid" },
      { id: "p-103", swimType: "Natación", stroke: "Libre", distanceMeters: 200, course: "LC", timeMs: 122450, points: 812, place: 1, competitionId: "comp-3", competitionName: "Torneo del Pacífico", date: "2025-11-08", status: "valid" },
    ],
    competitions: [
      { id: "comp-1", name: "Copa Centroamericana 2026", date: "2026-06-14", location: "San Salvador, El Salvador", events: 3, bestPlace: 1, points: 892 },
      { id: "comp-2", name: "Nacional Federado 2026", date: "2026-03-22", location: "Tegucigalpa, Honduras", events: 2, bestPlace: 2, points: 846 },
    ],
    medals: [
      { id: "m-101", type: "Oro", competitionName: "Copa Centroamericana 2026", eventName: "100 m Libre", date: "2026-06-14" },
      { id: "m-102", type: "Plata", competitionName: "Nacional Federado 2026", eventName: "50 m Mariposa", date: "2026-03-22" },
      { id: "m-103", type: "Oro", competitionName: "Torneo del Pacífico", eventName: "200 m Libre", date: "2025-11-08" },
    ],
  },
  {
    id: "2", federationCode: "HN-00094", firstName: "Diego", lastName: "Alvarado", gender: "M", birthDate: "2003-09-06", nationality: "Honduras", team: teams.ensigua,
    performances: [
      { id: "p-201", swimType: "Natación", stroke: "Dorso", distanceMeters: 100, course: "LC", timeMs: 58410, points: 878, place: 1, competitionId: "comp-1", competitionName: "Copa Centroamericana 2026", date: "2026-06-14", status: "valid" },
      { id: "p-202", swimType: "Natación", stroke: "Libre", distanceMeters: 50, course: "SC", timeMs: 24090, points: 825, place: 3, competitionId: "comp-2", competitionName: "Nacional Federado 2026", date: "2026-03-22", status: "valid" },
    ],
    competitions: [{ id: "comp-1", name: "Copa Centroamericana 2026", date: "2026-06-14", location: "San Salvador, El Salvador", events: 2, bestPlace: 1, points: 878 }, { id: "comp-2", name: "Nacional Federado 2026", date: "2026-03-22", location: "Tegucigalpa, Honduras", events: 2, bestPlace: 3, points: 825 }],
    medals: [{ id: "m-201", type: "Oro", competitionName: "Copa Centroamericana 2026", eventName: "100 m Dorso", date: "2026-06-14" }],
  },
  {
    id: "3", federationCode: "HN-00176", firstName: "Valentina", lastName: "Pineda", gender: "F", birthDate: "2007-01-27", nationality: "Honduras", team: teams.barracudas,
    performances: [{ id: "p-301", swimType: "Natación", stroke: "Pecho", distanceMeters: 100, course: "SC", timeMs: 69880, points: 864, place: 1, competitionId: "comp-2", competitionName: "Nacional Federado 2026", date: "2026-03-22", status: "valid" }, { id: "p-302", swimType: "Natación", stroke: "Pecho", distanceMeters: 200, course: "LC", timeMs: 154200, points: 791, place: 2, competitionId: "comp-3", competitionName: "Torneo del Pacífico", date: "2025-11-08", status: "valid" }],
    competitions: [{ id: "comp-2", name: "Nacional Federado 2026", date: "2026-03-22", location: "Tegucigalpa, Honduras", events: 2, bestPlace: 1, points: 864 }, { id: "comp-3", name: "Torneo del Pacífico", date: "2025-11-08", location: "Managua, Nicaragua", events: 2, bestPlace: 2, points: 791 }],
    medals: [{ id: "m-301", type: "Oro", competitionName: "Nacional Federado 2026", eventName: "100 m Pecho", date: "2026-03-22" }, { id: "m-302", type: "Plata", competitionName: "Torneo del Pacífico", eventName: "200 m Pecho", date: "2025-11-08" }],
  },
  {
    id: "4", federationCode: "HN-00231", firstName: "Mateo", lastName: "Cruz", gender: "M", birthDate: "2006-08-12", nationality: "Honduras", team: teams.atlantis,
    performances: [{ id: "p-401", swimType: "Natación", stroke: "Mariposa", distanceMeters: 100, course: "LC", timeMs: 61450, points: 803, place: 2, competitionId: "comp-1", competitionName: "Copa Centroamericana 2026", date: "2026-06-14", status: "valid" }, { id: "p-402", swimType: "Natación", stroke: "Libre", distanceMeters: 200, course: "SC", timeMs: 125300, points: 778, place: 4, competitionId: "comp-2", competitionName: "Nacional Federado 2026", date: "2026-03-22", status: "valid" }],
    competitions: [{ id: "comp-1", name: "Copa Centroamericana 2026", date: "2026-06-14", location: "San Salvador, El Salvador", events: 2, bestPlace: 2, points: 803 }],
    medals: [],
  },
  {
    id: "5", federationCode: "HN-00304", firstName: "Camila", lastName: "Ríos", gender: "F", birthDate: "2008-02-10", nationality: "Honduras", team: teams.aj,
    performances: [{ id: "p-501", swimType: "Natación", stroke: "Libre", distanceMeters: 50, course: "SC", timeMs: 29100, points: 764, place: 2, competitionId: "comp-2", competitionName: "Nacional Federado 2026", date: "2026-03-22", status: "valid" }],
    competitions: [{ id: "comp-2", name: "Nacional Federado 2026", date: "2026-03-22", location: "Tegucigalpa, Honduras", events: 1, bestPlace: 2, points: 764 }],
    medals: [{ id: "m-501", type: "Plata", competitionName: "Nacional Federado 2026", eventName: "50 m Libre", date: "2026-03-22" }],
  },
  {
    id: "6", federationCode: "HN-00341", firstName: "Andrés", lastName: "Méndez", gender: "M", birthDate: "2004-11-19", nationality: "Honduras", team: teams.barracudas,
    performances: [{ id: "p-601", swimType: "Aguas abiertas", stroke: "Aguas abiertas", distanceMeters: 5000, course: "OW", timeMs: 3425000, points: 742, place: 3, competitionId: "comp-3", competitionName: "Torneo del Pacífico", date: "2025-11-08", status: "valid" }],
    competitions: [{ id: "comp-3", name: "Torneo del Pacífico", date: "2025-11-08", location: "Managua, Nicaragua", events: 1, bestPlace: 3, points: 742 }],
    medals: [],
  },
];

const generatedAthletes: Athlete[] = [
  ["7", "Mariana", "Torres", "F", "2009-05-12", teams.seahawks, "Libre", 50, "SC", 30220, 731, 4, "comp-4", "Copa Caribe 2026"],
  ["8", "Samuel", "Castillo", "M", "2005-02-21", teams.delfines, "Dorso", 200, "LC", 131480, 724, 2, "comp-5", "Nacional por Clubes 2026"],
  ["9", "Isabella", "Reyes", "F", "2006-10-03", teams.atlantis, "Mariposa", 50, "SC", 28560, 716, 3, "comp-4", "Copa Caribe 2026"],
  ["10", "Gabriel", "Fuentes", "M", "2008-07-30", teams.ensigua, "Pecho", 100, "LC", 71340, 708, 5, "comp-5", "Nacional por Clubes 2026"],
  ["11", "Luciana", "Molina", "F", "2010-01-16", teams.barracudas, "Libre", 100, "LC", 64490, 699, 2, "comp-6", "Torneo Juvenil del Norte"],
  ["12", "Nicolás", "Zelaya", "M", "2007-12-08", teams.aj, "Mariposa", 200, "LC", 138920, 691, 4, "comp-6", "Torneo Juvenil del Norte"],
  ["13", "Daniela", "Paz", "F", "2004-06-25", teams.seahawks, "Pecho", 200, "SC", 146300, 684, 1, "comp-7", "Open Nacional 2025"],
  ["14", "Jorge", "Bueso", "M", "2003-03-14", teams.delfines, "Libre", 400, "LC", 236880, 677, 3, "comp-7", "Open Nacional 2025"],
  ["15", "Renata", "Aguilar", "F", "2008-09-19", teams.aj, "Dorso", 100, "SC", 67120, 668, 6, "comp-5", "Nacional por Clubes 2026"],
  ["16", "Emilio", "Membreño", "M", "2009-11-02", teams.barracudas, "Libre", 200, "LC", 128740, 659, 4, "comp-8", "Copa de Invierno FEHNA"],
  ["17", "Paula", "Núñez", "F", "2005-08-28", teams.atlantis, "Libre", 800, "LC", 517600, 647, 2, "comp-8", "Copa de Invierno FEHNA"],
  ["18", "Tomás", "Varela", "M", "2006-04-07", teams.seahawks, "Aguas abiertas", 5000, "OW", 3372400, 635, 1, "comp-4", "Copa Caribe 2026"],
].map(([id, firstName, lastName, gender, birthDate, team, stroke, distanceMeters, course, timeMs, points, place, competitionId, competitionName]) => ({
  id: id as string,
  federationCode: `HN-00${id}`,
  firstName: firstName as string,
  lastName: lastName as string,
  gender: gender as "F" | "M",
  birthDate: birthDate as string,
  nationality: "Honduras",
  team: team as Athlete["team"],
  performances: [{ id: `p-${id}01`, swimType: (stroke === "Aguas abiertas" ? "Aguas abiertas" : "Natación") as Athlete["performances"][number]["swimType"], stroke: stroke as string, distanceMeters: distanceMeters as number, course: course as "SC" | "LC" | "OW", timeMs: timeMs as number, points: points as number, place: place as number, competitionId: competitionId as string, competitionName: competitionName as string, date: "2026-05-18", status: "valid" }],
  competitions: [{ id: competitionId as string, name: competitionName as string, date: "2026-05-18", location: "Honduras", events: 1, bestPlace: place as number, points: points as number }],
  medals: (place as number) === 1 ? [{ id: `m-${id}01`, type: "Oro", competitionName: competitionName as string, eventName: `${distanceMeters} m ${stroke}`, date: "2026-05-18" }] : [],
}));

athletes.push(...generatedAthletes);

export { teams as mockTeams };

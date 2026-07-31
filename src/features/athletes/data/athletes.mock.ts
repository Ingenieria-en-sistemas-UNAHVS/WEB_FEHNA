import type { Athlete } from "../types/athlete.types";

const teams = {
  aj: { id: "team-aj", name: "AJ Swim Team", shortName: "AJ", city: "Tegucigalpa" },
  ensigua: { id: "team-ensigua", name: "Ensigua", shortName: "ENS", city: "Siguatepeque" },
  barracudas: { id: "team-barracudas", name: "Barracudas", shortName: "BAR", city: "San Pedro Sula" },
  atlantis: { id: "team-atlantis", name: "Atlantis Valle de Ángeles", shortName: "ATL", city: "Valle de Ángeles" },
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

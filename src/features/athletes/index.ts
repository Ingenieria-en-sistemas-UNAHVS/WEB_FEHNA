// Los datos vienen de Supabase (`@/lib/data`). Los mocks siguen en
// `./data/athletes.mock` como material de prueba, fuera del barril para
// que nadie los importe por accidente.
export { getAthleteById, getBestPerformance, getTotalPoints, rankAthletes } from "./lib/athlete-ranking";
export type * from "./types/athlete.types";

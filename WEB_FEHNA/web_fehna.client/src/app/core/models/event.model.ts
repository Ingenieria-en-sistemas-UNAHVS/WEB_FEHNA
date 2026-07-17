export type EventScope = 'NACIONAL' | 'INTERNACIONAL';
export type EventDiscipline = 'Natación' | 'Clavados' | 'Waterpolo' | 'Sincronizado';

export interface CompetitionEvent {
  id: number;
  name: string;
  location: string;
  discipline: EventDiscipline;
  scope: EventScope;
  day: string;   // "18"
  month: string; // "AGO"
  date: string;  // ISO date for sorting
}

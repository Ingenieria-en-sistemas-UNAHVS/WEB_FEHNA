export interface SwimRecord {
  id: number;
  swimmer: string;
  isRecord?: boolean;
  club: string;
  department: string;
  category: 'Infantil' | 'Juvenil' | 'Junior' | 'Absoluto';
  event: string;   // e.g. "50m Libre"
  time: string;    // "24.88"
  date: string;    // display date
  competition: string;
}

export interface Athlete {
  id: number;
  name: string;
  discipline: 'Natación' | 'Clavados' | 'Sincronizado' | 'Waterpolo';
  specialty: string; // e.g. "Mariposa / Libre"
  photoUrl: string;
  medals: number;
  records: number;
  competitions: number;
  highlight: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: 'Natación' | 'Clavados' | 'Sincronizado' | 'Waterpolo' | 'Institucional';
  imageUrl: string;
  date: string; // ISO date
  featured?: boolean;
}

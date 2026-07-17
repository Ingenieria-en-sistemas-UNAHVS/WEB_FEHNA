import {Injectable, signal} from '@angular/core';
import {NewsItem} from '../models/news.model';

// NOTE: Mock data for now. Once the backend API is ready, replace the
// internal state with HttpClient calls (GET/POST/PUT/DELETE /api/news)
// keeping the same public method signatures so components don't change.
const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Honduras domina en los Juegos Centroamericanos de Natación 2025',
    summary: 'La delegación hondureña obtuvo 12 medallas en su participación en los Juegos Centroamericanos de Natación 2025 realizados en la Ciudad de Guatemala.',
    category: 'Natación',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop',
    date: '2026-06-18',
    featured: true,
  },
  {
    id: 2,
    title: 'Karla Mendoza rompe récord nacional en 100m mariposa',
    summary: 'La nadadora hondureña Karla Mendoza estableció un nuevo récord nacional en la prueba de 100m mariposa durante el Campeonato Nacional Juvenil.',
    category: 'Natación',
    imageUrl: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-02',
  },
  {
    id: 3,
    title: 'Convocatoria oficial para el Campeonato Panamericano de Lima',
    summary: 'FEHNA confirma la lista de nadadores convocados para representar a Honduras en el Campeonato Panamericano de Lima.',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=800&auto=format&fit=crop',
    date: '2026-04-28',
  },
  {
    id: 4,
    title: 'Equipo masculino de waterpolo clasifica al Regional de Uana',
    summary: 'El equipo nacional de waterpolo masculino aseguró su cupo para el próximo Campeonato Regional de la UANA.',
    category: 'Waterpolo',
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop',
    date: '2026-03-20',
  },
];

@Injectable({providedIn: 'root'})
export class NewsService {
  private readonly _news = signal<NewsItem[]>(MOCK_NEWS);
  readonly news = this._news.asReadonly();

  getAll(): NewsItem[] {
    return this._news();
  }

  getFeatured(): NewsItem | undefined {
    return this._news().find(n => n.featured) ?? this._news()[0];
  }

  getById(id: number): NewsItem | undefined {
    return this._news().find(n => n.id === id);
  }

  create(item: Omit<NewsItem, 'id'>): void {
    const nextId = Math.max(0, ...this._news().map(n => n.id)) + 1;
    this._news.update(list => [{...item, id: nextId}, ...list]);
  }

  update(id: number, changes: Partial<NewsItem>): void {
    this._news.update(list => list.map(n => (n.id === id ? {...n, ...changes} : n)));
  }

  delete(id: number): void {
    this._news.update(list => list.filter(n => n.id !== id));
  }
}

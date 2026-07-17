import {Injectable, signal} from '@angular/core';
import {Athlete} from '../models/athlete.model';

// Mock data — swap for HttpClient GET/POST/PUT/DELETE /api/athletes later.
const MOCK_ATHLETES: Athlete[] = [
  {
    id: 1,
    name: 'Karla Mendoza',
    discipline: 'Natación',
    specialty: 'Mariposa / Libre',
    photoUrl: 'https://images.unsplash.com/photo-1519307212971-ff64738b3b39?q=80&w=600&auto=format&fit=crop',
    medals: 18,
    records: 4,
    competitions: 27,
    highlight: 'Récord Nacional 100m mariposa',
  },
  {
    id: 2,
    name: 'Diego Flores',
    discipline: 'Clavados',
    specialty: 'Trampolín 3m / 10m',
    photoUrl: 'https://images.unsplash.com/photo-1560089168-6516ffef07f6?q=80&w=600&auto=format&fit=crop',
    medals: 11,
    records: 2,
    competitions: 19,
    highlight: 'Campeón Nacional Absoluto',
  },
  {
    id: 3,
    name: 'Sofía Rivera',
    discipline: 'Sincronizado',
    specialty: 'Solo / Dueto',
    photoUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=600&auto=format&fit=crop',
    medals: 8,
    records: 3,
    competitions: 15,
    highlight: 'Campeona Centroamericana',
  },
  {
    id: 4,
    name: 'Marco Lara',
    discipline: 'Waterpolo',
    specialty: 'Espadista / Centroboya',
    photoUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=600&auto=format&fit=crop',
    medals: 6,
    records: 3,
    competitions: 22,
    highlight: 'Clasificación Olímpica Paris 2024',
  },
];

@Injectable({providedIn: 'root'})
export class AthletesService {
  private readonly _athletes = signal<Athlete[]>(MOCK_ATHLETES);
  readonly athletes = this._athletes.asReadonly();

  getAll(): Athlete[] {
    return this._athletes();
  }

  getById(id: number): Athlete | undefined {
    return this._athletes().find(a => a.id === id);
  }

  create(item: Omit<Athlete, 'id'>): void {
    const nextId = Math.max(0, ...this._athletes().map(a => a.id)) + 1;
    this._athletes.update(list => [...list, {...item, id: nextId}]);
  }

  update(id: number, changes: Partial<Athlete>): void {
    this._athletes.update(list => list.map(a => (a.id === id ? {...a, ...changes} : a)));
  }

  delete(id: number): void {
    this._athletes.update(list => list.filter(a => a.id !== id));
  }
}

import {Injectable, signal} from '@angular/core';
import {CompetitionEvent} from '../models/event.model';

// Mock data — swap for HttpClient calls to /api/events later.
const MOCK_EVENTS: CompetitionEvent[] = [
  {
    id: 1,
    name: 'Campeonato Nacional Juvenil',
    location: 'Tegucigalpa',
    discipline: 'Natación',
    scope: 'NACIONAL',
    day: '18',
    month: 'AGO',
    date: '2026-08-18'
  },
  {
    id: 2,
    name: 'Copa Honduras Open',
    location: 'San Pedro Sula',
    discipline: 'Natación',
    scope: 'NACIONAL',
    day: '20',
    month: 'AGO',
    date: '2026-08-20'
  },
  {
    id: 3,
    name: 'Panamericano Corta Distancia',
    location: 'Lima, Perú',
    discipline: 'Natación',
    scope: 'INTERNACIONAL',
    day: '24',
    month: 'AGO',
    date: '2026-08-24'
  },
  {
    id: 4,
    name: 'Torneo Regional de Clavados',
    location: 'Ciudad de Guatemala',
    discipline: 'Clavados',
    scope: 'INTERNACIONAL',
    day: '21',
    month: 'AGO',
    date: '2026-08-21'
  },
  {
    id: 5,
    name: 'Liga Nacional de Waterpolo',
    location: 'Comayagüela',
    discipline: 'Waterpolo',
    scope: 'NACIONAL',
    day: '5',
    month: 'SEP',
    date: '2026-09-05'
  },
  {
    id: 6,
    name: 'Campeonato Centroamericano Sincronizado',
    location: 'San José, Costa Rica',
    discipline: 'Sincronizado',
    scope: 'INTERNACIONAL',
    day: '12',
    month: 'SEP',
    date: '2026-09-12'
  },
  {
    id: 7,
    name: 'Clasificatorio Olímpico UANA',
    location: 'Montevideo, Uruguay',
    discipline: 'Natación',
    scope: 'INTERNACIONAL',
    day: '3',
    month: 'OCT',
    date: '2026-10-03'
  },
  {
    id: 8,
    name: 'Campeonato Nacional Infantil',
    location: 'La Ceiba',
    discipline: 'Natación',
    scope: 'NACIONAL',
    day: '10',
    month: 'OCT',
    date: '2026-10-10'
  },
];

@Injectable({providedIn: 'root'})
export class EventsService {
  private readonly _events = signal<CompetitionEvent[]>(MOCK_EVENTS);
  readonly events = this._events.asReadonly();

  getAll(): CompetitionEvent[] {
    return [...this._events()].sort((a, b) => a.date.localeCompare(b.date));
  }

  getById(id: number): CompetitionEvent | undefined {
    return this._events().find(e => e.id === id);
  }

  create(item: Omit<CompetitionEvent, 'id'>): void {
    const nextId = Math.max(0, ...this._events().map(e => e.id)) + 1;
    this._events.update(list => [...list, {...item, id: nextId}]);
  }

  update(id: number, changes: Partial<CompetitionEvent>): void {
    this._events.update(list => list.map(e => (e.id === id ? {...e, ...changes} : e)));
  }

  delete(id: number): void {
    this._events.update(list => list.filter(e => e.id !== id));
  }
}

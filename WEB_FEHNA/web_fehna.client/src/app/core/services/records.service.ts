import {Injectable, signal} from '@angular/core';
import {SwimRecord} from '../models/record.model';

// Mock data — swap for HttpClient calls to /api/records later.
const MOCK_RECORDS: SwimRecord[] = [
  {
    id: 1,
    swimmer: 'Mateo Sorto',
    club: 'Tiburones del Norte',
    department: 'Cortés',
    category: 'Juvenil',
    event: '50m Libre',
    time: '24.88',
    date: '10 Jun 2026',
    competition: 'La Ceiba'
  },
  {
    id: 2,
    swimmer: 'Andrea Núñez',
    club: 'Natación Comayagua',
    department: 'Comayagua',
    category: 'Juvenil',
    event: '50m Libre',
    time: '25.12',
    date: '1 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 3,
    swimmer: 'Isabella Mendoza',
    isRecord: true,
    club: 'Club Aqua Choluteca',
    department: 'Choluteca',
    category: 'Infantil',
    event: '50m Libre',
    time: '28.44',
    date: '1 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 4,
    swimmer: 'Sara Castillo',
    club: 'Natación SPS',
    department: 'Cortés',
    category: 'Infantil',
    event: '50m Libre',
    time: '28.88',
    date: '1 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 5,
    swimmer: 'Renata Paz',
    club: 'Natación SPS',
    department: 'Cortés',
    category: 'Absoluto',
    event: '50m Libre',
    time: '28.21',
    date: '1 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 6,
    swimmer: 'Marco Luna',
    club: 'Tigres Acuáticos',
    department: 'Francisco Morazán',
    category: 'Absoluto',
    event: '100m Libre',
    time: '54.12',
    date: '28 Jun 2026',
    competition: 'San Pedro Sula'
  },
  {
    id: 7,
    swimmer: 'Óscar Fuentes',
    club: 'Natación Comayagua',
    department: 'Comayagua',
    category: 'Absoluto',
    event: '100m Mariposa',
    time: '54.89',
    date: '28 Jun 2026',
    competition: 'San Pedro Sula'
  },
  {
    id: 8,
    swimmer: 'Bryan Castellanos',
    club: 'Natación Comayagua',
    department: 'Comayagua',
    category: 'Absoluto',
    event: '100m Espalda',
    time: '55.24',
    date: '28 Jun 2026',
    competition: 'San Pedro Sula'
  },
  {
    id: 9,
    swimmer: 'Karla Mendoza',
    isRecord: true,
    club: 'Club Deportivo Tegucigalpa',
    department: 'Francisco Morazán',
    category: 'Absoluto',
    event: '100m Mariposa',
    time: '57.43',
    date: '18 Jul 2026',
    competition: 'Tegucigalpa'
  },
  {
    id: 10,
    swimmer: 'Camila Martínez',
    club: 'Natación SPS',
    department: 'Cortés',
    category: 'Juvenil',
    event: '100m Pecho',
    time: '58.34',
    date: '18 Jul 2026',
    competition: 'Tegucigalpa'
  },
  {
    id: 11,
    swimmer: 'Lucía Aguilar',
    club: 'Natación SPS',
    department: 'Cortés',
    category: 'Infantil',
    event: '100m Libre',
    time: '58.91',
    date: '18 Jul 2026',
    competition: 'Tegucigalpa'
  },
  {
    id: 12,
    swimmer: 'Paola Herrera',
    club: 'Natación SPS',
    department: 'Cortés',
    category: 'Infantil',
    event: '100m Libre',
    time: '58.91',
    date: '18 Jul 2026',
    competition: 'Tegucigalpa'
  },
  {
    id: 13,
    swimmer: 'Daniela Reyes',
    club: 'Club Aqua Choluteca',
    department: 'Choluteca',
    category: 'Infantil',
    event: '100m Libre',
    time: '58.67',
    date: '28 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 14,
    swimmer: 'Fernanda López',
    club: 'Club Aqua Choluteca',
    department: 'Choluteca',
    category: 'Infantil',
    event: '100m Libre',
    time: '58.67',
    date: '28 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 15,
    swimmer: 'Emilia Vargas',
    club: 'Tigres Acuáticos',
    department: 'Francisco Morazán',
    category: 'Infantil',
    event: '100m Pecho',
    time: '1:54.22',
    date: '1 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 16,
    swimmer: 'Roberto Mejía',
    club: 'Tigres Acuáticos',
    department: 'Francisco Morazán',
    category: 'Absoluto',
    event: '100m Mariposa',
    time: '1:52.67',
    date: '24 May 2026',
    competition: 'San Pedro Sula'
  },
  {
    id: 17,
    swimmer: 'Diego Flores',
    club: 'Tigres Acuáticos',
    department: 'Francisco Morazán',
    category: 'Absoluto',
    event: '100m Mariposa',
    time: '1:58.23',
    date: '1 Jun 2026',
    competition: 'Choluteca'
  },
  {
    id: 18,
    swimmer: 'Sofía Rivera',
    isRecord: true,
    club: 'Club Acuático La Ceiba',
    department: 'Atlántida',
    category: 'Absoluto',
    event: '100m Mariposa',
    time: '2:14.68',
    date: '20 Jun 2026',
    competition: 'La Ceiba'
  },
  {
    id: 19,
    swimmer: 'Valeria Cruz',
    club: 'Tiburones del Norte',
    department: 'Cortés',
    category: 'Absoluto',
    event: '100m Pecho',
    time: '2:18.19',
    date: '20 Jun 2026',
    competition: 'La Ceiba'
  },
  {
    id: 20,
    swimmer: 'Andrea Pineda',
    club: 'Tiburones del Norte',
    department: 'Cortés',
    category: 'Absoluto',
    event: '100m Libre',
    time: '2:18.68',
    date: '20 Jun 2026',
    competition: 'La Ceiba'
  },
];

@Injectable({providedIn: 'root'})
export class RecordsService {
  private readonly _records = signal<SwimRecord[]>(MOCK_RECORDS);
  readonly records = this._records.asReadonly();

  getAll(): SwimRecord[] {
    return this._records();
  }
}

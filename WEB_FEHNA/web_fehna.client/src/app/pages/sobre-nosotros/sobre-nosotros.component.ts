import {Component} from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css',
})
export class SobreNosotrosComponent {
  readonly milestones = [
    {year: '1974', text: 'Fundación de la Federación Hondureña de Natación.'},
    {year: '1998', text: 'Ingreso oficial a la Unión Americana de Natación (UANA).'},
    {year: '2012', text: 'Primera medalla hondureña en un Campeonato Centroamericano.'},
    {year: '2024', text: 'Clasificación histórica a los Juegos Olímpicos en waterpolo.'},
  ];

  readonly board = [
    {name: 'Carlos Ramírez', role: 'Presidente'},
    {name: 'Ana Lucía Ponce', role: 'Vicepresidenta'},
    {name: 'Jorge Salinas', role: 'Secretario General'},
    {name: 'María Fernanda Ortiz', role: 'Tesorera'},
  ];
}

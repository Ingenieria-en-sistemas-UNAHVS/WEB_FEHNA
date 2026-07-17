import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {AthletesService} from '../../core/services/athletes.service';

const DISCIPLINE_BADGE: Record<string, 'success' | 'warn' | 'secondary' | 'info' | 'contrast'> = {
  'Natación': 'success',
  'Clavados': 'warn',
  'Sincronizado': 'secondary',
  'Waterpolo': 'info',
};

@Component({
  selector: 'app-atletas',
  standalone: true,
  imports: [CommonModule, ButtonDirective, TagModule],
  templateUrl: './atletas.component.html',
  styleUrl: './atletas.component.css',
})
export class AtletasComponent {
  readonly disciplines = ['Todos', 'Natación', 'Clavados', 'Sincronizado', 'Waterpolo'];
  readonly activeDiscipline = signal('Todos');
  readonly athletes = computed(() => {
    const all = this.athletesService.getAll();
    const d = this.activeDiscipline();
    return d === 'Todos' ? all : all.filter(a => a.discipline === d);
  });

  constructor(private athletesService: AthletesService) {
  }

  badgeSeverity(discipline: string): 'success' | 'warn' | 'secondary' | 'info' | 'contrast' {
    return DISCIPLINE_BADGE[discipline] ?? 'contrast';
  }
}

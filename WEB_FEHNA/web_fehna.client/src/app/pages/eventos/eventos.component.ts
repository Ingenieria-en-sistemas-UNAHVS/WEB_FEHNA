import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {EventsService} from '../../core/services/events.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, ButtonDirective, TagModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  readonly scopes = ['Todos', 'NACIONAL', 'INTERNACIONAL'];
  readonly activeScope = signal('Todos');
  readonly disciplines = ['Todas', 'Natación', 'Clavados', 'Waterpolo', 'Sincronizado'];
  readonly activeDiscipline = signal('Todas');
  readonly events = computed(() => {
    let list = this.eventsService.getAll();
    if (this.activeScope() !== 'Todos') list = list.filter(e => e.scope === this.activeScope());
    if (this.activeDiscipline() !== 'Todas') list = list.filter(e => e.discipline === this.activeDiscipline());
    return list;
  });

  constructor(private eventsService: EventsService) {
  }
}

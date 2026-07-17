import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {EventsService} from '../../../core/services/events.service';
import {CompetitionEvent} from '../../../core/models/event.model';

const DISCIPLINE_OPTIONS = ['Natación', 'Clavados', 'Waterpolo', 'Sincronizado'];
const SCOPE_OPTIONS = [
  {label: 'NACIONAL', value: 'NACIONAL'},
  {label: 'INTERNACIONAL', value: 'INTERNACIONAL'},
];

type EventForm = Omit<CompetitionEvent, 'id'>;

const EMPTY_FORM: EventForm = {
  name: '',
  location: '',
  discipline: 'Natación',
  scope: 'NACIONAL',
  day: '1',
  month: 'ENE',
  date: new Date().toISOString().slice(0, 10),
};

@Component({
  selector: 'app-eventos-admin',
  standalone: true,
  imports: [FormsModule, ButtonDirective, InputText, Select, TableModule, TagModule, DialogModule],
  templateUrl: './eventos-admin.component.html',
  styleUrl: './eventos-admin.component.css',
})
export class EventosAdminComponent {
  readonly disciplineOptions = DISCIPLINE_OPTIONS;
  readonly scopeOptions = SCOPE_OPTIONS;
  readonly events = computed(() => this.eventsService.getAll());
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);
  form: EventForm = {...EMPTY_FORM};

  constructor(private eventsService: EventsService) {
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form = {...EMPTY_FORM};
    this.showForm.set(true);
  }

  openEdit(item: CompetitionEvent): void {
    this.editingId.set(item.id);
    const {id, ...rest} = item;
    this.form = {...rest};
    this.showForm.set(true);
  }

  save(): void {
    // Keep day/month in sync with the chosen date for display consistency.
    const d = new Date(this.form.date + 'T00:00:00');
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    this.form.day = String(d.getDate());
    this.form.month = months[d.getMonth()];

    const id = this.editingId();
    if (id !== null) {
      this.eventsService.update(id, this.form);
    } else {
      this.eventsService.create(this.form);
    }
    this.showForm.set(false);
  }

  remove(id: number): void {
    if (confirm('¿Eliminar este evento?')) {
      this.eventsService.delete(id);
    }
  }

  cancel(): void {
    this.showForm.set(false);
  }
}

import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {AthletesService} from '../../../core/services/athletes.service';
import {Athlete} from '../../../core/models/athlete.model';

const DISCIPLINE_OPTIONS = ['Natación', 'Clavados', 'Sincronizado', 'Waterpolo'];

type AthleteForm = Omit<Athlete, 'id'>;

const EMPTY_FORM: AthleteForm = {
  name: '',
  discipline: 'Natación',
  specialty: '',
  photoUrl: '',
  medals: 0,
  records: 0,
  competitions: 0,
  highlight: '',
};

@Component({
  selector: 'app-atletas-admin',
  standalone: true,
  imports: [FormsModule, ButtonDirective, InputText, Select, TableModule, TagModule, DialogModule],
  templateUrl: './atletas-admin.component.html',
  styleUrl: './atletas-admin.component.css',
})
export class AtletasAdminComponent {
  readonly disciplineOptions = DISCIPLINE_OPTIONS;
  readonly athletes = computed(() => this.athletesService.getAll());
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);
  form: AthleteForm = {...EMPTY_FORM};

  constructor(private athletesService: AthletesService) {
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form = {...EMPTY_FORM};
    this.showForm.set(true);
  }

  openEdit(item: Athlete): void {
    this.editingId.set(item.id);
    const {id, ...rest} = item;
    this.form = {...rest};
    this.showForm.set(true);
  }

  save(): void {
    const id = this.editingId();
    if (id !== null) {
      this.athletesService.update(id, this.form);
    } else {
      this.athletesService.create(this.form);
    }
    this.showForm.set(false);
  }

  remove(id: number): void {
    if (confirm('¿Eliminar este atleta?')) {
      this.athletesService.delete(id);
    }
  }

  cancel(): void {
    this.showForm.set(false);
  }
}

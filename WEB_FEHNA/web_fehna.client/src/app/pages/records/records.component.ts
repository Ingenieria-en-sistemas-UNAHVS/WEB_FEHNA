import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {RecordsService} from '../../core/services/records.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, ButtonDirective, InputText, TableModule, TagModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
})
export class RecordsComponent {
  readonly search = signal('');
  readonly category = signal('Todos');
  readonly categories = ['Todos', 'Infantil', 'Juvenil', 'Junior', 'Absoluto'];
  readonly records = computed(() => {
    let list = this.recordsService.getAll();
    if (this.category() !== 'Todos') list = list.filter(r => r.category === this.category());
    const q = this.search().trim().toLowerCase();
    if (q) list = list.filter(r => r.swimmer.toLowerCase().includes(q) || r.club.toLowerCase().includes(q));
    return list;
  });

  constructor(private recordsService: RecordsService) {
  }

  onSearch(value: string): void {
    this.search.set(value);
  }
}

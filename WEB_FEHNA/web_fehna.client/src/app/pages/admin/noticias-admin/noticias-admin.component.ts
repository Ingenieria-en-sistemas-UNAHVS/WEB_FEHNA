import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Select} from 'primeng/select';
import {Checkbox} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {NewsService} from '../../../core/services/news.service';
import {NewsItem} from '../../../core/models/news.model';

const CATEGORY_OPTIONS = ['Natación', 'Clavados', 'Sincronizado', 'Waterpolo', 'Institucional'];

type NewsForm = Omit<NewsItem, 'id'>;

const EMPTY_FORM: NewsForm = {
  title: '',
  summary: '',
  category: 'Natación',
  imageUrl: '',
  date: new Date().toISOString().slice(0, 10),
  featured: false,
};

@Component({
  selector: 'app-noticias-admin',
  standalone: true,
  imports: [FormsModule, ButtonDirective, InputText, Textarea, Select, Checkbox, TableModule, TagModule, DialogModule],
  templateUrl: './noticias-admin.component.html',
  styleUrl: './noticias-admin.component.css',
})
export class NoticiasAdminComponent {
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly news = computed(() => this.newsService.getAll());
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);
  form: NewsForm = {...EMPTY_FORM};

  constructor(private newsService: NewsService) {
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form = {...EMPTY_FORM};
    this.showForm.set(true);
  }

  openEdit(item: NewsItem): void {
    this.editingId.set(item.id);
    const {id, ...rest} = item;
    this.form = {...rest};
    this.showForm.set(true);
  }

  save(): void {
    const id = this.editingId();
    if (id !== null) {
      this.newsService.update(id, this.form);
    } else {
      this.newsService.create(this.form);
    }
    this.showForm.set(false);
  }

  remove(id: number): void {
    if (confirm('¿Eliminar esta noticia?')) {
      this.newsService.delete(id);
    }
  }

  cancel(): void {
    this.showForm.set(false);
  }
}

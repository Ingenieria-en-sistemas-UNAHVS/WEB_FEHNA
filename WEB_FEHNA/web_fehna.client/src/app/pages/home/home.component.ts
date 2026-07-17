import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {NewsService} from '../../core/services/news.service';
import {EventsService} from '../../core/services/events.service';
import {AthletesService} from '../../core/services/athletes.service';
import {RecordsService} from '../../core/services/records.service';

const DISCIPLINE_BADGE: Record<string, 'success' | 'warn' | 'secondary' | 'info' | 'contrast'> = {
  'Natación': 'success',
  'Clavados': 'warn',
  'Sincronizado': 'secondary',
  'Waterpolo': 'info',
  'Institucional': 'contrast',
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonDirective, InputText, Textarea, Select, TableModule, TagModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly stats = [
    {value: '380+', label: 'Atletas activos'},
    {value: '47', label: 'Clubes afiliados'},
    {value: '12', label: 'Medallas F.H.N. 2025'},
    {value: '3', label: 'Deportistas rumbo a LA 2028'},
  ];
  readonly disciplines = ['Natación', 'Clavados', 'Waterpolo', 'Nado Sincronizado'];
  readonly affiliationCategories = ['Infantil', 'Juvenil', 'Junior', 'Absoluto'];
  readonly recordCategories = ['Todos', 'Infantil', 'Juvenil', 'Junior', 'Absoluto'];
  readonly contactSubjects = [
    'Afiliación de nadador',
    'Consulta de competencias',
    'Alianzas y patrocinio',
    'Otro',
  ];
  readonly featuredNews = computed(() => this.newsService.getFeatured());
  readonly sideNews = computed(() =>
    this.newsService.getAll().filter(n => n.id !== this.featuredNews()?.id).slice(0, 3),
  );
  readonly eventFilter = signal<'TODOS' | 'NACIONAL' | 'CLASIFICADOS' | 'WATERPOLO' | 'SINCRONIZADO'>('TODOS');
  readonly upcomingEvents = computed(() => this.eventsService.getAll().slice(0, 8));
  readonly athletes = computed(() => this.athletesService.getAll());
  readonly recordCategory = signal<string>('Todos');
  readonly recordEvent = signal<string>('Todos');
  readonly recordEvents = ['Todos', '50m Libre', '100m Libre', '100m Mariposa', '100m Pecho', '100m Espalda'];
  readonly records = computed(() => {
    let list = this.recordsService.getAll();
    const cat = this.recordCategory();
    const ev = this.recordEvent();
    if (cat !== 'Todos') list = list.filter(r => r.category === cat);
    if (ev !== 'Todos') list = list.filter(r => r.event === ev);
    return list;
  });
  readonly gallery = [
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=600&auto=format&fit=crop',
  ];
  readonly sponsors = ['Banco Atlántida', 'Cerveza Salva Vida', 'Tigo Honduras', 'Banpaís', 'Secretaría de Deportes'];
  readonly goldSponsors = ['COH', 'Aqua Cristal', 'Gimnasio Movimiento'];
  affiliationForm = {name: '', email: '', club: '', discipline: 'Natación', category: 'Infantil', message: ''};

  constructor(
    private newsService: NewsService,
    private eventsService: EventsService,
    private athletesService: AthletesService,
    private recordsService: RecordsService,
  ) {
  }

  badgeSeverity(discipline: string): 'success' | 'warn' | 'secondary' | 'info' | 'contrast' {
    return DISCIPLINE_BADGE[discipline] ?? 'contrast';
  }

  submitAffiliation(): void {
    // Placeholder until the real API endpoint exists: POST /api/affiliations
    alert('Gracias ' + (this.affiliationForm.name || 'nadador') + ', tu solicitud fue registrada (demo).');
    this.affiliationForm = {name: '', email: '', club: '', discipline: 'Natación', category: 'Infantil', message: ''};
  }
}

import {Component, computed} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Message} from 'primeng/message';
import {NewsService} from '../../../core/services/news.service';
import {AthletesService} from '../../../core/services/athletes.service';
import {EventsService} from '../../../core/services/events.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Message],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly cards = computed(() => [
    {label: 'Noticias publicadas', value: this.newsService.getAll().length, link: '/admin/noticias'},
    {label: 'Atletas registrados', value: this.athletesService.getAll().length, link: '/admin/atletas'},
    {label: 'Eventos programados', value: this.eventsService.getAll().length, link: '/admin/eventos'},
  ]);

  constructor(
    private newsService: NewsService,
    private athletesService: AthletesService,
    private eventsService: EventsService,
  ) {
  }
}

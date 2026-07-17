import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {NewsService} from '../../core/services/news.service';
import {NewsItem} from '../../core/models/news.model';

const DISCIPLINE_BADGE: Record<string, 'success' | 'warn' | 'secondary' | 'info' | 'contrast'> = {
  'Natación': 'success',
  'Clavados': 'warn',
  'Sincronizado': 'secondary',
  'Waterpolo': 'info',
  'Institucional': 'contrast',
};

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, ButtonDirective, TagModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent {
  readonly categories = ['Todas', 'Natación', 'Clavados', 'Sincronizado', 'Waterpolo', 'Institucional'];
  readonly activeCategory = signal('Todas');
  readonly news = computed<NewsItem[]>(() => {
    const all = this.newsService.getAll();
    const cat = this.activeCategory();
    return cat === 'Todas' ? all : all.filter(n => n.category === cat);
  });

  constructor(private newsService: NewsService) {
  }

  badgeSeverity(category: string): 'success' | 'warn' | 'secondary' | 'info' | 'contrast' {
    return DISCIPLINE_BADGE[category] ?? 'contrast';
  }
}

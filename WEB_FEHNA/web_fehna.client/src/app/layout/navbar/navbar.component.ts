import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly mobileOpen = signal(false);

  readonly links = [
    {path: '/', label: 'Inicio'},
    {path: '/noticias', label: 'Noticias'},
    {path: '/eventos', label: 'Calendario'},
    {path: '/atletas', label: 'Atletas'},
    {path: '/records', label: 'Récords'},
    {path: '/contacto', label: 'Contacto'},
  ];

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}

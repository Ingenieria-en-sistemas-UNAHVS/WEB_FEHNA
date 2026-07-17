import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonDirective],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  readonly links = [
    {path: '/admin/dashboard', label: 'Resumen', icon: '&#9632;'},
    {path: '/admin/noticias', label: 'Noticias', icon: '&#128240;'},
    {path: '/admin/atletas', label: 'Atletas', icon: '&#127946;'},
    {path: '/admin/eventos', label: 'Eventos', icon: '&#128197;'},
  ];

  constructor(public auth: AuthService, private router: Router) {
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}

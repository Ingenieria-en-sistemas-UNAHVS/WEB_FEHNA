import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'FEHNA | Federación Hondureña de Natación',
      },
      {
        path: 'noticias',
        loadComponent: () => import('./pages/noticias/noticias.component').then(m => m.NoticiasComponent),
        title: 'Noticias | FEHNA',
      },
      {
        path: 'atletas',
        loadComponent: () => import('./pages/atletas/atletas.component').then(m => m.AtletasComponent),
        title: 'Atletas | FEHNA',
      },
      {
        path: 'eventos',
        loadComponent: () => import('./pages/eventos/eventos.component').then(m => m.EventosComponent),
        title: 'Calendario | FEHNA',
      },
      {
        path: 'records',
        loadComponent: () => import('./pages/records/records.component').then(m => m.RecordsComponent),
        title: 'Récords | FEHNA',
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('./pages/sobre-nosotros/sobre-nosotros.component').then(m => m.SobreNosotrosComponent),
        title: 'Nosotros | FEHNA',
      },
      {
        path: 'contacto',
        loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent),
        title: 'Contacto | FEHNA',
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login.component').then(m => m.LoginComponent),
    title: 'Admin | FEHNA',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Panel Admin | FEHNA',
      },
      {
        path: 'noticias',
        loadComponent: () =>
          import('./pages/admin/noticias-admin/noticias-admin.component').then(m => m.NoticiasAdminComponent),
        title: 'Admin Noticias | FEHNA',
      },
      {
        path: 'atletas',
        loadComponent: () =>
          import('./pages/admin/atletas-admin/atletas-admin.component').then(m => m.AtletasAdminComponent),
        title: 'Admin Atletas | FEHNA',
      },
      {
        path: 'eventos',
        loadComponent: () =>
          import('./pages/admin/eventos-admin/eventos-admin.component').then(m => m.EventosAdminComponent),
        title: 'Admin Eventos | FEHNA',
      },
    ],
  },
  {path: '**', redirectTo: ''},
];

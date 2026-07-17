# WEB_FEHNA

Sitio web de la Federación Hondureña de Natación.
Backend en **ASP.NET Core 8** + Frontend en **Angular (standalone) + DaisyUI/Tailwind**.

## Estructura

```
WEB_FEHNA/
├─ WEB_FEHNA.sln
├─ WEB_FEHNA.Server/        # Proyecto ASP.NET Core 8 (host + futura API)
└─ web_fehna.client/        # Proyecto Angular standalone + DaisyUI
```

## Requisitos

- .NET 8 SDK
- Node.js 18+ y npm

## Cómo correr el proyecto en desarrollo

Opción A — desde Visual Studio: abre `WEB_FEHNA.sln` y presiona F5 (el proyecto
`WEB_FEHNA.Server` usa `Microsoft.AspNetCore.SpaProxy`, así que levanta
automáticamente `ng serve` y lo proxea).

Opción B — desde la terminal:

```bash
# Terminal 1: Angular
cd web_fehna.client
npm install
npm start          # http://localhost:4200

# Terminal 2: ASP.NET Core
cd WEB_FEHNA.Server
dotnet run
```

Abre `https://localhost:7236` (o el puerto que indique `dotnet run`).

## Conectar la API real más adelante

Todos los datos hoy son **mock**, servidos desde `web_fehna.client/src/app/core/services/*`
(`NewsService`, `AthletesService`, `EventsService`, `RecordsService`, `AuthService`).
Cada servicio ya está aislado detrás de los mismos métodos públicos (`getAll`, `create`,
`update`, `delete`, `login`, etc.), así que cuando la API esté lista solo hay que:

1. Inyectar `HttpClient` en el servicio correspondiente (ya está provisto en `app.config.ts`
   con `provideHttpClient(withFetch())`).
2. Reemplazar el arreglo/signal local por llamadas `http.get<T>('/api/...')`, etc.
3. Los componentes no necesitan cambios porque consumen los servicios, no los datos crudos.

El proyecto `WEB_FEHNA.Server` ya tiene `AddControllers()` / `MapControllers()` listos por si
la API se construye ahí mismo (ver `Controllers/PingController.cs` de ejemplo en
`GET /api/ping`), o puede quedar solo como host de la SPA si la API vive en otro servicio.

## Panel de administración

Ruta: `/admin/login`
Credenciales demo (mock, en `AuthService`): `admin@fehna.hn` / `fehna2026`

Desde el panel (`/admin/dashboard`) se pueden gestionar **Noticias**, **Atletas** y
**Eventos** (alta, edición, borrado) — por ahora sobre datos en memoria de la sesión.

## Estructura del frontend (`web_fehna.client/src/app`)

```
core/
  models/      Interfaces (NewsItem, Athlete, CompetitionEvent, SwimRecord, AdminUser)
  services/    Servicios con datos mock (listos para HttpClient)
  guards/      authGuard protege las rutas /admin/*
layout/
  navbar, footer, public-layout, admin-layout
pages/
  home, noticias, atletas, eventos, records, sobre-nosotros, contacto
  admin/login, admin/dashboard, admin/noticias-admin, admin/atletas-admin, admin/eventos-admin
```

## Tema visual

DaisyUI theme personalizado `fehna` (ver `tailwind.config.js`) con la paleta azul marino +
cian del diseño original de Figma: fondo `base-100 #0A1A2E`, acento `primary #1FD6F5`,
tipografía de títulos "Barlow Condensed" + cuerpo "Inter".

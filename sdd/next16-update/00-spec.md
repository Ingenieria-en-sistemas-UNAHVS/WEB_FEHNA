# SPEC — Migración Next.js 16 + Supabase SSR (WEB_FEHNA)

## Objetivo

Migrar el proyecto WEB_FEHNA a una arquitectura **Next.js 16 App Router** con **Server-Side Rendering (SSR)** y **Supabase SSR**, eliminando patterns legacy de Vite/SPA.

## Alcance

| Incluido | Excluido |
|----------|----------|
| SSR para sitio público (home y secciones) | OAuth providers (social login) |
| Supabase SSR: browser/server/middleware clients | WebSocket/realtime subscriptions |
| Admin panel con Server Components wrapper | Cambios en esquema de base de datos |
| Next.js App Router file-based routing | Cambios en RLS/políticas Supabase |
| Metadata/SEO para todas las páginas | Nuevas funcionalidades de negocio |
| Loading/error boundaries | CI/CD pipelines |

## Principios de diseño

1. **Server-first**: todo componente que no necesita interactividad debe ser Server Component
2. **Supabase SSR**: usar `@supabase/ssr` con 3 clientes (browser, server, middleware)
3. **File-based routing**: eliminar el router custom y usar Next.js App Router
4. **Colocation**: cada ruta admin tiene su propia carpeta con `page.tsx`
5. **Zero regressions**: toda la funcionalidad FEHNA existente se preserva

## Stack objetivo

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| CSS | Tailwind CSS 4 |
| Components | shadcn/ui (Radix) |
| Routing | Next.js App Router |
| Auth | Supabase Auth + `@supabase/ssr` |
| DB | Supabase PostgreSQL (existente) |
| Storage | Supabase Storage (existente) |
| Package mgr | pnpm |

## Arquitectura de archivos objetivo

```
src/
├── app/
│   ├── layout.tsx                    # Root layout: theme + auth provider
│   ├── page.tsx                      # Home (Server Component — SSR)
│   ├── loading.tsx                   # Home skeleton
│   ├── error.tsx                     # Global error boundary
│   ├── not-found.tsx                 # 404 page
│   ├── actions/
│   │   └── auth.ts                   # Server actions: signIn, signOut
│   ├── admin/
│   │   ├── layout.tsx                # Admin shell (Client) + RequireAuth
│   │   ├── page.tsx                  # Dashboard
│   │   ├── loading.tsx               # Admin skeleton
│   │   ├── error.tsx                 # Admin error boundary
│   │   ├── login/page.tsx            # Login page
│   │   ├── clubes/page.tsx           # Clubes admin
│   │   ├── deportistas/page.tsx      # Deportistas admin
│   │   ├── eventos/page.tsx          # Eventos admin
│   │   ├── tiempos/page.tsx          # Tiempos admin
│   │   ├── noticias/page.tsx         # Noticias admin
│   │   ├── patrocinadores/page.tsx   # Patrocinadores admin
│   │   ├── contacto/page.tsx         # Contacto admin
│   │   └── usuarios/page.tsx         # Usuarios admin
│   └── (public)/                     # Route group (opcional para futuras páginas)
├── auth/
│   ├── AuthProvider.tsx              # Client context
│   └── RequireAuth.tsx               # Client guard (usa redirect)
├── admin/
│   ├── AdminShell.tsx                # Shell: sidebar + topbar
│   ├── useCrud.ts                    # Generic CRUD hook
│   ├── useCatalogos.ts              # Catalog loader
│   ├── MediaUploader.tsx            # Media upload component
│   └── modules/                      # 9 módulos admin
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server client
│   │   ├── middleware.ts             # Middleware helper
│   │   └── index.ts                  # Re-exports + types
│   ├── data/                         # NEW: server data access layer
│   │   ├── noticias.ts
│   │   ├── eventos.ts
│   │   ├── deportistas.ts
│   │   ├── tiempos.ts
│   │   ├── patrocinadores.ts
│   │   └── contacto.ts
│   ├── database.types.ts
│   ├── mediaConfig.ts
│   ├── mediaService.ts
│   ├── tiempo.ts
│   └── contactoIconos.tsx
├── components/
│   ├── theme-provider.tsx
│   ├── public/                       # NEW: home page sections
│   │   ├── hero.tsx
│   │   ├── navigation.tsx
│   │   ├── noticias-section.tsx
│   │   ├── eventos-section.tsx
│   │   ├── atletas-section.tsx
│   │   ├── galeria-section.tsx
│   │   ├── rankings-section.tsx
│   │   ├── patrocinadores-section.tsx
│   │   ├── contacto-section.tsx
│   │   └── footer.tsx
│   └── ui/                           # shadcn/ui
└── modules/home/sections/contacts/   # Contact section internals
```

## Lo que se elimina

- `src/lib/router.tsx` — custom router
- `src/app/App.tsx` — monolito 1247 líneas
- `src/app/admin/[[...slug]]/` — catch-all route
- `src/views/AdminPanel.tsx` — obsoleto
- `src/lib/supabase.ts` — singleton legacy
- `src/lib/usePublic.ts` — hooks client-side (reemplazados por `lib/data/`)

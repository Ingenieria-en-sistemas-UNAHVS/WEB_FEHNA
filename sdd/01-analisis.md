# 01 — Análisis del Proyecto Actual

## Stack Actual

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Build | Vite | 6.3.5 |
| UI | React | 18.3.1 |
| CSS | Tailwind CSS | 4.1.12 |
| Components | shadcn/ui + MUI | varios |
| Routing | Custom (History API) | - |
| Auth | Supabase Auth | ^2.110.7 |
| DB | Supabase PostgreSQL | - |
| Storage | Supabase Storage | 8 buckets |
| Package mgr | pnpm | - |

## Arquitectura de archivos

```
src/
├── main.tsx              # Entry: AuthProvider > RouterProvider > Rutas
├── vite-env.d.ts         # Env types (VITE_ prefix)
├── app/
│   ├── App.tsx           # Monolito público (64KB)
│   └── components/ui/    # ~40 shadcn/ui components
├── auth/
│   ├── AuthProvider.tsx   # Context: session + perfil + roles
│   └── RequireAuth.tsx    # Route guard
├── admin/
│   ├── AdminLayout.tsx    # Shell + switch de módulos por ruta
│   ├── useCrud.ts         # Generic CRUD hook
│   └── modules/           # 9 módulos admin
├── lib/
│   ├── supabase.ts        # Singleton client (import.meta.env)
│   ├── database.types.ts  # Auto-generated DB types (20KB)
│   ├── router.tsx         # Custom mini-router
│   ├── mediaConfig.ts     # Media module configuration
│   ├── mediaService.ts    # CRUD + Storage service
│   └── usePublic.ts       # Public data hooks
├── pages/
│   ├── AdminLogin.tsx     # Login page
│   └── AdminPanel.tsx     # Old panel (deprecated)
└── styles/
    ├── index.css          # Entry: fonts > tailwind > theme
    ├── tailwind.css        # Tailwind v4 directives
    └── theme.css           # FEHNA custom theme (5KB)
```

## Rutas actuales

| Ruta | Componente | Protegida |
|------|-----------|-----------|
| `/` | App.tsx (público) | No |
| `/admin/login` | AdminLogin | No |
| `/admin` | AdminLayout > Dashboard | Sí |
| `/admin/clubes` | ClubesAdmin | Sí |
| `/admin/deportistas` | DeportistasAdmin | Sí |
| `/admin/eventos` | EventosAdmin | Sí |
| `/admin/tiempos` | TiemposAdmin | Sí |
| `/admin/noticias` | NoticiasAdmin | Admin only |
| `/admin/patrocinadores` | PatrocinadoresAdmin | Admin only |
| `/admin/contacto` | ContactoAdmin | Admin only |
| `/admin/usuarios` | UsuariosAdmin | Admin only |

## Puntos de dolor identificados

1. **App.tsx monolítico (64KB):** Imposible de mantener
2. **Sin SSR/SEO:** Sitio público invisible a crawlers
3. **Custom router:** Innecesario con Next.js App Router
4. **Dependencias mixtas:** shadcn/ui + MUI + 40+ paquetes Radix
5. **Sin tsconfig.json:** No hay configuración de TypeScript explícita
6. **VITE_ env vars:** Deben migrar a NEXT_PUBLIC_
7. **Client-only Supabase:** Sin aprovechar Server Components

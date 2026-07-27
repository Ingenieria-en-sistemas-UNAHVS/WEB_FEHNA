# 07 — Resultados de la Migración

## Versiones instaladas

| Paquete | Versión |
|---------|---------|
| Next.js | 16.2.12 |
| React | 19.2.8 |
| React DOM | 19.2.8 |
| @supabase/ssr | ^0.12.3 |
| @supabase/supabase-js | ^2.110.8 |
| @tailwindcss/postcss | 4.3.3 |
| Tailwind CSS | 4.3.3 |
| TypeScript | 5.9.3 |

## Resultado del build

```
✓ Compiled successfully in 2.5s
✓ TypeScript passed in 5.9s
✓ Generating static pages (4/4) in 646ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /admin/[[...slug]]
└ ○ /admin/login
```

## Estructura final

```
WEB_FEHNA/
├── next.config.ts           # Configuración Next.js 16
├── tsconfig.json            # TypeScript con path aliases
├── postcss.config.mjs       # Tailwind v4 via PostCSS
├── proxy.ts                 # Next.js 16 proxy (antes middleware)
├── package.json             # Scripts: next dev, next build
├── .env.example             # NEXT_PUBLIC_SUPABASE_URL, KEY
├── .env.local               # Credenciales Supabase (gitignored)
│
├── sdd/                     # Documentación de diseño (7 archivos)
│
├── src/
│   ├── app/                 # App Router (Next.js 16)
│   │   ├── layout.tsx       # Root: HTML + ThemeProvider + AuthProvider
│   │   ├── page.tsx         # Home: App con RouterProvider (ssr: false)
│   │   ├── globals.css      # Tailwind + fonts + theme
│   │   ├── App.tsx          # Monolito público (sin cambios)
│   │   └── admin/
│   │       ├── [[...slug]]/page.tsx  # Panel protegido
│   │       └── login/               # Login page
│   │
│   ├── lib/
│   │   ├── supabase.ts       # Singleton legacy (compatibilidad)
│   │   ├── router.tsx        # Custom router ("use client")
│   │   ├── database.types.ts # Tipos Supabase (sin cambios)
│   │   └── supabase/
│   │       ├── client.ts     # createBrowserClient()
│   │       ├── server.ts     # createClient() con cookies()
│   │       ├── middleware.ts # Helper para el proxy
│   │       └── index.ts
│   │
│   ├── auth/
│   │   ├── AuthProvider.tsx  # "use client" + @supabase/ssr
│   │   └── RequireAuth.tsx   # Route guard (usa custom router)
│   │
│   ├── admin/               # Admin modules (sin cambios funcionales)
│   ├── views/               # Antes src/pages/ (rename para evitar Pages Router)
│   ├── components/           # shadcn/ui + ThemeProvider
│   ├── modules/              # Módulos del sitio público
│   └── styles/               # CSS (fonts, theme)
│
└── guidelines/               # Documentación original preservada
```

## Cambios realizados por fase

### Fase 1: Inicialización Next.js 16
- Instalado `next@latest` (16.2.12), `react@latest` (19.2.8), `react-dom@latest` (19.2.8)
- Instalado `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- Creado `tsconfig.json` con path alias `@/*` -> `src/*`
- Creado `next.config.ts` con remotePatterns para Supabase Storage
- Reemplazado `@tailwindcss/vite` por `@tailwindcss/postcss`
- Actualizado `postcss.config.mjs` para Tailwind v4 + Next.js
- `pnpm-workspace.yaml`: añadido `win32` y `msvc` a arquitecturas soportadas
- Actualizados scripts: `dev` -> `next dev`, `build` -> `next build`
- Eliminados: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`

### Fase 2: Supabase SSR
- Instalado `@supabase/ssr ^0.12.3`
- Creado `src/lib/supabase/client.ts` — `createBrowserClient()` con "use client"
- Creado `src/lib/supabase/server.ts` — `createClient()` usando `cookies()` de `next/headers`
- Creado `proxy.ts` — Next.js 16 proxy que refresca sesión Supabase vía `getClaims()`
- Actualizado `.env.example`: `VITE_` -> `NEXT_PUBLIC_`
- Creado `.env.local` con credenciales del proyecto
- Actualizado `AuthProvider.tsx`: usa `createBrowserClient()` de `@/lib/supabase/client`
- Legacy `supabase.ts` preservado para compatibilidad con código existente

### Fase 3: Routing (App Router)
- Creado `src/app/layout.tsx` — root layout con metadata + ThemeProvider + AuthProvider
- Creado `src/app/page.tsx` — home público con `dynamic(App, { ssr: false })`
- Creado `src/app/admin/[[...slug]]/page.tsx` — panel protegido (RequireAuth)
- Creado `src/app/admin/login/` — login con SSR deshabilitado
- `src/pages/` renombrado a `src/views/` para evitar conflicto con Pages Router
- Eliminados: `main.tsx`, `index.html`, `vite-env.d.ts`, `vite.config.ts`

### Fase 4: Componentes
- Añadido `"use client"` a: `AuthProvider.tsx`, `router.tsx`, `supabase/client.ts`
- Creado `ThemeProvider` wrapper para `next-themes`
- `AdminLogin` envuelto en `dynamic(..., { ssr: false })` para evitar SSR en login
- Admin layout usando `dynamic(AdminLayout, { ssr: false })` con `RouterProvider`

### Fase 5: Verificación
- `pnpm build`: ✓ exitoso (2.5s compile, 5.9s TypeScript, 646ms pages)
- 4 rutas generadas: `/`, `/admin/[[...slug]]`, `/admin/login`, `/_not-found`
- Limpiados archivos residuales de Vite

## Pendientes / Mejoras futuras

1. **Dividir App.tsx (64KB)** en componentes por sección
2. Migrar admin modules a rutas individuales (app/admin/clubes/page.tsx, etc.)
3. Reemplazar custom router (`@/lib/router`) por `next/navigation` gradualmente
4. Aprovechar Server Components para datos públicos (noticias, eventos, etc.)
5. Optimizar imágenes con `next/image` en lugar de `<img>`
6. Activar React Compiler (`reactCompiler: true` en next.config)
7. Migrar `next-themes` a manejo de tema vía cookies (evitar flash)
8. Añadir metadata a páginas admin (OG, titles específicos)

# 03 — Plan de Migración

## Fase 1: Inicialización de Next.js 15

**Objetivo:** Crear la estructura base de Next.js sin romper el proyecto Vite existente.

### Tareas
1. `pnpm add next@latest react@latest react-dom@latest`
2. `pnpm add -D @types/node @types/react @types/react-dom typescript`
3. Crear `tsconfig.json` con path alias `@/*` -> `src/*`
4. Crear `next.config.ts` con Tailwind CSS v4 config
5. Actualizar `postcss.config.mjs` para Next.js + Tailwind v4
6. Eliminar dependencias Vite: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`
7. Actualizar `package.json` scripts: `dev` -> `next dev`, `build` -> `next build`
8. Mover `src/styles/index.css` -> `src/app/globals.css` con ajustes Tailwind v4

### Criterios de aceptación
- [ ] `pnpm dev` inicia Next.js dev server
- [ ] `next.config.ts` resuelve alias `@/`
- [ ] Tailwind v4 funciona en Next.js (no Vite plugin)
- [ ] TypeScript compila sin errores

---

## Fase 2: Supabase SSR

**Objetivo:** Reemplazar el cliente Supabase singleton de Vite por el patrón SSR de Next.js.

### Tareas
1. `pnpm add @supabase/ssr @supabase/supabase-js@latest`
2. Crear `src/lib/supabase/client.ts` (browser client)
3. Crear `src/lib/supabase/server.ts` (server client)
4. Crear `src/lib/supabase/middleware.ts` (middleware client factory)
5. Crear `middleware.ts` en raíz (session refresh)
6. Actualizar `.env.example`: `VITE_` -> `NEXT_PUBLIC_`
7. Crear `src/env.ts` con validación de env vars
8. Eliminar `src/vite-env.d.ts` (redundante)
9. Actualizar `src/auth/AuthProvider.tsx`: usar `createBrowserClient()`
10. Verificar que `database.types.ts` se sigue exportando desde `lib/supabase/types.ts`

### Criterios de aceptación
- [ ] Cliente browser funciona en Client Components
- [ ] Cliente server funciona en Server Components
- [ ] Middleware refresca sesión automáticamente
- [ ] Auth login/logout funciona
- [ ] Variables `NEXT_PUBLIC_` se leen correctamente

---

## Fase 3: App Router — Routing y Layouts

**Objetivo:** Reemplazar el custom router por Next.js App Router con protección de rutas.

### Tareas
1. Crear `src/app/layout.tsx` (root: HTML + providers)
2. Crear `src/app/page.tsx` (redirige al sitio público o es el home)
3. Crear `src/app/(public)/layout.tsx` y `page.tsx`
4. Crear `src/app/admin/layout.tsx` (admin shell con protección)
5. Crear `src/app/admin/login/page.tsx`
6. Crear páginas para cada módulo admin (`app/admin/[modulo]/page.tsx`)
7. Migrar `src/app/App.tsx` contenido a `(public)/page.tsx` con lazy loading
8. Eliminar `src/lib/router.tsx`, `src/main.tsx`, `index.html`
9. Actualizar imports: `@/lib/router` -> `next/navigation` (Link, useRouter, redirect)

### Criterios de aceptación
- [ ] `/` renderiza el sitio público
- [ ] `/admin/login` renderiza login
- [ ] `/admin` y sub-rutas renderizan el panel protegido
- [ ] Redirecciones de auth funcionan
- [ ] Eliminado el custom router

---

## Fase 4: Componentes — Server vs Client

**Objetivo:** Dividir componentes correctamente entre Server y Client Components.

### Tareas
1. Marcar componentes interactivos con `"use client"`:
   - AuthProvider, AdminLogin, AdminLayout
   - Todos los admin modules (formularios)
   - useCrud, useCatalogos, usePublic (hooks)
   - MediaUploader
2. Componentes de datos públicos -> Server Components (si es viable):
   - Secciones del home que solo leen datos
3. Migrar `App.tsx` (64KB) a componentes separados por sección
4. Verificar que todos los `import.meta.env` se reemplazaron por `process.env.NEXT_PUBLIC_`
5. Eliminar referencias a `figma:asset/` (no existe en Next.js sin plugin)

### Criterios de aceptación
- [ ] No hay errores de hidratación
- [ ] Componentes server/client correctamente separados
- [ ] App.tsx dividido en secciones manejables

---

## Fase 5: Configuración Final y Verificación

**Objetivo:** Pulir, probar y preparar para deploy.

### Tareas
1. Configurar `next.config.ts`: image domains (supabase storage), redirects
2. Crear `.env.local` con valores reales (gitignored)
3. `pnpm build` exitoso (sin errores TS)
4. Verificar todas las rutas manualmente
5. Probar auth flow completo (login, panel, logout)
6. Probar CRUD en todos los módulos admin
7. Probar media uploads
8. Limpiar archivos residuales (dist_check2/, default_shadcn_theme.css, etc.)
9. Optimizar imports

### Criterios de aceptación
- [ ] `pnpm build` completa sin errores
- [ ] `pnpm dev` funciona en todas las rutas
- [ ] Auth funciona correctamente
- [ ] CRUD funciona en todos los módulos
- [ ] Media uploads funcionan
- [ ] Sitio público visible

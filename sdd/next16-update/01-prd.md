# PRD — Next.js 16 + Supabase SSR Update

## Resumen ejecutivo

Actualización completa del frontend de WEB_FEHNA de una arquitectura Vite SPA (con router custom) a Next.js 16 App Router con Server-Side Rendering y Supabase SSR. El objetivo es obtener SEO funcional, mejor rendimiento de carga inicial, y una arquitectura mantenible siguiendo las mejores prácticas de Next.js y Supabase.

---

## Requisitos funcionales

### RF1: Server-Side Rendering del sitio público
- La página principal (`/`) debe renderizarse en el servidor con datos reales de Supabase
- Las secciones (noticias, eventos, atletas, tiempos, patrocinadores, contacto) deben poblar sus datos desde `lib/data/` usando `createClient()` server-side
- Los componentes puramente visuales (hero, footer, navigation) deben ser Server Components

### RF2: App Router enrutando todo
- Reemplazar `@/lib/router.tsx` (History API custom) por `next/navigation`
- Cada módulo admin debe tener su propia ruta: `/admin/clubes`, `/admin/deportistas`, etc.
- La protección de rutas admin debe usar `proxy.ts` (middleware de Next.js 16) + `RequireAuth`

### RF3: Supabase SSR con 3 clientes
- Browser client (`createBrowserClient`) para Client Components interactivos
- Server client (`createClient`) para Server Components y Server Actions
- Middleware client en `proxy.ts` para refresco automático de sesión

### RF4: Server Actions para auth
- `signIn(formData)` — login con email + password, revalidate + redirect
- `signOut()` — logout, revalidate + redirect

### RF5: Admin panel refactorizado
- `app/admin/layout.tsx` como shell con `RequireAuth`
- `AdminShell.tsx` con sidebar + topbar usando `next/link` y `usePathname()`
- Páginas por módulo en `app/admin/{modulo}/page.tsx`

### RF6: SEO y metadata
- `generateMetadata()` en la página principal
- Títulos y descripciones para todas las páginas
- OpenGraph básico para compartir en redes

### RF7: Estados de carga y error
- `loading.tsx` para cada ruta (home, admin)
- `error.tsx` error boundaries
- `not-found.tsx` página 404

---

## Requisitos no funcionales

### NFR1: Cero regresiones
- Auth login/logout debe funcionar igual
- CRUD en todos los módulos admin debe funcionar
- Media uploads (Storage) debe funcionar
- Todas las secciones del sitio público visibles

### NFR2: Performance
- LCP (Largest Contentful Paint) mejorado gracias a SSR
- Code splitting automático por ruta (Next.js)
- `loading.tsx` con skeletons para evitar CLS

### NFR3: Mantenibilidad
- Componentes por sección (< 300 líneas cada uno)
- Server Components por defecto, `"use client"` solo donde necesario
- Capa de datos separada (`lib/data/`) con funciones puras tipadas

### NFR4: TypeScript estricto
- Sin `any` en nuevas funciones de datos
- Tipos de Supabase generados (`database.types.ts`) como source of truth
- `pnpm build` debe pasar sin errores TS

---

## Fases de implementación

### Fase 1: Routing & Architecture Cleanup
**Duración estimada:** 4-6 horas de desarrollo

| ID | Tarea | Prioridad | Dependencias |
|----|-------|-----------|-------------|
| T1.1 | Eliminar custom router + migrar imports | P0 | - |
| T1.2 | Crear server actions (auth.ts) + refactorizar AdminLogin | P0 | T1.1 |
| T1.3 | Migrar AdminLayout → app/admin/layout.tsx + AdminShell | P0 | T1.1 |
| T1.4 | Crear páginas individuales por módulo admin | P0 | T1.3 |

### Fase 2: SSR Data Layer
**Duración estimada:** 4-6 horas de desarrollo

| ID | Tarea | Prioridad | Dependencias |
|----|-------|-----------|-------------|
| T2.1 | Crear capa de datos server-side (lib/data/) | P0 | - |
| T2.2 | Split del monolito App.tsx en secciones | P0 | - |
| T2.3 | Refactorizar app/page.tsx como Server Component | P0 | T2.1, T2.2 |

### Fase 3: Auth & Middleware Polish
**Duración estimada:** 1-2 horas

| ID | Tarea | Prioridad | Dependencias |
|----|-------|-----------|-------------|
| T3.1 | Mejorar proxy.ts con protección de rutas | P1 | T1.4 |
| T3.2 | Limpiar capa legacy (singleton supabase.ts) | P1 | T2.1 |

### Fase 4: SEO & Production Quality
**Duración estimada:** 1-2 horas

| ID | Tarea | Prioridad | Dependencias |
|----|-------|-----------|-------------|
| T4.1 | Metadata, loading/error boundaries | P1 | T2.3 |
| T4.2 | Verificación final + limpieza | P1 | T4.1 |

---

## Criterios de aceptación

### AC1: Build exitoso
```bash
pnpm build  # 0 errores TypeScript, 0 warnings
```

### AC2: SSR funcional
- `curl http://localhost:3000/` retorna HTML con contenido de noticias, eventos, etc.
- View Source muestra datos reales (no solo un div vacío con JS)

### AC3: Auth funcional
- Login en `/admin/login` funciona
- Panel admin accesible con perfil y rol
- Logout limpia sesión y redirige

### AC4: Admin CRUD funcional
- Todos los 9 módulos admin cargan y permiten CRUD
- Navegación entre módulos funciona con `<Link href=...>`
- MediaUploader funciona

### AC5: Sin código legacy
- `rg "from \"@/lib/router\"" src/` → 0 matches
- `rg "from \"@/lib/supabase\"" src/` → 0 matches (todos usan `supabase/client` o `supabase/server`)
- `rg "import.meta.env" src/` → 0 matches

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| App.tsx tiene 1247 líneas con lógica entremezclada | Alta | Medio | Extraer secciones una por una, verificando cada una |
| Los hooks client-side (`usePublic`, `useCrud`) dependen del singleton | Alta | Bajo | Migrar uno por uno, el singleton se elimina al final |
| MediaService usa singleton supabase | Media | Bajo | Cambiar `import { supabase }` → `import { createBrowserClient }` |
| Proxy.ts podría interferir con rutas API/storage de Next.js | Baja | Alto | El matcher ya excluye `_next/static`, `_next/image`, y assets |

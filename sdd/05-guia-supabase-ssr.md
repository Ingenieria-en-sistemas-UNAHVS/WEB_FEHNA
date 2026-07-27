# 05 — Guía Supabase SSR para FEHNA

## Resumen del patrón

El paquete `@supabase/ssr` proporciona tres fábricas de cliente:

1. `createBrowserClient` → Client Components (`"use client"`)
2. `createServerClient` → Server Components, Route Handlers, Server Actions
3. `createServerClient` en middleware → Refresco automático de sesión

## Instalación

```bash
pnpm add @supabase/ssr @supabase/supabase-js
pnpm remove @supabase/supabase-js  # Quitar versión anterior si es standalone
```

## Estructura de archivos de Supabase

```
src/lib/supabase/
├── client.ts      # Browser client (para "use client")
├── server.ts      # Server client (para RSC)
├── middleware.ts   # Helper para el middleware global
├── types.ts       # Re-export de database.types
└── (database.types.ts se mantiene en src/lib/)
```

## Flujo de autenticación

```
1. Usuario visita /admin
2. Middleware.ts: verifica sesión vía cookie
3. Sin sesión → redirect a /admin/login
4. Usuario hace login en /admin/login
5. AuthProvider (cliente): supabase.auth.signInWithPassword()
6. Supabase establece cookies de sesión
7. Middleware.ts las detecta en el próximo request
8. Session refresh automático en cada request
```

## Consideraciones para FEHNA

### RLS: Sin cambios
Las políticas RLS de Supabase siguen funcionando igual. La diferencia es que ahora los Server Components pueden hacer queries con el rol del usuario autenticado (el JWT se pasa vía cookie).

### Storage: Requiere cliente
Las operaciones de Supabase Storage (`supabase.storage.from()`) solo funcionan en el cliente (requieren el JWT de sesión). No cambia la lógica actual de `mediaService.ts`.

### Realtime: Solo cliente
Las suscripciones realtime de Supabase solo funcionan en Client Components. No aplica actualmente a FEHNA.

### Tipos generados: Sin cambios
`database.types.ts` se mantiene exactamente igual. Los tipos son compatibles con `@supabase/ssr`.

## Migración de hooks existentes

### useCrud (admin CRUD genérico)
```typescript
// ANTES
import { supabase } from "@/lib/supabase";
const { data } = await supabase.from(tabla).select("*");

// DESPUÉS
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
const { data } = await supabase.from(tabla).select("*");
```

### usePublic (datos públicos)
```typescript
// Opción A: Server Component (recomendado para datos públicos)
import { createClient } from "@/lib/supabase/server";
export default async function NoticiasSection() {
  const supabase = await createClient();
  const { data } = await supabase.from("noticias").select("*").eq("publicada", true);
  // ...
}

// Opción B: Client Component (si necesita interactividad)
"use client";
import { createClient } from "@/lib/supabase/client";
// ...mismo patrón que useCrud
```

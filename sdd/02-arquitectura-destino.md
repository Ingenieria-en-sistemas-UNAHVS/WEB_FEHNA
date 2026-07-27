# 02 — Arquitectura Destino

## Stack Objetivo

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js | 15 (latest) |
| UI | React | 19 |
| CSS | Tailwind CSS | 4.x |
| Components | shadcn/ui (Radix) | latest |
| Routing | Next.js App Router | - |
| Auth | Supabase Auth + @supabase/ssr | latest |
| DB | Supabase PostgreSQL | existente |
| Package mgr | pnpm | - |

## Estructura de archivos objetivo

```
WEB_FEHNA/
├── next.config.ts
├── tsconfig.json
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── middleware.ts                  # Supabase session refresh
│
├── sdd/                           # SDD (este directorio)
│
├── guidelines/                    # Documentación existente (se mantiene)
├── DB_Design/                     # SQL existente (se mantiene)
│
├── public/                        # Assets estáticos
│   └── assets/                    # Migrados de src/assets/
│
├── src/
│   ├── app/                       # App Router
│   │   ├── layout.tsx            # Root layout (providers wrapper)
│   │   ├── page.tsx              # Home page (pública)
│   │   ├── globals.css           # Tailwind + theme imports
│   │   │
│   │   ├── (public)/             # Route group: sitio público
│   │   │   ├── layout.tsx        # Layout público
│   │   │   ├── page.tsx          # Home (secciones FEHNA)
│   │   │   └── _components/      # Componentes del sitio público
│   │   │
│   │   └── admin/                # Panel de administración
│   │       ├── layout.tsx         # Admin shell (sidebar + topbar)
│   │       ├── login/
│   │       │   └── page.tsx       # AdminLogin
│   │       ├── page.tsx           # Dashboard
│   │       ├── clubes/
│   │       │   └── page.tsx
│   │       ├── deportistas/
│   │       │   └── page.tsx
│   │       ├── eventos/
│   │       │   └── page.tsx
│   │       ├── tiempos/
│   │       │   └── page.tsx
│   │       ├── noticias/
│   │       │   └── page.tsx
│   │       ├── patrocinadores/
│   │       │   └── page.tsx
│   │       ├── contacto/
│   │       │   └── page.tsx
│   │       └── usuarios/
│   │           └── page.tsx
│   │
│   ├── auth/                     # Auth (se mantiene, con ajustes)
│   │   ├── AuthProvider.tsx       # Client context
│   │   └── RequireAuth.tsx        # Client guard (usa redirect)
│   │
│   ├── admin/                    # Admin components (merge con app/admin)
│   │   ├── AdminLayout.tsx        # -> app/admin/layout.tsx
│   │   ├── useCrud.ts             # Se mantiene
│   │   ├── useCatalogos.ts        # Se mantiene
│   │   ├── MediaUploader.tsx      # Se mantiene
│   │   └── modules/               # -> app/admin/[module]/page.tsx
│   │
│   ├── lib/                       # Utilidades (se mantiene)
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser client (use client)
│   │   │   ├── server.ts          # Server client (RSC, route handlers)
│   │   │   ├── middleware.ts      # Middleware client
│   │   │   └── types.ts           # Re-export database.types
│   │   ├── database.types.ts      # Auto-generated (sin cambios)
│   │   ├── mediaConfig.ts         # Sin cambios
│   │   ├── mediaService.ts        # Ajustar a server/browser
│   │   ├── usePublic.ts           # Convertir a server + client
│   │   └── tiempo.ts              # Sin cambios
│   │
│   ├── components/               # Componentes compartidos
│   │   └── ui/                   # shadcn/ui (se mantiene)
│   │
│   └── modules/                  # Módulos del sitio público
│       └── home/
│
├── .env.example                   # Actualizado: NEXT_PUBLIC_
└── .env.local                     # (gitignored)
```

## Patrones de Supabase en Next.js

### Browser Client (`src/lib/supabase/client.ts`)
```typescript
// Para Client Components ("use client")
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
```

### Server Client (`src/lib/supabase/server.ts`)
```typescript
// Para Server Components, Route Handlers, Server Actions
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cookies) => ... } }
  );
};
```

### Middleware (`middleware.ts`)
```typescript
// Refresca la sesión automáticamente en cada request
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // ...configurar supabase con cookies del request/response
  // await supabase.auth.getUser() refresca la sesión
  return response;
}
```

### AuthProvider (Client Component)
```typescript
"use client";
// Usa createBrowserClient() en lugar del singleton con import.meta.env
// El resto del código del AuthProvider actual se mantiene casi igual
```

## Variables de entorno

| Antes (Vite) | Después (Next.js) |
|---|---|
| `VITE_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` |

Solo las variables con `NEXT_PUBLIC_` están disponibles en el navegador.

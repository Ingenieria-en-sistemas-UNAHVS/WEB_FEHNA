# 04 — Guía Next.js + Supabase (Skill)

## Paquetes requeridos

```bash
pnpm add next@latest react@latest react-dom@latest
pnpm add @supabase/ssr @supabase/supabase-js
pnpm add -D @types/node @types/react @types/react-dom typescript
```

## 1. Cliente Browser (`src/lib/supabase/client.ts`)

Para usar en **Client Components** (`"use client"`):

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
```

## 2. Cliente Server (`src/lib/supabase/server.ts`)

Para **Server Components, Route Handlers, Server Actions**:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorar en Server Components (solo lectura)
          }
        },
      },
    }
  );
}
```

## 3. Proxy (`proxy.ts`) — Next.js 16

En Next.js 16, `middleware.ts` se renombra a `proxy.ts` y la función exportada se llama `proxy`.
Refresca la sesión de Supabase en cada request:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteger rutas admin
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## 4. AuthProvider Adaptado (`src/auth/AuthProvider.tsx`)

Mínimo cambio: reemplazar el import del singleton por `createClient()`:

```typescript
"use client";
// ... imports igual ...
import { createClient } from "@/lib/supabase/client";  // ANTES: "@/lib/supabase"

export function AuthProvider({ children }: { children: ReactNode }) {
  // ...
  useEffect(() => {
    const supabase = createClient();  // NUEVO: instancia por render
    // ... mismo código de sesión ...
  }, []);
  // ...
}
```

## 5. Variables de Entorno

```bash
# .env.local (no commitear)
NEXT_PUBLIC_SUPABASE_URL=https://tmpubpndujcyeablirah.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

# .env.example (sí commitear)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx
```

## 6. Diferencias Clave Vite -> Next.js

| Concepto | Vite | Next.js |
|----------|------|---------|
| Server | No existe | RSC, Server Actions, Route Handlers |
| Env vars | `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| Routing | Custom o react-router | File-based (app/) |
| CSS entry | index.html `<script>` | layout.tsx + globals.css |
| Entry point | main.tsx + index.html | app/layout.tsx |
| Data fetching | Hooks en cliente | Server Components + hooks |
| Auth | Solo cliente | Middleware + server + cliente |
| Build | vite build | next build |
| Dev | vite | next dev |

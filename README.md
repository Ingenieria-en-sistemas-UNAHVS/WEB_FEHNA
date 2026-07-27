
# Federación Hondureña de Natación

This is a code bundle for Federación Hondureña de Natación. The original project is available at https://www.figma.com/design/wo9d61kyR8dUTuRJyMHJJl/Federaci%C3%B3n-Hondure%C3%B1a-de-Nataci%C3%B3n.

## Stack

- **Next.js 16** (App Router)
- **React 19** / TypeScript
- **TailwindCSS 4**
- **Supabase** (auth, base de datos, RLS)
- **Radix UI** / **shadcn/ui** components

## Requisitos previos

1. Clona el repositorio
2. Copia `.env.example` → `.env.local` y configura las credenciales de Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Ejecución local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
pnpm build
pnpm start
```
  
# SDD — Migración WEB_FEHNA a Next.js 15

## Documentos

| # | Documento | Descripción |
|---|-----------|-------------|
| 01 | [Análisis del Proyecto Actual](01-analisis.md) | Estado actual: Vite SPA, dependencias, arquitectura |
| 02 | [Arquitectura Destino](02-arquitectura-destino.md) | Estructura final: Next.js App Router + Supabase SSR |
| 03 | [Plan de Migración](03-plan-migracion.md) | Fases, tareas, criterios de aceptación |
| 04 | [Guía Next.js + Supabase](04-guia-nextjs-supabase.md) | Patrones: client browser/server, middleware, RSC |
| 05 | [Guía Supabase SSR](05-guia-supabase-ssr.md) | Instalación, configuración, mejores prácticas |
| 06 | [Análisis de Riesgos](06-riesgos.md) | Riesgos identificados y mitigaciones |

## Resumen ejecutivo

**Proyecto:** WEB_FEHNA — Sitio web + panel de administración de la Federación Hondureña de Natación.

**Estado actual:**
- Vite 6.3.5 + React 18.3.1 (SPA generada por Figma Make)
- 90 archivos fuente, ~64KB App.tsx monolítico
- Supabase (auth, DB, Storage, RLS)
- Custom router (History API)
- Tailwind v4 + shadcn/ui + MUI

**Objetivo:** Migrar a Next.js 15 (App Router) con Supabase SSR, manteniendo toda la funcionalidad y mejorando la arquitectura.

**Estrategia:** Migración por fases con verificación en cada paso, sin regresiones funcionales.

# 06 — Análisis de Riesgos

## Riesgos Identificados

| # | Riesgo | Impacto | Probabilidad | Mitigación |
|---|--------|---------|-------------|------------|
| R1 | App.tsx monolítico (64KB) difícil de migrar | Alto | Alta | Dividir por secciones antes de migrar; migrar progresivamente |
| R2 | Dependencias mixtas (shadcn/ui + MUI) causan conflictos | Medio | Media | Mantener ambas; MUI solo se usa para icons (@mui/icons-material) |
| R3 | Tailwind v4 en Next.js difiere de Vite plugin | Medio | Media | Verificar compatibilidad de @tailwindcss/postcss con Next.js |
| R4 | Pérdida de estado de sesión durante migración | Alto | Baja | Middleware de Supabase maneja cookies automáticamente |
| R5 | Import.meta.env no existe en Next.js | Alto | Alta | Reemplazo sistemático por NEXT_PUBLIC_; grep global |
| R6 | figma:asset/ resolver no existe en Next.js | Medio | Media | Migrar assets a public/ y usar /assets/ paths o imports |
| R7 | next-themes (temas) incompatible con SSR | Bajo | Baja | next-themes soporta Next.js App Router; configurar ThemeProvider |
| R8 | React 18 -> 19 breaking changes | Medio | Media | React 19 es backward-compatible en modo normal; revisar deprecated APIs |
| R9 | Performance de build más lenta | Bajo | Alta | Next.js con Turbopack es rápido; aceptable para 90 archivos |
| R10 | Media uploads no funcionan en server | Medio | Baja | Mantener uploads en Client Components (ya lo están) |

## Rollback Plan

Si la migración falla críticamente:
1. El proyecto Vite original permanece intacto en git
2. `git checkout` revierte todos los cambios
3. Las variables de entorno originales (VITE_) no se modifican en producción

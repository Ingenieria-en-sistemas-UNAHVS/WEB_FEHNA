# Atletas públicos FEHNA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar la portada resumida, el listado completo y el detalle público de atletas con datos mock tipados y navegación real.

**Architecture:** La feature `src/features/athletes` será dueña de los tipos, fixtures, ranking y componentes visuales. Las páginas App Router solo seleccionarán datos y compondrán pantallas; ningún componente de UI conocerá Supabase.

**Tech Stack:** Next.js App Router 16, React 19, TypeScript, Tailwind CSS v4, lucide-react, `next/link`.

## Global Constraints

- La portada debe mostrar exactamente tres atletas destacados.
- `/atletas` debe listar todos los atletas con búsqueda y filtros locales.
- `/atletas/[id]` debe mostrar datos básicos, puntuación, tiempos, competencias y medallas mock.
- El ranking combina puntuación y menor tiempo; cada marca muestra tipo de nado/prueba.
- No agregar consultas ni mutaciones de Supabase.
- Mantener colores, tipografías y componentes visuales existentes.
- Usar IDs estables y rutas centralizadas en `ROUTES`.

---

### Task 1: Tipos, fixtures y ranking

**Files:**
- Create: `src/features/athletes/types/athlete.types.ts`
- Create: `src/features/athletes/data/athletes.mock.ts`
- Create: `src/features/athletes/lib/athlete-ranking.ts`
- Create: `src/features/athletes/index.ts`

- [ ] Definir tipos públicos para atleta, club, performance, competencia y medalla.
- [ ] Crear al menos seis atletas mock con IDs únicos, clubes, tipos de nado, tiempos, puntuaciones, competencias y medallas.
- [ ] Implementar funciones puras `getBestPerformance`, `rankAthletes` y `getAthleteById`.
- [ ] Ejecutar `pnpm exec tsc --noEmit` y corregir errores de tipos.

### Task 2: Componentes reutilizables de atleta

**Files:**
- Create: `src/features/athletes/components/AthleteCard.tsx`
- Create: `src/features/athletes/components/AthleteRankingCard.tsx`
- Create: `src/features/athletes/components/AthleteFilters.tsx`
- Create: `src/features/athletes/components/AthleteList.tsx`
- Create: `src/features/athletes/components/PerformanceSummary.tsx`
- Create: `src/features/athletes/components/AthleteProfileHeader.tsx`
- Create: `src/features/athletes/components/CompetitionHistory.tsx`
- Create: `src/features/athletes/components/MedalsSummary.tsx`
- Create: `src/features/athletes/components/TimeHistory.tsx`

- [ ] Construir tarjetas con enlace por ID, nombre, club, tipo de nado, prueba, mejor tiempo y puntuación.
- [ ] Construir filtros accesibles con búsqueda, club y tipo de nado.
- [ ] Construir bloques de resumen, competencias, medallas y tiempos con estados vacíos seguros.
- [ ] Mantener responsive desktop/mobile y el sistema visual FEHNA.

### Task 3: Pantallas y rutas públicas

**Files:**
- Create: `src/features/athletes/sections/AthletesPreviewSection.tsx`
- Create: `src/features/athletes/screens/AthletesDirectory.tsx`
- Create: `src/features/athletes/screens/AthleteDetail.tsx`
- Create: `src/app/(site)/atletas/[id]/page.tsx`
- Modify: `src/app/(site)/page.tsx`
- Modify: `src/app/(site)/atletas/page.tsx`
- Modify: `src/features/navigation/config/routes.ts`
- Modify: `src/features/home/sections/atletas-section.tsx`

- [ ] Sustituir la sección de portada por el preview exacto de tres atletas ordenados.
- [ ] Montar `/atletas` con encabezado, métricas, filtros y listado completo.
- [ ] Montar `/atletas/[id]` con breadcrumb, perfil y paneles deportivos.
- [ ] Centralizar `ROUTES.atletaDetalle(id)` y asegurar enlaces reales.
- [ ] Remover la dependencia de Supabase de estas tres páginas para esta entrega visual.

### Task 4: Verificación

**Files:**
- Verify: `src/app/(site)/page.tsx`
- Verify: `src/app/(site)/atletas/page.tsx`
- Verify: `src/app/(site)/atletas/[id]/page.tsx`

- [ ] Ejecutar `pnpm exec tsc --noEmit`.
- [ ] Ejecutar `pnpm build`.
- [ ] Revisar diff, rutas y enlaces con IDs válidos.
- [ ] Verificar `/`, `/atletas` y `/atletas/1` en desktop y móvil con el servidor de desarrollo.


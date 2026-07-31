# Atletas, clubes, rankings y galería Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una experiencia pública mock, paginada y enlazada para atletas, rankings, clubes y galería, además de limpiar “Sobre Nosotros”.

**Architecture:** Separar tipos, fixtures, utilidades puras y componentes por feature (`athletes`, `clubs`, `rankings`, `gallery`). Las páginas App Router consumirán esos fixtures y construirán enlaces con `ROUTES`; no se agregarán consultas de Supabase. La paginación será compartida, basada en query params y conservará filtros/orden.

**Tech Stack:** Next.js App Router 16, React 19, TypeScript, Tailwind CSS v4, lucide-react, `next/link`, componentes UI existentes.

## Global Constraints

- Usar únicamente mock data; no agregar consultas, mutaciones ni migraciones de Supabase.
- Mantener compatibilidad conceptual con `docs/superpowers/arquitectura_nueva` (`teams`, `athletes`, membresías, competencias, eventos y resultados).
- Usar IDs estables y rutas centralizadas en `src/features/navigation/config/routes.ts`.
- La paginación pública debe usar `?page=N`, conservar filtros/orden y reiniciar a 1 al cambiar criterios.
- Mantener colores, tipografías, componentes, responsive design, focus visible y estados vacíos del sistema FEHNA.
- No modificar el panel administrativo salvo que TypeScript exija un ajuste de importación compartida.
- No incluir el archivo de arquitectura no rastreado del usuario en los commits de esta feature.

---

### Task 1: Utilidad compartida de paginación y rutas

**Files:**
- Create: `src/lib/pagination.ts`
- Modify: `src/features/navigation/config/routes.ts`
- Test: verificación manual de funciones puras durante Task 2 y build final

**Interfaces:**
- Produce `paginate<T>(items: T[], page: number, pageSize: number): { items: T[]; page: number; pageSize: number; totalItems: number; totalPages: number; hasPrevious: boolean; hasNext: boolean }`.
- Produce `ROUTES.clubes`, `ROUTES.clubDetalle(id)`, `ROUTES.rankings`, `ROUTES.galeriaPagina` y helpers de query que no eliminen parámetros existentes.

- [ ] **Step 1: Definir el contrato de paginación.**
  - Aceptar únicamente páginas positivas; convertir valores inválidos a 1.
  - Usar un `pageSize` positivo; el valor por defecto será 6.
  - Cuando la página solicitada exceda `totalPages`, devolver la última página válida.
  - Para una lista vacía devolver `totalPages: 0`, `page: 1`, `items: []`, `hasPrevious: false` y `hasNext: false`.
- [ ] **Step 2: Agregar las rutas públicas.**
  - Mantener las rutas existentes de atletas, rankings y galería.
  - Agregar `clubes: "/clubes"` y `clubDetalle: (id: string | number) => `/clubes/${id}``.
  - No crear enlaces literales dentro de componentes cuando exista una entrada equivalente en `ROUTES`.
- [ ] **Step 3: Ejecutar build para detectar errores de sintaxis o imports.**
  - Run: `pnpm build`
  - Expected: el proyecto compila; cualquier fallo debe limitarse a cambios introducidos en la rama.

### Task 2: Modelo común y fixtures ampliados de atletas y clubes

**Files:**
- Modify: `src/features/athletes/types/athlete.types.ts`
- Modify: `src/features/athletes/data/athletes.mock.ts`
- Modify: `src/features/athletes/lib/athlete-ranking.ts`
- Modify: `src/features/athletes/index.ts`
- Create: `src/features/clubs/types/club.types.ts`
- Create: `src/features/clubs/data/clubs.mock.ts`
- Create: `src/features/clubs/lib/club-stats.ts`
- Create: `src/features/clubs/index.ts`

**Interfaces:**
- `AthleteTeam.id` será la clave compartida con `Club.id`.
- `Club` tendrá `id`, `name`, `shortName`, `federationCode`, `city`, `department`, `country`, `logoUrl`, `isActive`, `athleteIds`, `competitions`, `performances`, `medals`, `totalPoints` y `foundedYear`.
- `ClubStats` expondrá `totalPoints`, `goldMedals`, `silverMedals`, `bronzeMedals`, `totalMedals`, `activeAthletes`, `competitionsCount` y `bestPlace`.
- `getClubById(id)`, `getClubStats(club)`, `getClubAthletes(club, athletes)` y `rankClubs(clubs, criterion)` serán funciones puras.

- [ ] **Step 1: Extender tipos sin romper los componentes existentes.**
  - Agregar campos opcionales o derivados solo donde el código actual no los pueda proveer inmediatamente.
  - Representar afiliación actual con `team`; conservar `performances`, `competitions` y `medals` para el detalle del atleta.
- [ ] **Step 2: Expandir fixtures a suficientes datos para probar paginación.**
  - Crear al menos 18 atletas distribuidos en al menos 6 clubes y 8 competencias mock.
  - Cada club debe tener una combinación distinta de puntos, medallas, cantidad de atletas y competencias para validar ordenamientos.
  - Agregar resultados válidos y algunos registros sin medalla para probar estados reales.
- [ ] **Step 3: Derivar estadísticas de clubes desde datos consistentes.**
  - Sumar puntos de performances válidas de atletas actuales.
  - Contar medallas por tipo y conservar las competencias ganadas mediante medallas de oro o mejor posición.
  - No duplicar manualmente una métrica que pueda derivarse de los fixtures relacionados.
- [ ] **Step 4: Ejecutar build.**
  - Run: `pnpm build`
  - Expected: PASS; los tipos existentes de atletas y home siguen compilando.

### Task 3: Paginación del directorio de atletas y enlace atleta-club

**Files:**
- Modify: `src/features/athletes/components/AthleteCard.tsx`
- Modify: `src/features/athletes/components/AthleteList.tsx`
- Modify: `src/features/athletes/components/AthleteFilters.tsx`
- Modify: `src/features/athletes/screens/AthletesDirectory.tsx`
- Modify: `src/app/(site)/atletas/page.tsx`
- Modify: `src/features/athletes/components/AthleteProfileHeader.tsx`
- Modify: `src/features/athletes/screens/AthleteDetail.tsx`

**Interfaces:**
- `AthletesDirectory` recibirá `athletes: RankedAthlete[]`, `initialPage: number`, `pageSize?: number`.
- La pantalla cliente mantendrá `search`, `gender`, `swimType`, `team` y `page` en el estado/query string.
- Los enlaces de club usarán `ROUTES.clubDetalle(athlete.team.id)`.

- [ ] **Step 1: Escribir la derivación paginada antes del render.**
  - Filtrar por búsqueda, género, tipo de nado y club.
  - Ordenar por ranking antes de paginar.
  - Usar `paginate(filtered, page, 6)` y exponer `pageInfo` al bloque de paginación.
- [ ] **Step 2: Reiniciar la página al cambiar criterios.**
  - En cada cambio de búsqueda/filtro, establecer página 1.
  - Construir enlaces con `page`, filtros y búsqueda codificados para conservar el estado.
- [ ] **Step 3: Integrar `Pagination` debajo de la lista.**
  - Mostrar anterior, páginas cercanas, elipsis cuando corresponda y siguiente.
  - Deshabilitar o no renderizar enlaces inválidos; usar labels en español.
- [ ] **Step 4: Convertir el club visible en enlace.**
  - En tarjetas/listado, el club debe navegar a `/clubes/[id]`.
  - En el perfil del atleta, mostrar “Ver club” junto al nombre del club.
- [ ] **Step 5: Actualizar la página para leer `searchParams`.**
  - Aceptar `searchParams: Promise<Record<string, string | string[] | undefined>>` y pasar `page`/filtros iniciales sin conectar Supabase.
- [ ] **Step 6: Ejecutar build.**
  - Run: `pnpm build`
  - Expected: PASS; `/atletas` y `/atletas/[id]` compilan con rutas estables.

### Task 4: Ranking público mock enriquecido y paginado

**Files:**
- Create: `src/features/rankings/types/ranking.types.ts`
- Create: `src/features/rankings/data/rankings.mock.ts`
- Create: `src/features/rankings/lib/ranking-utils.ts`
- Create: `src/features/rankings/components/RankingFilters.tsx`
- Create: `src/features/rankings/components/RankingTable.tsx`
- Create: `src/features/rankings/components/RankingPagination.tsx`
- Create: `src/features/rankings/screens/RankingsDirectory.tsx`
- Create: `src/features/rankings/index.ts`
- Modify: `src/app/(site)/rankings/page.tsx`
- Modify: `src/features/home/sections/rankings-section.tsx`
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- `RankingEntry` tendrá `id`, `position`, `athleteId`, `athleteName`, `clubId`, `clubName`, `gender`, `category`, `discipline`, `stroke`, `distanceMeters`, `course`, `timeMs`, `points`, `competitionId`, `competitionName`, `date`, `location`, `status`.
- `filterRankings(entries, filters)` y `sortRankings(entries, sort)` serán puras.
- `RankingsDirectory` recibirá `entries` y `initialPage`.

- [ ] **Step 1: Crear al menos 36 entradas de ranking mock.**
  - Distribuir entre natación, aguas abiertas, estilos, distancias SC/LC/OW, categorías y clubes.
  - Incluir puntos variados, tiempos ordenables, posiciones 1-10 y competencias fechadas.
- [ ] **Step 2: Implementar filtros y orden.**
  - Filtros: búsqueda por atleta/club, categoría, disciplina, estilo, tipo de piscina y club.
  - Orden: tiempo ascendente, puntos descendentes, posición ascendente y fecha descendente.
- [ ] **Step 3: Construir tabla responsive y paginación.**
  - En desktop mostrar todas las columnas solicitadas; en móvil priorizar atleta, club, prueba, tiempo y puntos.
  - Enlazar atleta y club con sus rutas cuando el ID exista.
- [ ] **Step 4: Sustituir la página `/rankings` por la pantalla mock.**
  - No llamar `getTiemposRanking()` en esa ruta.
  - Mantener el preview de home limitado a una cantidad breve, pero usando el mismo dominio de datos mock.
- [ ] **Step 5: Ejecutar build.**
  - Run: `pnpm build`
  - Expected: PASS; `/rankings?page=2` muestra una página distinta y conserva filtros.

### Task 5: Directorio y detalle público de clubes

**Files:**
- Create: `src/features/clubs/components/ClubCard.tsx`
- Create: `src/features/clubs/components/ClubFilters.tsx`
- Create: `src/features/clubs/components/ClubList.tsx`
- Create: `src/features/clubs/components/ClubProfileHeader.tsx`
- Create: `src/features/clubs/components/ClubAthletes.tsx`
- Create: `src/features/clubs/components/ClubCompetitions.tsx`
- Create: `src/features/clubs/components/ClubMedals.tsx`
- Create: `src/features/clubs/screens/ClubsDirectory.tsx`
- Create: `src/features/clubs/screens/ClubDetail.tsx`
- Create: `src/app/(site)/clubes/page.tsx`
- Create: `src/app/(site)/clubes/[id]/page.tsx`
- Modify: `src/features/navigation/config/routes.ts`
- Modify: `src/features/navigation/components/NavDesktop.tsx`
- Modify: `src/features/navigation/components/NavMobile.tsx`

**Interfaces:**
- `/clubes` recibirá `searchParams` y mostrará `Club[]` paginados a 6 por página.
- `/clubes/[id]` resolverá `getClubById`, `getClubStats` y atletas relacionados; usará `notFound()` si el ID no existe.
- `ClubDetail` mostrará: identidad/logo, ubicación, código federativo, atletas actuales, competencias, puntos, medallas y mejores posiciones.

- [ ] **Step 1: Crear tarjetas, filtros y lista de clubes.**
  - Mostrar nombre, ciudad/departamento, atletas, puntos, medallas y competencias.
  - Permitir búsqueda y orden por puntos, medallas, atletas o competencias.
- [ ] **Step 2: Integrar paginación por query param.**
  - Usar `paginate` a 6 clubes por página.
  - Conservar `q`, `sort` y `page` en los enlaces.
- [ ] **Step 3: Crear detalle del club.**
  - Listar atletas actuales con enlaces a `/atletas/[id]`.
  - Listar competencias ganadas/destacadas con fecha, sede, mejor posición y puntos.
  - Mostrar medallero separado por oro, plata y bronce; usar estado vacío cuando no haya medallas.
- [ ] **Step 4: Añadir “Clubes” a navegación pública.**
  - Insertar el enlace con `ROUTES.clubes` en desktop y móvil sin romper el orden existente.
- [ ] **Step 5: Ejecutar build.**
  - Run: `pnpm build`
  - Expected: PASS; `/clubes`, `/clubes/team-aj` y enlaces desde atletas funcionan.

### Task 6: Galería pública independiente y preview de portada

**Files:**
- Create: `src/features/gallery/types/gallery.types.ts`
- Create: `src/features/gallery/data/gallery.mock.ts`
- Create: `src/features/gallery/components/GalleryCard.tsx`
- Create: `src/features/gallery/components/GalleryFilters.tsx`
- Create: `src/features/gallery/components/GalleryGrid.tsx`
- Create: `src/features/gallery/screens/GalleryDirectory.tsx`
- Create: `src/features/gallery/index.ts`
- Create: `src/app/(site)/galeria/page.tsx`
- Modify: `src/features/home/sections/galeria-section.tsx`
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- `GalleryItem` tendrá `id`, `src`, `alt`, `title`, `description`, `date`, `author`, `type` (`photo` | `video`), `competitionName` y `tags`.
- `GalleryDirectory` recibirá `items` y `initialPage`, paginando 9 elementos por página.

- [ ] **Step 1: Crear al menos 24 imágenes mock.**
  - Cubrir competencias, entrenamientos, clubes, atletas, ceremonias y piscina.
  - Cada registro debe tener título, descripción, fecha ISO, autor y tipo.
- [ ] **Step 2: Crear tarjetas y grilla responsive.**
  - Mostrar metadata sin depender de hover para que sea accesible en móvil.
  - Mantener proporciones de imagen y `alt` descriptivo.
- [ ] **Step 3: Añadir filtros simples y paginación.**
  - Filtrar por tipo/tags y buscar por título, descripción o autor.
  - Usar `?page=`, `?type=` y `?q=` conservando criterios al navegar.
- [ ] **Step 4: Reducir el preview de home.**
  - Reutilizar los primeros elementos del fixture en `GaleriaSection`.
  - Mantener el CTA a `/galeria` y evitar duplicar el arreglo anterior.
- [ ] **Step 5: Ejecutar build.**
  - Run: `pnpm build`
  - Expected: PASS; `/galeria?page=2` muestra metadata y una página distinta.

### Task 7: Limpieza de “Sobre Nosotros”

**Files:**
- Modify: `src/features/about/AboutPage.tsx`
- Modify: `src/features/about/sections/AboutIntroSection.tsx`
- Verify: `src/app/(site)/sobre-nosotros/page.tsx`

- [ ] **Step 1: Eliminar el enlace “Volver al inicio” de `AboutIntroSection.tsx`.**
  - Retirar el `Link` y cualquier import de `next/link` que quede sin uso.
  - No eliminar el contenido institucional ni los enlaces del navbar global.
- [ ] **Step 2: Mantener la composición institucional sin sustituir el control.**
  - Conservar encabezado, identidad, responsabilidades, historia y autoridades en una composición limpia.
- [ ] **Step 3: Ejecutar build.**
  - Run: `pnpm build`
  - Expected: PASS; `/sobre-nosotros` renderiza sin el CTA de regreso.

### Task 8: Integración de navegación, home y estados cruzados

**Files:**
- Modify: `src/features/navigation/config/routes.ts`
- Modify: `src/features/home/sections/atletas-section.tsx`
- Modify: `src/features/home/sections/rankings-section.tsx`
- Modify: `src/features/home/sections/galeria-section.tsx`
- Modify: `src/app/(site)/page.tsx`
- Verify: páginas públicas de atletas, rankings, clubes, galería y sobre nosotros

- [ ] **Step 1: Verificar que todos los CTAs apunten a páginas completas.**
  - Atletas → `/atletas`, rankings → `/rankings`, clubes → `/clubes`, galería → `/galeria`.
- [ ] **Step 2: Confirmar enlaces cruzados con IDs existentes.**
  - Atleta → club, club → atleta, ranking → atleta y ranking → club.
- [ ] **Step 3: Confirmar que el home no intente paginar listas completas.**
  - Home conserva previews limitados; las páginas completas manejan paginación.
- [ ] **Step 4: Ejecutar build y revisar rutas.**
  - Run: `pnpm build`
  - Expected: PASS sin errores de generación estática ni `notFound` inesperados.

### Task 9: Verificación visual y entrega

**Files:**
- Verify: `src/app/(site)/atletas/page.tsx`
- Verify: `src/app/(site)/atletas/[id]/page.tsx`
- Verify: `src/app/(site)/rankings/page.tsx`
- Verify: `src/app/(site)/clubes/page.tsx`
- Verify: `src/app/(site)/clubes/[id]/page.tsx`
- Verify: `src/app/(site)/galeria/page.tsx`
- Verify: `src/app/(site)/sobre-nosotros/page.tsx`

- [ ] **Step 1: Ejecutar validación final.**
  - Run: `pnpm build`
  - Expected: PASS.
- [ ] **Step 2: Revisar manualmente las rutas.**
  - Comprobar `/atletas?page=2`, `/rankings?page=2`, `/clubes?page=2` y `/galeria?page=2`.
  - Comprobar filtros sin resultados y un ID inexistente por cada tipo de detalle.
- [ ] **Step 3: Revisar responsive y accesibilidad básica.**
  - Verificar desktop/móvil, foco visible, labels, alt text, paginación y textos largos.
- [ ] **Step 4: Revisar diff y estado de Git.**
  - Run: `git diff --check; git status --short --branch`
  - Expected: sin errores de whitespace y solo cambios de la feature/documentación; preservar el archivo de arquitectura no rastreado del usuario.
- [ ] **Step 5: Commit por entregables completos.**
  - Usar commits separados y descriptivos por dominio, por ejemplo `feat: add public clubs directory` y `feat: paginate public rankings`.

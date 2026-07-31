# Diseño: experiencia pública de atletas FEHNA

## Objetivo

Construir una experiencia pública de atletas en tres niveles, únicamente visual y
sin integrar Supabase en esta entrega:

1. La portada muestra exactamente tres atletas destacados.
2. `/atletas` lista todos los atletas con búsqueda, filtros y marcas resumidas.
3. `/atletas/[id]` muestra la ficha pública de un atleta y sus datos deportivos
   extendidos.

La estructura visual y los tipos deben quedar preparados para conectarse después a
la arquitectura de competencias definida en `docs/architecture/new_database.sql`.

## Criterios de ranking

Los atletas destacados se ordenan por una combinación de puntuación y menor tiempo.
La puntuación representa el valor general del desempeño; el menor tiempo funciona
como criterio secundario para desempatar o reforzar la posición. Cada resultado
visible identifica el tipo de nado, la prueba, la distancia, el tiempo y la piscina
cuando esté disponible.

Los fixtures locales usarán una forma compatible con el futuro modelo:

- `athletes`: identidad, fecha de nacimiento, sexo, nacionalidad y fotografía.
- `teams`: club actual y código del equipo.
- `swimming_events`: disciplina, estilo, distancia, tipo de piscina y competencia.
- `event_results`: posición, tiempo final, puntos y estado.
- historial público: competencias y medallas derivadas de resultados mock.

No se agregarán consultas, mutaciones ni cambios de esquema de Supabase.

## Rutas

El registro de rutas público será la única fuente de navegación:

- `/`: portada con sección resumida de tres atletas.
- `/atletas`: listado completo.
- `/atletas/[id]`: detalle público estable por ID numérico/string.

La ruta de detalle se generará con `ROUTES.atletaDetalle(id)` y todos los elementos
clicables usarán `next/link`. Las tarjetas de la portada enlazarán al detalle del
atleta; el CTA general enlazará a `/atletas`.

## Arquitectura de componentes

La funcionalidad vivirá en `src/features/athletes`:

- `types/athlete.types.ts`: tipos de identidad, club, resultado, competencia y
  medalla.
- `data/athletes.mock.ts`: fixtures tipados, con datos suficientes para probar
  ranking, filtros, estados y detalle.
- `lib/athlete-ranking.ts`: selección y orden de destacados por puntuación y tiempo.
- `components/AthleteCard.tsx`: tarjeta base reutilizable.
- `components/AthleteRankingCard.tsx`: variante compacta para portada.
- `components/AthleteFilters.tsx`: búsqueda y filtros de sexo, club y tipo de nado.
- `components/AthleteList.tsx`: listado responsive enlazado a cada detalle.
- `components/AthleteProfileHeader.tsx`: identidad, club y resumen principal.
- `components/PerformanceSummary.tsx`: mejor marca, puntuación y prueba.
- `components/CompetitionHistory.tsx`: competencias y posiciones.
- `components/MedalsSummary.tsx`: resumen de medallas.
- `components/TimeHistory.tsx`: tiempos por prueba/competencia.
- `sections/AthletesPreviewSection.tsx`: bloque exacto de tres atletas en portada.
- `screens/AthletesDirectory.tsx`: pantalla de listado y estado de filtros.
- `screens/AthleteDetail.tsx`: pantalla de detalle.

Los componentes visuales no conocerán Supabase. Las páginas App Router recibirán o
seleccionarán fixtures y los pasarán como props; más adelante se podrá sustituir la
capa `data` por funciones de lectura sin cambiar la interfaz pública.

## Experiencia visual

Se conservará el sistema existente: fondo azul marino, tarjetas azul profundo,
acento cyan, tipografías Outfit y Barlow Condensed, bordes sutiles y jerarquía de
secciones con mayúsculas deportivas.

### Portada

- Encabezado de sección “Atletas destacados”.
- Tres tarjetas numeradas del 1 al 3.
- Nombre, club, tipo de nado, prueba, mejor tiempo y puntuación.
- Indicador visual de posición y enlace al perfil.
- CTA “Ver todos los atletas” hacia `/atletas`.

### Listado

- Encabezado con descripción y métricas generales.
- Barra de búsqueda y filtros accesibles.
- Tarjetas o filas que muestren nombre, club, disciplina, mejor tiempo,
  puntuación y cantidad de resultados.
- Vista responsive: cuadrícula en desktop y filas apiladas en móvil.
- Estados para lista vacía y búsqueda sin coincidencias.

### Detalle

- Breadcrumb y enlace de regreso al listado.
- Cabecera del atleta con avatar/placeholder, nombre, club, sexo, nacionalidad y
  fecha de nacimiento/edad.
- Resumen destacado de puntuación, mejor tiempo, prueba y tipo de nado.
- Secciones separadas para competencias, medallas y tiempos.
- Estado vacío por sección para datos todavía no disponibles.

## Comportamiento y accesibilidad

- La búsqueda y filtros serán interacción local del cliente en `/atletas`.
- Los datos no se mutan; el estado filtrado se deriva de los fixtures.
- Inputs con `label`, botones con texto y enlaces con destino semántico.
- Estados de foco visibles y contraste suficiente sobre el tema oscuro.
- Los textos largos deberán envolver sin romper las tarjetas.
- Se respetará `prefers-reduced-motion` en animaciones nuevas.

## Verificación

Antes de considerar la entrega terminada se ejecutará:

- `pnpm typecheck` si está disponible, o la validación equivalente definida por el
  proyecto.
- `pnpm build`.
- Revisión del diff y de las rutas generadas.
- Revisión visual en navegador de `/`, `/atletas` y `/atletas/[id]` en una vista
  desktop y una móvil.
- Comprobación de navegación desde una tarjeta de portada hasta el detalle y de
  regreso desde el listado.


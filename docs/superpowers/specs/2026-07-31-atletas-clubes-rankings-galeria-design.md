# Diseño: directorio público de atletas, clubes, rankings y galería

## Objetivo

Ampliar la experiencia pública de FEHNA con datos mock tipados y navegación real
para atletas, rankings, clubes y galería. La entrega debe funcionar sin consultas
ni mutaciones de Supabase, pero conservar IDs y relaciones compatibles con el
modelo de competencias de `docs/superpowers/arquitectura_nueva`.

## Alcance

- Paginar `/atletas` y enlazar cada atleta con su club actual.
- Ampliar los datos de ranking con suficientes registros para probar paginación,
  filtros, ordenamiento y estados vacíos.
- Paginar `/rankings` con datos mock enriquecidos: atleta, club, prueba, estilo,
  distancia, piscina, categoría, tiempo, puntos, posición, competencia y fecha.
- Crear `/clubes` con búsqueda, filtros y orden por puntos, medallas, atletas o
  competencias; crear `/clubes/[id]` con métricas, atletas actuales, competencias,
  resultados y medallero.
- Crear una galería pública independiente paginada con imagen, título,
  descripción, fecha, autor y tipo de contenido; mantener un preview breve en la
  portada.
- Simplificar “Sobre Nosotros” retirando el control de volver atrás y dejando la
  página institucional limpia.

## Decisiones de arquitectura

Los datos vivirán en features separadas: `src/features/athletes`,
`src/features/clubs`, `src/features/rankings` y `src/features/gallery`. Cada feature
será responsable de sus tipos, fixtures, funciones puras y componentes. Las páginas
App Router solo seleccionarán fixtures, leerán los query params y compondrán las
pantallas.

La paginación será una utilidad pura compartida con parámetros `page`, `pageSize` y
total calculado. Las URLs públicas usarán `?page=N`; filtros y orden pueden viajar
como query params estables cuando la pantalla los necesite. La página se corregirá a
la última página válida y los enlaces de paginación conservarán los filtros actuales.

Los IDs de clubes serán compartidos entre los fixtures de atletas y clubes. Un
atleta tendrá `team.id` y un club expondrá sus `athleteIds` o una función derivada
que resuelva los atletas actuales. Las competencias y resultados mock usarán campos
análogos a `competitions`, `competition_teams`, `athlete_team_memberships`,
`swimming_events` y `event_results`.

## Rutas públicas

- `/atletas?page=N`: directorio paginado y filtrable.
- `/atletas/[id]`: detalle del atleta con enlace al club.
- `/rankings?page=N`: ranking paginado, filtrable y ordenable.
- `/clubes?page=N`: directorio paginado de clubes.
- `/clubes/[id]`: detalle público del club.
- `/galeria?page=N`: galería completa paginada.
- `/sobre-nosotros`: página institucional sin botón “Volver atrás”.

La configuración `ROUTES` será la única fuente para estos destinos y expondrá
constructores para `clubDetalle(id)`. La función `withQueryParams(path, params)`
podrá reutilizarse para construir enlaces de paginación sin perder filtros.

## Criterios de UX y accesibilidad

- Paginación visible debajo de cada lista, con anterior/siguiente, página activa,
  estados deshabilitados y `aria-label` en español.
- Reiniciar `page` a 1 cuando cambie una búsqueda, filtro u orden.
- Mostrar estado vacío cuando no existan coincidencias y estado de identificador no
  encontrado en detalles.
- Hacer clic en el nombre o tarjeta del atleta para abrir su perfil y en el club
  para abrir `/clubes/[id]`.
- Mantener el sistema visual FEHNA, responsive desktop/móvil, focus visible y
  soporte de `prefers-reduced-motion`.

## No incluido

- Consultas, mutaciones, migraciones o cambios de esquema de Supabase.
- Panel administrativo de clubes, atletas, rankings o medios.
- Carga real de archivos o visor multimedia avanzado; la galería mostrará fixtures
  de imágenes y enlaces visuales.

## Verificación

Se ejecutará `pnpm build`; como `package.json` no define un script de typecheck, la
verificación de tipos quedará cubierta por el build de Next.js. Se revisarán
visualmente `/atletas`, `/atletas/1`, `/rankings`,
`/clubes`, `/clubes/team-aj`, `/galeria` y `/sobre-nosotros` en desktop y móvil,
incluyendo paginación, filtros, enlaces cruzados y estados vacíos.

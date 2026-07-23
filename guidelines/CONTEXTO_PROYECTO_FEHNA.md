# Contexto del Proyecto — Web Federación Hondureña de Natación (FEHNA)

> Documento de contexto para asistentes de IA. Describe el propósito, la arquitectura, el modelo de datos y las convenciones del proyecto para que cualquier IA pueda colaborar con información precisa. Última actualización: 2026-07-22 (se agregaron `redes_sociales` e `informacion_contacto`, y se documentó `patrocinadores`).

---

## 1. Resumen del proyecto

Sitio web y sistema de gestión para la **Federación Hondureña de Natación (FEHNA)**. El objetivo es tener una plataforma pública (noticias, eventos, clubes, deportistas y resultados) respaldada por un panel interno donde personal autorizado registra los tiempos de competencia de los nadadores.

El corazón del sistema es una base de datos relacional de **resultados de natación**: deportistas afiliados a clubes compiten en eventos, en pruebas de distintos estilos y distancias, y sus tiempos quedan registrados por categoría de edad y tipo de piscina.

**Estado actual:** la base de datos está creada, poblada con datos de referencia (catálogos) y con algunos registros de ejemplo. El frontend está en construcción.

---

## 2. Stack tecnológico

- **Frontend:** aplicación web generada con **Figma Make** (React + TypeScript, estilos con Tailwind). Consume Supabase directamente vía el cliente `@supabase/supabase-js`.
- **Backend / Base de datos:** **Supabase** (PostgreSQL 17).
  - Proyecto: `DB_fehna`
  - Ref/ID del proyecto: `tmpubpndujcyeablirah`
  - Región: `us-east-2`
- **Autenticación:** Supabase Auth. Los usuarios internos tienen un perfil en `public.perfiles` vinculado 1:1 a `auth.users`.
- **Almacenamiento:** Supabase Storage (imágenes y documentos), catalogado en la tabla `public.medios`.
- **Seguridad:** Row Level Security (RLS) habilitado en todas las tablas de `public`.

---

## 3. Roles de usuario

Definidos en el enum `rol_tipo` sobre la tabla `perfiles`:

- **`admin`** — acceso total: gestión de contenido, catálogos, usuarios y resultados.
- **`digitador`** — rol por defecto. Encargado de registrar/digitar tiempos de competencia (`tiempos`) y subir medios asociados.

El público general (no autenticado) solo puede leer el contenido publicado.

---

## 4. Modelo de datos

Esquema `public`. Convenciones: nombres de tablas y columnas en **español**, `snake_case`; claves primarias `id`; marcas de tiempo `creado_en` / `actualizada_en` con `now()` por defecto; borrado lógico mediante banderas `activo` / `publicado` en lugar de eliminación física.

### 4.1 Núcleo deportivo (resultados)

**`clubes`** — clubes de natación afiliados.
`id`, `nombre` (único), `abreviatura`, `ciudad`, `activo`, `creado_en`.

**`deportistas`** — nadadores.
`id`, `nombres`, `apellidos`, `sexo` (enum `sexo_tipo`: `F`/`M`), `fecha_nacimiento`, `club_id → clubes.id`, `activo`, `creado_en`.

**`eventos`** — competencias / campeonatos.
`id`, `nombre`, `sede`, `fecha_inicio`, `fecha_fin`, `descripcion`, `piscina_id → tipos_piscina.id`, `publicado`, `creado_en`.

**`tiempos`** — tabla central: resultado de un deportista en una prueba dentro de un evento.
`id`, `deportista_id → deportistas.id`, `evento_id → eventos.id`, `prueba_id → pruebas.id`, `categoria_id → categorias.id`, `edad_evento`, `tiempo_siembra` (seed), `tiempo_final` (check `> 0`), `posicion`, `puntos` (def. 0), `registrado_por → perfiles.id`, `creado_en`.
> **Importante:** los tiempos (`tiempo_siembra`, `tiempo_final`) se almacenan como **enteros en centésimas de segundo** (`integer`), no como texto ni intervalos. Para mostrar `mm:ss.cc` hay que formatear en la aplicación.

### 4.2 Catálogos de referencia

**`tipos_piscina`** — 2 registros:
`SC` = Piscina corta (25 m); `LC` = Piscina larga (50 m).

**`estilos`** — 4 registros: Mariposa, Dorso, Pecho, Libre.

**`pruebas`** — combinación de estilo + distancia (17 registros).
`id`, `estilo_id → estilos.id`, `distancia` (metros).
Distancias por estilo: Mariposa/Dorso/Pecho = 25, 50, 100, 200 m; Libre = 25, 50, 100, 200, 400 m.

**`categorias`** — 7 grupos de edad:
6 y menores (0–6), 7-8, 9-10, 11-12, 13-14, 15-17, 18 y mayores (18–99).
`id`, `nombre`, `edad_min`, `edad_max`.

### 4.3 Contenido público

**`noticias`** — publicaciones/blog.
`id`, `titulo`, `slug` (único), `resumen`, `contenido` (text), `imagen_portada`, `publicada` (def. false), `fecha_publicacion`, `creada_en`, `actualizada_en`.

**`patrocinadores`** — logos mostrados en el carrusel de la página principal.
`id`, `nombre`, `logo_url` (imagen en el bucket de storage `patrocinadores`), `orden`, `visible` (def. true), `creado_en`, `actualizada_en`.
Administrado desde `/admin/patrocinadores` (`PatrocinadoresAdmin.tsx`), solo `admin`.

**`redes_sociales`** — catálogo fijo de 8 redes sociales mostradas en la sección "Contáctanos" del home.
`id`, `red` (enum `tipo_red_social`, única por fila), `url`, `visible` (def. true), `orden`, `creado_en`, `actualizada_en`.
Las 8 filas (una por red) se sembraron una sola vez y no se crean/eliminan desde el admin: solo se edita `url`, `visible` y `orden`. Administrado desde `/admin/contacto` → pestaña "Redes Sociales" (`ContactoAdmin.tsx`), solo `admin`.

**`informacion_contacto`** — lista libre de datos de contacto (teléfono, correo, dirección, web, etc.) mostrados en la sección "Contáctanos" del home.
`id`, `icono` (texto: clave de ícono `lucide-react`, ver `src/lib/contactoIconos.tsx`), `titulo`, `descripcion` (el dato en sí), `visible` (def. true), `orden`, `creado_en`, `actualizada_en`.
CRUD completo (crear/editar/eliminar) desde `/admin/contacto` → pestaña "Información de Contacto" (`ContactoAdmin.tsx`), solo `admin`.
> Nota de diseño: la sección pública "Contáctanos" ya **no** tiene formulario de "enviar mensaje"; solo muestra `informacion_contacto` y `redes_sociales` filtrados por `visible = true`, en el orden de `orden`. Ver `src/lib/usePublic.ts` (`useInformacionContactoPublica`, `useRedesSocialesPublicas`) y la sección `#contacto` en `src/app/App.tsx`.

### 4.4 Medios / archivos

**`medios`** — catálogo de imágenes y documentos en Supabase Storage, reutilizable por varios módulos.
`id`, `modulo` (enum `modulo_medio`: noticias, eventos, patrocinadores, clubes, deportistas, documentos, resultados), `entidad_id` (id del registro relacionado), `bucket`, `path`, `tipo` (enum `tipo_medio`: imagen/documento), `mime_type`, `tamano_bytes`, `ancho`, `alto`, `titulo`, `descripcion`, `es_portada`, `es_publico`, `orden`, `subido_por → perfiles.id`, `creado_en`, `actualizada_en`.

### 4.5 Usuarios internos

**`perfiles`** — perfil de usuario interno, 1:1 con `auth.users`.
`id` (uuid, = `auth.users.id`), `nombre`, `rol` (enum `rol_tipo`: admin/digitador, def. digitador), `activo`, `creado_en`.

---

## 5. Relaciones clave (resumen)

```
clubes 1───N deportistas
tipos_piscina 1───N eventos
estilos 1───N pruebas
deportistas 1───N tiempos
eventos     1───N tiempos
pruebas     1───N tiempos
categorias  1───N tiempos
perfiles    1───N tiempos   (registrado_por)
perfiles    1───N medios    (subido_por)
auth.users  1───1 perfiles
```

`tiempos` es la tabla de hechos (fact table); casi todo lo demás son dimensiones/catálogos que la describen.

---

## 6. Tipos enumerados (Postgres enums)

- `sexo_tipo`: `F`, `M`
- `rol_tipo`: `admin`, `digitador`
- `tipo_medio`: `imagen`, `documento`
- `modulo_medio`: `noticias`, `eventos`, `patrocinadores`, `clubes`, `deportistas`, `documentos`, `resultados`
- `tipo_red_social`: `facebook`, `instagram`, `x`, `youtube`, `tiktok`, `whatsapp`, `linkedin`, `threads`

---

## 7. Convenciones y notas para la IA

- **Idioma:** todo el modelo de datos (tablas, columnas, enums) está en español. Mantener esa convención al proponer cambios.
- **Tiempos en centésimas:** cualquier cálculo, ranking o comparación de marcas usa el entero de `tiempo_final` (centésimas de segundo). Menor = mejor.
- **Borrado lógico:** preferir banderas `activo`/`publicado`/`publicada` en lugar de `DELETE`.
- **RLS activo:** al escribir consultas desde el cliente, recordar que las políticas de RLS filtran filas; el contenido no publicado y las tablas administrativas requieren sesión con el rol adecuado.
- **Autoría:** `tiempos.registrado_por` y `medios.subido_por` apuntan a `perfiles.id` (uuid del usuario que hizo la acción).
- **Slugs:** `noticias.slug` es único; generar a partir del título para URLs amigables.
- **Cambios de esquema:** usar migraciones de Supabase (`apply_migration`) para DDL, no SQL suelto.
- **Documentacion**: Se debe de documentar toda la estructura del proyecto, cambios, inserciones/borrados, nuevos modulos, desiciones de diseño, convenciones, generalidades y todo tipo de datos relevantes del proyecto en este archivo.

---

## 8. Glosario rápido

- **Prueba:** evento competitivo específico = estilo + distancia (ej. "100 m Libre").
- **Estilo:** técnica de nado (Mariposa, Dorso, Pecho, Libre).
- **Siembra (seed):** tiempo de inscripción previo a competir (`tiempo_siembra`).
- **Piscina corta (SC) / larga (LC):** longitud del vaso (25 m / 50 m); afecta las marcas y su comparación.
- **Digitador:** persona que ingresa los resultados al sistema.

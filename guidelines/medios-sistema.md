# Sistema reutilizable de medios — FEHNA

Interfaz única para subir imágenes y archivos a Supabase Storage, organizados por
módulo, con soporte para varias imágenes por entidad, portada/foto de perfil, y
opción público (por defecto) o privado.

**Ya aplicado en el proyecto Supabase `DB_fehna`** (buckets, tabla `medios`, RLS y
políticas de Storage). Estos archivos son la capa de frontend (React + TypeScript +
Tailwind, el stack de Figma Make).

## Estructura

```
lib/supabaseClient.ts   Cliente Supabase compartido
lib/mediaConfig.ts      Config por módulo (bucket, mime types, tamaño máx.)
lib/mediaService.ts     Núcleo reutilizable (subir, listar, portada, borrar…)
hooks/useMediaUpload.ts Hook React con estado y progreso
components/MediaUploader.tsx  Componente de subida listo para el panel admin
```

Copia la carpeta a `src/` de tu app e instala el cliente si aún no lo tienes:
`npm i @supabase/supabase-js`.

## Cómo funciona la seguridad

- **Buckets por módulo** con `file_size_limit` y `allowed_mime_types` — el servidor
  rechaza cualquier archivo que no sea del tipo/tamaño esperado.
- **Nombres generados** con `crypto.randomUUID()` y extensión derivada del mime type;
  nunca se confía en el nombre original → sin path traversal ni colisiones.
- **RLS**: cualquiera puede *leer* los medios públicos; solo `admin`/`digitador`
  activos pueden *subir, editar o borrar* (función `es_staff()`).
- **SVG excluido** de los buckets de imagen (evita XSS por SVG con scripts).
- **Privado opt-in**: al marcar "privado" el archivo va al bucket `privado` y se lee
  con URL firmada temporal (1h).

## Los 4 casos que pediste

### 1) Logo de patrocinador (una imagen)
```tsx
<MediaUploader modulo="patrocinadores" entidadId={patrocinadorId} multiple={false} />
```

### 2) Varias imágenes en una noticia
```tsx
<MediaUploader modulo="noticias" entidadId={noticiaId} />
// la que marques como "portada" es la imagen principal de la noticia
```

### 3) Varias imágenes en un evento
```tsx
<MediaUploader modulo="eventos" entidadId={eventoId} titulo="Galería del evento" />
```

### 4) Deportista: foto de perfil + álbum
```tsx
// El álbum completo; marca una como portada = foto de perfil
<MediaUploader modulo="deportistas" entidadId={deportistaId} />
```
Para leer solo la foto de perfil en cualquier vista pública:
```ts
import { obtenerPortada } from "./lib/mediaService";
const perfil = await obtenerPortada("deportistas", deportistaId);
// perfil?.url  -> úsala en <img src={...}>
```

## Casos extra que incluí (recomendados)

### 5) Logos de clubes
```tsx
<MediaUploader modulo="clubes" entidadId={clubId} multiple={false} />
```

### 6) Documentos / afiches / branding del sitio (global)
```tsx
// Sin entidadId => branding global (banner de portada, logo federación, convocatorias)
<MediaUploader modulo="documentos" />
```

### 7) Archivos de resultados por evento (Excel / PDF / CSV)
```tsx
<MediaUploader modulo="resultados" entidadId={eventoId} permitirPortada={false} />
```

## Uso sin componente (solo lógica)

```ts
import { subirMedio, listarMedios, eliminarMedio } from "./lib/mediaService";

// subir un logo de patrocinador
await subirMedio({ modulo: "patrocinadores", entidadId: 12, file, esPublico: true });

// listar la galería de un evento
const fotos = await listarMedios({ modulo: "eventos", entidadId: 5 });
```

## Otros casos de uso que te recomiendo agregar

- **Firmas / oficios de directiva** (privado): documentos internos solo visibles para
  staff; usa `modulo="documentos"` con el toggle privado activado.
- **Certificados y diplomas de deportistas**: reutiliza `modulo="deportistas"` con
  `tipo documento`, o crea un módulo `certificados`.
- **Fotos de instalaciones / piscinas**: útil para la sección de sedes; podrías añadir
  un módulo `sedes` ligado a `tipos_piscina`.
- **Prensa / medios de comunicación**: kit de prensa descargable (logos en alta,
  guía de marca) dentro de `documentos`.
- **Récords nacionales**: imagen/scan del acta que valida un récord, ligado a `tiempos`.

Para agregar un módulo nuevo: crea el bucket (con límites), añádelo al enum
`modulo_medio` en la BD, y agrégalo a `MEDIA_CONFIG`. El componente y el hook funcionan
sin cambios.

## Migraciones aplicadas (referencia)

Ver `migrations.sql`. Ya están aplicadas; se incluyen para control de versiones.
```

## Variables de entorno

```
VITE_SUPABASE_URL=https://tmpubpndujcyeablirah.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_jnHzWYWXZvKrb-oH7OepFQ_5j4jRGqT
```
Usa siempre la **publishable key** en el frontend, nunca la `service_role`.

# Guía de implementación frontend — Sistema de medios FEHNA

Todo lo que hay que tener en consideración para programar correctamente la subida y
gestión de imágenes/archivos desde el frontend. La infraestructura (buckets, tabla
`medios`, RLS y políticas de Storage) **ya está aplicada** en el proyecto Supabase
`DB_fehna`. Esta guía cubre el lado del cliente.

---

## 0. Antes de empezar (checklist)

- [ ] Instalar `@supabase/supabase-js` (v2).
- [ ] Definir variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
      (publishable key, **nunca** la `service_role`).
- [ ] Copiar `lib/`, `hooks/` y `components/` a `src/`.
- [ ] Tener funcionando el login de Supabase Auth (las subidas requieren sesión).
- [ ] Confirmar que cada usuario que sube tiene fila en `perfiles` con
      `rol IN ('admin','digitador')` y `activo = true`.

---

## 1. Autenticación: es un requisito, no un extra

Subir, editar o borrar **solo funciona con un usuario autenticado que sea staff**.
Las políticas RLS lo imponen en el servidor; el frontend debe reflejarlo:

- No mostrar el `<MediaUploader>` a usuarios anónimos o sin rol staff.
- Verificar la sesión antes de renderizar el panel:
  ```ts
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirigirALogin();
  ```
- Si el token expira a mitad de una subida larga, Supabase devuelve error 401/403.
  Maneja `onAuthStateChange` para refrescar o reintentar.
- **No confíes en ocultar el botón como seguridad.** La seguridad real está en RLS;
  ocultar la UI es solo UX. Un usuario sin rol que intente subir recibirá un error
  del servidor, y eso está bien.

## 2. Distinguir lectura pública vs. escritura restringida

| Acción | Quién puede | Dónde se aplica |
|---|---|---|
| Ver medios públicos | Cualquiera (anon) | RLS `medios_select_publico` + bucket público |
| Ver medios privados | Solo staff | RLS + signed URL |
| Subir / editar / borrar | Solo admin/digitador | RLS `es_staff()` + Storage policies |

En las páginas públicas (web del sitio) usa `listarMedios` / `obtenerPortada` sin
sesión: funcionan porque los medios públicos son legibles por `anon`. No metas ahí
lógica de subida.

## 3. Validación (doble capa, siempre)

El servidor ya valida mime type y tamaño por bucket, pero valida también en cliente
para dar feedback inmediato:

- Usa `validarArchivo(modulo, file)` antes de subir (ya integrado en `subirMedio`).
- Respeta el `accept` del `<input type="file">` — mejora UX pero **no** es seguridad
  (se puede saltar). La validación JS y la del servidor son las que cuentan.
- Considerar que `file.type` puede venir vacío en algunos navegadores/archivos: trátalo
  como "tipo no permitido".
- Límites vigentes: imágenes 5 MB, documentos 10 MB, resultados (xlsx/pdf/csv) 15 MB.
- **SVG está prohibido** en imágenes (riesgo XSS). Si necesitas logos vectoriales,
  conviértelos a PNG/WebP antes de subir, o abre un módulo aparte con validación extra.

## 4. Nombres de archivo y rutas: no los construyas a mano

- El servicio genera el nombre con `crypto.randomUUID()` + extensión derivada del mime
  type. **No uses el `file.name` como ruta** (path traversal, colisiones, caracteres
  raros, doble extensión tipo `foto.php.jpg`).
- Estructura de ruta: `<modulo>/<entidadId|global>/<uuid>.<ext>`. Si cambias esto,
  mantén el prefijo por entidad para poder borrar en lote fácilmente.
- Guarda `file.name` solo como `titulo` (texto visible), nunca como identificador.

## 5. Múltiples imágenes por entidad

- Para noticias, eventos y álbum de deportistas: `multiple` activo.
- La subida es **en serie** (`subirVarios`) para no saturar y poder mostrar progreso
  `x/total`. Si el usuario sube 20 fotos, no bloquees la UI: muestra spinner + contador.
- Si una falla a mitad, las anteriores ya quedaron subidas. Decide el comportamiento:
  la implementación actual sigue y reporta el error; refresca la lista al terminar para
  ver qué entró.
- Ordena la galería con `orden`. Si implementas drag-and-drop, llama `reordenar(ids)`
  con el nuevo orden y refresca.

## 6. Portada / foto de perfil

- Regla de negocio: **una sola portada por entidad** (garantizado por un índice único
  parcial en la BD). Si marcas otra, primero se desmarca la anterior — `marcarPortada`
  ya lo hace en dos pasos.
- Para el deportista, portada = foto de perfil. En vistas públicas usa
  `obtenerPortada("deportistas", id)` en vez de traer todo el álbum.
- Al subir la **primera** imagen de una entidad, considera marcarla portada
  automáticamente si no hay ninguna (mejora UX). No está automatizado: hazlo en tu
  handler si lo quieres.
- Si borras la portada, la entidad queda sin portada: ofrece elegir otra o define un
  placeholder por defecto en el frontend.

## 7. Público vs. privado

- Por defecto **público**. El toggle "Subir como privado" cambia el bucket a `privado`
  y marca `es_publico = false`.
- Los archivos privados se leen con **URL firmada temporal** (`createSignedUrl`, 1h por
  defecto). Consecuencias en el frontend:
  - La URL **expira**: no la caches indefinidamente ni la guardes en BD. Regenérala al
    cargar la vista.
  - Solo staff puede generar la URL firmada (RLS). No intentes mostrar privados en
    páginas públicas.
  - Para imágenes privadas que se ven muchas veces, regenera la URL al montar el
    componente, no en cada render.
- No se puede "cambiar" un archivo de público a privado moviéndolo entre buckets desde
  el cliente sin re-subir. Si necesitas eso, súbelo de nuevo y borra el anterior.

## 8. Manejo de errores (qué mostrar al usuario)

Todos los métodos lanzan `MediaError` con mensaje en español. Captura y muestra:

- Archivo muy grande / tipo no permitido → mensaje claro con el límite.
- 401/403 → "Tu sesión expiró o no tienes permisos", y redirige a login si aplica.
- Error de red a mitad de subida → permite reintentar; el archivo no quedó registrado
  (el servicio hace rollback: borra del Storage si falla el insert en `medios`).
- Nunca dejes al usuario sin feedback: usa los estados `subiendo`, `progreso`, `error`
  del hook.

## 9. Consistencia Storage ↔ tabla `medios`

- **Siempre borra con `eliminarMedio`** (borra Storage y fila). Si borras solo la fila,
  el archivo queda huérfano ocupando espacio; si borras solo el archivo, quedan
  registros rotos con URLs 404.
- Al eliminar una entidad padre (una noticia, un evento, un deportista), **borra
  también sus medios**. La FK a `entidad_id` es lógica (no hay `ON DELETE CASCADE`
  porque `medios` es polimórfica). Opciones:
  - Antes de borrar la entidad: `listarMedios({ modulo, entidadId })` → `eliminarMedio`
    de cada uno.
  - O crea un helper `eliminarMediosDeEntidad(modulo, entidadId)`.
- El `imagen_portada` (texto) que ya existe en `noticias` no se sincroniza solo con
  `medios`. Decide una única fuente de verdad: o migras a usar `medios` (recomendado) o
  actualizas ambos a la vez.

## 10. Rendimiento y experiencia

- **Comprime/redimensiona antes de subir** imágenes grandes de cámara (pueden pesar
  10 MB+ y no pasarán el límite de 5 MB). Usa `browser-image-compression` o un canvas
  para bajar a ~1600px de ancho y calidad 0.8 antes de `subirMedio`.
- Genera **previews locales** con `URL.createObjectURL(file)` y libéralos con
  `revokeObjectURL` al desmontar.
- Para galerías largas usa `loading="lazy"` en las `<img>` y considera paginar.
- Sirve imágenes públicas con las transformaciones de Supabase si las activas
  (parámetros `?width=&quality=` en la URL pública) para thumbnails.
- No vuelvas a subir un archivo ya existente sin necesidad: `upsert: false` evita
  sobrescrituras accidentales; si quieres reemplazar, borra y sube.

## 11. Accesibilidad y UX de formularios

- Pide siempre un **texto alternativo** (`titulo`) para imágenes públicas — importa para
  SEO y accesibilidad. Ahora usa el nombre del archivo por defecto; mejóralo con un
  campo editable.
- Estados vacíos claros ("Aún no hay imágenes"), y confirmación antes de borrar.
- Deshabilita el botón de subir mientras `subiendo` es true para evitar dobles envíos.
- Feedback de arrastrar-soltar (el componente ya cambia de estilo al arrastrar).

## 12. Casos borde a cubrir

- Usuario sin conexión / se cae la red a mitad → reintento.
- Subir 0 archivos o cancelar el diálogo → no hacer nada.
- Archivo con nombre duplicado → no importa, el UUID lo hace único.
- Entidad aún no creada (id no existe): sube primero la entidad, obtén su `id`, luego
  sube los medios. Para formularios "nuevos", guarda la entidad primero.
- Branding global (`entidadId = null`): asegúrate de filtrar con `IS NULL`, no `= null`
  (el servicio ya lo maneja).
- Doble clic en "subir" → protégelo con el estado `subiendo`.

## 13. Seguridad — resumen de responsabilidades del frontend

- Usar **solo** la publishable/anon key en el cliente.
- No exponer ni loggear tokens de sesión.
- No construir rutas con input del usuario.
- Confiar en RLS como última línea; la validación de cliente es UX, no seguridad.
- Para archivos sensibles (p. ej. de menores) usar el modo privado + signed URLs y no
  cachear esas URLs.
- Revisar periódicamente `get_advisors` en Supabase tras cambios de esquema.

## 14. Cómo agregar un módulo nuevo (mantenerlo escalable)

1. Crear el bucket con `file_size_limit` y `allowed_mime_types`.
2. Agregar el valor al enum `modulo_medio` (`ALTER TYPE ... ADD VALUE`).
3. Añadir la entrada en `MEDIA_CONFIG`.
El componente `<MediaUploader>`, el hook y el servicio funcionan sin más cambios.

---

## Apéndice: matriz de módulos

| Módulo | Bucket | Multiple | Portada | Tipos | Máx |
|---|---|---|---|---|---|
| Logo patrocinador | patrocinadores | No | — | jpg/png/webp/avif | 5 MB |
| Logo club | clubes | No | — | jpg/png/webp/avif | 5 MB |
| Noticia | noticias | Sí | Sí (imagen principal) | + gif | 5 MB |
| Evento (galería) | eventos | Sí | Sí | + gif | 5 MB |
| Deportista | deportistas | Sí (álbum) | Sí (foto perfil) | jpg/png/webp/avif | 5 MB |
| Documentos/branding | documentos | Sí | — | imágenes + pdf | 10 MB |
| Resultados por evento | resultados | Sí | — | pdf/csv/xls/xlsx | 15 MB |
| (cualquiera privado) | privado | — | — | según selección | 15 MB |

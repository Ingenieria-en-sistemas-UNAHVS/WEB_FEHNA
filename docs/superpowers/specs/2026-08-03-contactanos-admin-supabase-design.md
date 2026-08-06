# Diseño: conectar Contáctanos (admin ↔ público) vía Supabase

## Objetivo

La página pública `/contacto` debe mostrar la información que el admin edita en
`/admin/contacto`, persistida en Supabase. Hoy ambos lados existen pero están
desconectados: el admin ya lee/escribe en Supabase; el público renderiza datos
mock hardcodeados con una forma de datos incompatible.

## Estado actual (hallazgos)

- **Admin** (`ContactoAdmin.tsx`) ya tiene CRUD funcional contra dos tablas:
  - `redes_sociales`: catálogo fijo (enum `tipo_red_social`: facebook,
    instagram, x, youtube, tiktok, whatsapp, linkedin, threads) con
    `url`, `orden`, `visible`. Solo se edita url/visible, no se crean filas.
  - `informacion_contacto`: lista libre con `icono` (clave de texto),
    `titulo`, `descripcion`, `orden`, `visible`. CRUD completo.
- **Público** (`/contacto`): renderiza `ContactsSection` con
  `CONTACTOS_MOCK`, un array estático con forma `ContactChannelData[]`
  (`canal` + `entradas[]`) que no corresponde a ninguna de las dos tablas.
- Ya existen, sin usar, `getRedesSociales()` y `getInformacionContacto()` en
  `src/lib/data/contacto.ts`, que consultan exactamente lo que el público
  necesita (`.eq("visible", true).order("orden")`) y devuelven
  `RedSocialRow[]` / `InfoContactoRow[]`.
- El mapeo de íconos ya es compartido entre admin y público vía
  `src/lib/contactoIconos.tsx` (`REDES_SOCIALES_INFO`, `ICONOS_CONTACTO_INFO`).
- No se necesita ninguna tabla, columna ni migración nueva: el esquema actual
  ya cubre lo que el público debe mostrar.

## Alcance

- Convertir `src/app/(site)/contacto/page.tsx` en un Server Component async
  que llama a `getRedesSociales()` y `getInformacionContacto()`, siguiendo el
  mismo patrón que `src/app/(site)/noticias/page.tsx`.
- Rehacer `ContactsSection` para recibir `redes: RedSocialRow[]` e
  `info: InfoContactoRow[]` en vez del mock, y renderizar dos grupos de
  tarjetas:
  - Redes sociales: ícono + etiqueta (`REDES_SOCIALES_INFO[red]`) + enlace a
    `url`.
  - Información de contacto: ícono (`iconoContacto(icono)`) + `titulo` +
    `descripcion` (texto, sin enlace — la tabla no tiene `href`).
- Si ambos arrays llegan vacíos, la sección no se renderiza (igual que hoy).
- Eliminar el código muerto que deja de usarse: `contacts.mock.ts`,
  `contact.types.ts`, `contact-channels.tsx`, el `ContactCard.tsx` actual (se
  reemplaza por dos componentes de tarjeta simples) y el wrapper
  `ContactoSection.tsx` (redundante una vez que `page.tsx` llama directo a
  `ContactsSection`, igual que `NoticiasPage`).
- `AffiliationCallout` se mantiene igual (es un CTA estático, no dato de
  contacto).
- Actualizar el barrel `index.ts` de la feature con los nuevos exports.

## No incluido

- Nuevas tablas, columnas o migraciones de Supabase.
- Cambios al panel admin (`ContactoAdmin.tsx`) — ya funciona correctamente.
- Campos estructurados de dirección/mapa/horario más allá del modelo genérico
  ícono+título+descripción que ya existe en `informacion_contacto`.

## Verificación

- `pnpm build` para cubrir tipos (no hay script de typecheck separado).
- Prueba manual en navegador: editar/ocultar una fila en
  `/admin/contacto` (ambas pestañas) y confirmar que `/contacto` refleja el
  cambio al recargar; agregar una fila nueva en "Información de Contacto" y
  confirmar que aparece en el orden correcto.

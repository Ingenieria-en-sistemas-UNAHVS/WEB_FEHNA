# Contáctanos admin-público vía Supabase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que `/contacto` renderice los datos reales que el admin edita en `/admin/contacto` (tablas `redes_sociales` e `informacion_contacto`), en vez del mock hardcodeado actual.

**Architecture:** Convertir `src/app/(site)/contacto/page.tsx` en un Server Component async que llama a las funciones ya existentes `getRedesSociales()` / `getInformacionContacto()` (`src/lib/data/contacto.ts`), y reescribir `ContactsSection` y sus tarjetas para consumir esas filas reales en vez del tipo mock `ContactChannelData`. No se toca el admin ni el esquema de Supabase — ambos ya funcionan.

**Tech Stack:** Next.js App Router 16 (Server Components), TypeScript, Tailwind CSS v4, lucide-react, Supabase (cliente server-side existente en `@/lib/supabase/server`).

## Global Constraints

- No agregar tablas, columnas ni migraciones de Supabase — el esquema actual (`redes_sociales`, `informacion_contacto`) ya cubre el caso de uso.
- No modificar `src/features/admin/screens/ContactoAdmin.tsx` ni `src/lib/data/contacto.ts` — ya funcionan correctamente.
- Reutilizar el mapeo de íconos existente en `src/lib/contactoIconos.tsx` (`REDES_SOCIALES_INFO`, `iconoContacto`) en vez de duplicarlo.
- Mantener el sistema visual FEHNA (clases Tailwind, tipografía "Barlow Condensed" para títulos, paleta `bg-card`/`border-white/10`/`text-accent` ya usada en la sección).
- No hay script de typecheck ni test runner configurado (`package.json` solo define `dev`/`build`/`start`); la verificación de tipos y sintaxis se hace con `pnpm build`.
- Eliminar por completo el código que deja de usarse (mock, tipos viejos, wrapper) en vez de dejarlo sin referenciar.

---

### Task 1: Tarjetas y sección pública consumiendo filas reales de Supabase

**Files:**
- Create: `src/features/home/sections/contacts/components/SocialCard.tsx`
- Create: `src/features/home/sections/contacts/components/InfoCard.tsx`
- Modify: `src/features/home/sections/contacts/ContactsSection.tsx`
- Modify: `src/features/home/sections/contacts/index.ts`
- Delete: `src/features/home/sections/contacts/components/ContactCard.tsx`
- Delete: `src/features/home/sections/contacts/config/contact-channels.tsx`
- Delete: `src/features/home/sections/contacts/data/contacts.mock.ts`
- Delete: `src/features/home/sections/contacts/types/contact.types.ts`

**Interfaces:**
- Consume: `RedSocialRow = { id: number; red: string; url: string; orden: number; visible: boolean }` y `InfoContactoRow = { id: number; icono: string; titulo: string; descripcion: string; orden: number; visible: boolean }`, ambos exportados por `src/lib/data/contacto.ts` (ya existente, no se modifica).
- Consume: `REDES_SOCIALES_INFO: Record<Enums<"tipo_red_social">, { label: string; Icon: LucideIcon }>` e `iconoContacto(clave: string): LucideIcon`, ambos de `src/lib/contactoIconos.tsx` (ya existente).
- Produce: `SocialCard({ red: RedSocialRow })`, `InfoCard({ info: InfoContactoRow })`.
- Produce: `ContactsSection({ redes: RedSocialRow[]; info: InfoContactoRow[] })` — usado por Task 2.

- [ ] **Step 1: Crear `SocialCard.tsx`.**

```tsx
import type { LucideIcon } from "lucide-react";
import { REDES_SOCIALES_INFO } from "@/lib/contactoIconos";
import type { RedSocialRow } from "@/lib/data/contacto";
import type { Enums } from "@/lib/database.types";

interface SocialCardProps {
  red: RedSocialRow;
}

// Tarjeta de un único canal social (tabla `redes_sociales`).
export function SocialCard({ red }: SocialCardProps) {
  const meta = REDES_SOCIALES_INFO[red.red as Enums<"tipo_red_social">];
  if (!meta) return null;

  const Icon: LucideIcon = meta.Icon;

  return (
    <a
      href={red.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 bg-card rounded-xl border border-white/10 p-6 hover:border-accent hover:text-accent transition-all duration-200 text-white/70"
    >
      <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center shrink-0">
        <Icon size={16} className="text-accent" />
      </div>
      <span className="text-sm font-semibold">{meta.label}</span>
    </a>
  );
}
```

- [ ] **Step 2: Crear `InfoCard.tsx`.**

```tsx
import { iconoContacto } from "@/lib/contactoIconos";
import type { InfoContactoRow } from "@/lib/data/contacto";

interface InfoCardProps {
  info: InfoContactoRow;
}

// Tarjeta de un ítem de información de contacto (tabla `informacion_contacto`).
export function InfoCard({ info }: InfoCardProps) {
  const Icon = iconoContacto(info.icono);

  return (
    <div className="flex flex-col gap-3 bg-card rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center shrink-0">
          <Icon size={16} className="text-accent" />
        </div>
        <h3
          className="text-lg font-black text-white uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {info.titulo}
        </h3>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{info.descripcion}</p>
    </div>
  );
}
```

- [ ] **Step 3: Reescribir `ContactsSection.tsx` para recibir las filas reales.**

```tsx
import type { RedSocialRow, InfoContactoRow } from "@/lib/data/contacto";
import { SocialCard } from "./components/SocialCard";
import { InfoCard } from "./components/InfoCard";
import { AffiliationCallout } from "./components/AffiliationCallout";

interface ContactsSectionProps {
  redes: RedSocialRow[];
  info: InfoContactoRow[];
}

export function ContactsSection({ redes, info }: ContactsSectionProps) {
  // Si no hay ni redes ni información visible, la sección no se renderiza.
  if (redes.length === 0 && info.length === 0) return null;

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Estamos para ayudarte
          </div>
          <h2
            className="text-5xl font-black text-white uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Contáctanos
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed max-w-xl mx-auto">
            Estos son los canales oficiales de la federación para consultas sobre
            afiliación, competencias, patrocinios o cualquier asunto relacionado
            con la natación hondureña.
          </p>
        </div>

        {info.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
            {info.map((item) => (
              <InfoCard key={item.id} info={item} />
            ))}
          </div>
        )}

        {redes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
            {redes.map((red) => (
              <SocialCard key={red.id} red={red} />
            ))}
          </div>
        )}

        <div className="max-w-5xl mx-auto mt-6">
          <AffiliationCallout />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Actualizar el barrel `index.ts`.**

```ts
// Barrel de la sección Contactos.
// Uso: import { ContactsSection } from "@/features/home/sections/contacts";
export { ContactsSection } from "./ContactsSection";
```

- [ ] **Step 5: Borrar los archivos que quedan sin uso.**

```bash
git rm src/features/home/sections/contacts/components/ContactCard.tsx \
       src/features/home/sections/contacts/config/contact-channels.tsx \
       src/features/home/sections/contacts/data/contacts.mock.ts \
       src/features/home/sections/contacts/types/contact.types.ts
```

- [ ] **Step 6: Ejecutar build para confirmar que no queda ninguna referencia rota.**

Run: `pnpm build`
Expected: falla en este punto porque `src/app/(site)/contacto/page.tsx` todavía llama a `ContactoSection`, que a su vez usa la firma vieja de `ContactsSection` sin props — este error se resuelve en la Task 2. Confirmar que el único error reportado es ese (relacionado con `ContactoSection`/`page.tsx`), no otro import roto.

- [ ] **Step 7: Commit.**

```bash
git add src/features/home/sections/contacts
git commit -m "feat: tarjetas de contacto consumen filas reales de Supabase"
```

### Task 2: Conectar la página pública a Supabase y retirar el wrapper redundante

**Files:**
- Modify: `src/app/(site)/contacto/page.tsx`
- Delete: `src/features/home/sections/contacts/ContactoSection.tsx`

**Interfaces:**
- Consume: `getRedesSociales(): Promise<RedSocialRow[]>` y `getInformacionContacto(): Promise<InfoContactoRow[]>` de `src/lib/data/contacto.ts`.
- Consume: `ContactsSection({ redes, info })` de Task 1.

- [ ] **Step 1: Borrar el wrapper `ContactoSection.tsx` (ya no aporta nada; `page.tsx` llamará a `ContactsSection` directamente, igual que `src/app/(site)/noticias/page.tsx` hace con `NoticiasSection`).**

```bash
git rm src/features/home/sections/contacts/ContactoSection.tsx
```

- [ ] **Step 2: Reescribir `src/app/(site)/contacto/page.tsx` como Server Component async.**

```tsx
import { getRedesSociales, getInformacionContacto } from "@/lib/data/contacto";
import { ContactsSection } from "@/features/home/sections/contacts";

export default async function ContactoPage() {
  const [redes, info] = await Promise.all([
    getRedesSociales(),
    getInformacionContacto(),
  ]);

  return <ContactsSection redes={redes} info={info} />;
}
```

- [ ] **Step 3: Ejecutar build.**

Run: `pnpm build`
Expected: PASS, sin errores de tipos ni imports rotos.

- [ ] **Step 4: Verificación manual en navegador — round-trip admin → público.**
  - Levantar `pnpm dev`.
  - Entrar a `/admin/contacto` (requiere sesión admin), pestaña "Información de Contacto": editar el `título`/`descripción` de un ítem existente y guardarlo.
  - Abrir `/contacto` en otra pestaña (o recargar) y confirmar que el texto editado aparece.
  - Volver al admin, pestaña "Redes Sociales": cambiar la `url` de una red y guardarlo; recargar `/contacto` y confirmar que el enlace apunta a la nueva URL.
  - Ocultar (`visible = false`) un ítem de cualquiera de las dos pestañas y confirmar que desaparece de `/contacto` al recargar.
  - Si en ese momento no existe ninguna fila visible en ninguna de las dos tablas, confirmar que `/contacto` no rompe (la sección simplemente no se renderiza) — se puede forzar temporalmente ocultando todo y luego revirtiendo.

- [ ] **Step 5: Commit.**

```bash
git add src/app/\(site\)/contacto/page.tsx src/features/home/sections/contacts
git commit -m "feat: conectar la página pública de contacto a Supabase (closes admin-contacto sync)"
```

## Self-Review Notes

- **Cobertura del spec:** Task 1 cubre "rehacer ContactsSection y tarjetas" + "eliminar código muerto"; Task 2 cubre "convertir page.tsx en Server Component async" + "eliminar wrapper" + "verificación". `AffiliationCallout` se deja intacta en ambas tasks, como especifica el diseño. No se tocan tablas, migraciones ni el admin, conforme a "No incluido" del spec.
- **Tipos consistentes:** `RedSocialRow`/`InfoContactoRow` se usan con los mismos nombres de campo (`red`, `url`, `orden`, `visible`, `icono`, `titulo`, `descripcion`) en las tres tasks y coinciden exactamente con `src/lib/data/contacto.ts`. `ContactsSection` expone `{ redes, info }` en Task 1 y se consume con esos mismos nombres en Task 2.
- **Sin placeholders:** cada step incluye el código completo a escribir; no quedan TODOs.

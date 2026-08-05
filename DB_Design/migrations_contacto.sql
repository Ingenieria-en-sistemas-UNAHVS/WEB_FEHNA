-- =====================================================================
-- Sistema de Contacto FEHNA — migración RLS + datos iniciales
-- (tablas: redes_sociales, informacion_contacto)
-- Ejecutar en el SQL Editor de Supabase. Idempotente: seguro de
-- correr más de una vez (no duplica filas ni rompe si ya existen
-- las políticas).
--
-- Motivo: la tabla "redes_sociales" no tenía filas cargadas, por lo
-- que la pestaña "Redes Sociales" del admin (src/features/admin/
-- screens/ContactoAdmin.tsx) no tenía nada que editar — solo lista
-- filas existentes, no crea el catálogo. Este script crea las 8 filas
-- fijas (una por valor del enum tipo_red_social) y refuerza el modelo
-- de seguridad ya documentado en el código ("Solo admin puede
-- escribir (RLS)"), igual que la política "admin escribe noticias"
-- de fehna_db_supabase.sql.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) RLS: lectura pública solo de filas visibles (o cualquier fila si
--    quien consulta es admin); escritura (insert/update/delete)
--    reservada al admin.
-- ---------------------------------------------------------------------
ALTER TABLE public.redes_sociales       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.informacion_contacto ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lectura publica redes_sociales" ON public.redes_sociales;
CREATE POLICY "lectura publica redes_sociales" ON public.redes_sociales
  FOR SELECT USING (visible = true OR es_admin());

DROP POLICY IF EXISTS "admin escribe redes_sociales" ON public.redes_sociales;
CREATE POLICY "admin escribe redes_sociales" ON public.redes_sociales
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

DROP POLICY IF EXISTS "lectura publica informacion_contacto" ON public.informacion_contacto;
CREATE POLICY "lectura publica informacion_contacto" ON public.informacion_contacto
  FOR SELECT USING (visible = true OR es_admin());

DROP POLICY IF EXISTS "admin escribe informacion_contacto" ON public.informacion_contacto;
CREATE POLICY "admin escribe informacion_contacto" ON public.informacion_contacto
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

-- ---------------------------------------------------------------------
-- 2) Catálogo completo de redes_sociales (8 filas, una por valor del
--    enum tipo_red_social). Las 4 que ya tenían un valor real
--    hardcodeado en el sitio (src/features/home/sections/contacts/
--    data/contacts.mock.ts, ahora retirado) quedan visibles con esa
--    misma URL. Las que nunca tuvieron cuenta confirmada quedan
--    presentes pero ocultas, listas para que el admin las complete.
-- ---------------------------------------------------------------------
INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'whatsapp', 'https://wa.me/50492867064', 1, true
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'whatsapp');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'instagram', 'https://www.instagram.com/fehna_hn/', 2, true
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'instagram');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'facebook', 'https://www.facebook.com/p/Federacion-Hondure%C3%B1a-de-Natacion-100042936587988/', 3, true
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'facebook');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'youtube', 'https://www.youtube.com/@Fehna', 4, true
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'youtube');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'x', '', 5, false
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'x');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'tiktok', '', 6, false
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'tiktok');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'linkedin', '', 7, false
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'linkedin');

INSERT INTO public.redes_sociales (red, url, orden, visible)
SELECT 'threads', '', 8, false
WHERE NOT EXISTS (SELECT 1 FROM public.redes_sociales WHERE red = 'threads');

-- ---------------------------------------------------------------------
-- NOTA: "informacion_contacto" no se siembra aquí. El único canal del
-- mock antiguo que hubiera correspondido ("correo") nunca tuvo un
-- valor real publicado, así que no hay ningún dato hardcodeado que
-- restaurar; la fila "Telefono" ya presente en la tabla fue cargada
-- por el admin de forma independiente y no se toca.
-- =====================================================================

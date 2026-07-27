-- =====================================================================
-- BASE DE DATOS - FEDERACIÓN HONDUREÑA DE NATACIÓN (FEHNA)
-- Motor: PostgreSQL (Supabase)
-- Ejecutar en el SQL Editor de Supabase.
--
-- LOGIN DEL ADMIN PANEL: se usa Supabase Auth (tabla auth.users).
-- Ahora el admin puede crear cuentas adicionales para que otras
-- personas digiten eventos y resultados, sin poder gestionar noticias
-- ni la lista de usuarios. Ver sección 9 (roles) y notas al final.
-- =====================================================================

-- ---------------------------------------------------------------------
-- TIPOS
-- Nota: sexo y rol se dejan como ENUM porque son conjuntos realmente
-- fijos. Estilo y piscina se manejan como tablas catálogo (ver abajo)
-- porque son más probables de ampliar a futuro (ej: agregar
-- "Combinado" como estilo, o una piscina de otra longitud).
-- ---------------------------------------------------------------------
CREATE TYPE sexo_tipo AS ENUM ('F', 'M');
CREATE TYPE rol_tipo  AS ENUM ('admin', 'digitador');

-- ---------------------------------------------------------------------
-- 1. NOTICIAS / BLOG
-- ---------------------------------------------------------------------
CREATE TABLE noticias (
  id                bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo            varchar(200) NOT NULL,
  slug              varchar(220) NOT NULL UNIQUE,
  resumen           varchar(500),
  contenido         text NOT NULL,
  imagen_portada    text,
  publicada         boolean NOT NULL DEFAULT false,
  fecha_publicacion timestamptz,
  creada_en         timestamptz NOT NULL DEFAULT now(),
  actualizada_en    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_noticias_publicada ON noticias (publicada, fecha_publicacion DESC);

-- ---------------------------------------------------------------------
-- 2. TIPOS DE PISCINA (catálogo, ampliable sin migraciones de tipo)
-- ---------------------------------------------------------------------
CREATE TABLE tipos_piscina (
  id      smallint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  codigo  varchar(10)  NOT NULL UNIQUE,  -- 'SC', 'LC'
  nombre  varchar(50)  NOT NULL,         -- 'Piscina corta (25m)'
  metros  smallint     NOT NULL,
  activo  boolean      NOT NULL DEFAULT true
);

INSERT INTO tipos_piscina (codigo, nombre, metros) VALUES
('SC', 'Piscina corta (25 m)', 25),
('LC', 'Piscina larga (50 m)', 50);

-- ---------------------------------------------------------------------
-- 3. EVENTOS (competencias / torneos)
-- ---------------------------------------------------------------------
CREATE TABLE eventos (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre       varchar(200) NOT NULL,
  sede         varchar(150),
  fecha_inicio date NOT NULL,
  fecha_fin    date,
  descripcion  text,
  piscina_id   smallint NOT NULL REFERENCES tipos_piscina(id),
  publicado    boolean NOT NULL DEFAULT true,
  creado_en    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_eventos_fecha ON eventos (fecha_inicio DESC);

-- ---------------------------------------------------------------------
-- 4. CLUBES
-- ---------------------------------------------------------------------
CREATE TABLE clubes (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre      varchar(150) NOT NULL UNIQUE,
  abreviatura varchar(20),
  ciudad      varchar(100),
  activo      boolean NOT NULL DEFAULT true,
  creado_en   timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------
-- 5. DEPORTISTAS
-- ---------------------------------------------------------------------
CREATE TABLE deportistas (
  id               bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombres          varchar(100) NOT NULL,
  apellidos        varchar(100) NOT NULL,
  sexo             sexo_tipo NOT NULL,
  fecha_nacimiento date NOT NULL,
  club_id          bigint REFERENCES clubes(id) ON DELETE SET NULL,
  activo           boolean NOT NULL DEFAULT true,
  creado_en        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_deportistas_club   ON deportistas (club_id);
CREATE INDEX idx_deportistas_nombre ON deportistas (apellidos, nombres);

-- ---------------------------------------------------------------------
-- 6. CATEGORÍAS (grupos de edad)
-- ---------------------------------------------------------------------
CREATE TABLE categorias (
  id       smallint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre   varchar(50) NOT NULL,
  edad_min smallint NOT NULL,
  edad_max smallint NOT NULL
);

INSERT INTO categorias (nombre, edad_min, edad_max) VALUES
('6 y menores',   0,  6),
('7-8',           7,  8),
('9-10',          9, 10),
('11-12',        11, 12),
('13-14',        13, 14),
('15-17',        15, 17),
('18 y mayores', 18, 99);

-- ---------------------------------------------------------------------
-- 7. ESTILOS (catálogo, ampliable sin migraciones de tipo)
-- ---------------------------------------------------------------------
CREATE TABLE estilos (
  id     smallint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre varchar(30) NOT NULL UNIQUE,   -- Mariposa, Dorso, Pecho, Libre
  activo boolean NOT NULL DEFAULT true
);

INSERT INTO estilos (nombre) VALUES
('Mariposa'), ('Dorso'), ('Pecho'), ('Libre');

-- ---------------------------------------------------------------------
-- 8. PRUEBAS (estilo + distancia)
-- ---------------------------------------------------------------------
CREATE TABLE pruebas (
  id        smallint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  estilo_id smallint NOT NULL REFERENCES estilos(id),
  distancia smallint NOT NULL,
  UNIQUE (estilo_id, distancia)
);

INSERT INTO pruebas (estilo_id, distancia)
SELECT e.id, d.distancia
FROM estilos e
CROSS JOIN (VALUES (25), (50), (100), (200)) AS d(distancia)
WHERE e.nombre <> 'Libre';

INSERT INTO pruebas (estilo_id, distancia)
SELECT e.id, d.distancia
FROM estilos e
CROSS JOIN (VALUES (25), (50), (100), (200), (400)) AS d(distancia)
WHERE e.nombre = 'Libre';

-- ---------------------------------------------------------------------
-- 9. PERFILES DEL PANEL (roles de acceso al admin panel)
--    auth.users guarda las credenciales (Supabase Auth). Esta tabla
--    guarda el rol de cada cuenta: 'admin' (control total) o
--    'digitador' (solo captura eventos, clubes, deportistas y tiempos).
-- ---------------------------------------------------------------------
CREATE TABLE perfiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre     varchar(100) NOT NULL,
  rol        rol_tipo NOT NULL DEFAULT 'digitador',
  activo     boolean NOT NULL DEFAULT true,
  creado_en  timestamptz NOT NULL DEFAULT now()
);

-- Cuando el admin crea una cuenta nueva desde el dashboard de Supabase
-- (Authentication -> Users -> Add user), este trigger crea
-- automáticamente su perfil como 'digitador'. Luego, si se quiere que
-- esa cuenta sea otro admin, basta con actualizar el campo rol.
CREATE OR REPLACE FUNCTION crear_perfil_nuevo_usuario()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre, rol)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)),
    'digitador'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_crear_perfil
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION crear_perfil_nuevo_usuario();

-- Función auxiliar para políticas: evita recursión de RLS al consultar
-- el propio rol dentro de las políticas de "perfiles".
CREATE OR REPLACE FUNCTION es_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM perfiles
    WHERE id = auth.uid() AND rol = 'admin' AND activo = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION tiene_acceso_panel()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM perfiles
    WHERE id = auth.uid() AND activo = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ---------------------------------------------------------------------
-- 10. TIEMPOS (resultados por evento y prueba)
-- ---------------------------------------------------------------------
CREATE TABLE tiempos (
  id             bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  deportista_id  bigint   NOT NULL REFERENCES deportistas(id) ON DELETE CASCADE,
  evento_id      bigint   NOT NULL REFERENCES eventos(id)     ON DELETE CASCADE,
  prueba_id      smallint NOT NULL REFERENCES pruebas(id),
  categoria_id   smallint NOT NULL REFERENCES categorias(id),
  edad_evento    smallint NOT NULL,
  tiempo_siembra integer,
  tiempo_final   integer  NOT NULL CHECK (tiempo_final > 0),
  posicion       smallint,
  puntos         smallint DEFAULT 0,
  registrado_por uuid REFERENCES perfiles(id),   -- quién digitó el resultado
  creado_en      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (deportista_id, evento_id, prueba_id)
);

CREATE INDEX idx_tiempos_ranking ON tiempos (prueba_id, categoria_id, tiempo_final);
CREATE INDEX idx_tiempos_evento  ON tiempos (evento_id);

-- ---------------------------------------------------------------------
-- 11. TRIGGER: mantener actualizada_en en noticias
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_actualizada_en()
RETURNS trigger AS $$
BEGIN
  NEW.actualizada_en = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_noticias_actualizada
BEFORE UPDATE ON noticias
FOR EACH ROW EXECUTE FUNCTION set_actualizada_en();

-- ---------------------------------------------------------------------
-- 12. FUNCIÓN AUXILIAR: formatear tiempo (centésimas -> "1:04.31")
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION formatear_tiempo(t integer)
RETURNS text AS $$
  SELECT CASE
    WHEN t IS NULL THEN 'NT'
    WHEN t >= 6000 THEN
      (t / 6000)::text || ':' ||
      lpad(((t % 6000) / 100)::text, 2, '0') || '.' ||
      lpad((t % 100)::text, 2, '0')
    ELSE
      ((t % 6000) / 100)::text || '.' ||
      lpad((t % 100)::text, 2, '0')
  END;
$$ LANGUAGE sql IMMUTABLE;

-- ---------------------------------------------------------------------
-- 13. SEGURIDAD (RLS de Supabase)
--     - Lectura pública para el sitio web.
--     - Noticias y perfiles: solo el/los admin(es).
--     - Eventos, clubes, deportistas, tiempos, categorías, estilos,
--       tipos_piscina: admin y digitador pueden escribir (para que los
--       digitadores capturen eventos y resultados).
-- ---------------------------------------------------------------------
ALTER TABLE noticias      ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE deportistas   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias    ENABLE ROW LEVEL SECURITY;
ALTER TABLE estilos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_piscina ENABLE ROW LEVEL SECURITY;
ALTER TABLE pruebas       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiempos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles      ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "lectura publica noticias" ON noticias
  FOR SELECT USING (publicada = true OR tiene_acceso_panel());

CREATE POLICY "lectura publica eventos" ON eventos
  FOR SELECT USING (publicado = true OR tiene_acceso_panel());

CREATE POLICY "lectura publica clubes"        ON clubes        FOR SELECT USING (true);
CREATE POLICY "lectura publica deportistas"   ON deportistas   FOR SELECT USING (true);
CREATE POLICY "lectura publica categorias"    ON categorias    FOR SELECT USING (true);
CREATE POLICY "lectura publica estilos"       ON estilos       FOR SELECT USING (true);
CREATE POLICY "lectura publica tipos_piscina" ON tipos_piscina FOR SELECT USING (true);
CREATE POLICY "lectura publica pruebas"       ON pruebas       FOR SELECT USING (true);
CREATE POLICY "lectura publica tiempos"       ON tiempos       FOR SELECT USING (true);

-- Noticias: escritura solo para admin (los digitadores no manejan el blog)
CREATE POLICY "admin escribe noticias" ON noticias
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

-- Eventos, clubes, deportistas, tiempos: admin y digitador pueden capturar
CREATE POLICY "panel escribe eventos" ON eventos
  FOR ALL TO authenticated USING (tiene_acceso_panel()) WITH CHECK (tiene_acceso_panel());

CREATE POLICY "panel escribe clubes" ON clubes
  FOR ALL TO authenticated USING (tiene_acceso_panel()) WITH CHECK (tiene_acceso_panel());

CREATE POLICY "panel escribe deportistas" ON deportistas
  FOR ALL TO authenticated USING (tiene_acceso_panel()) WITH CHECK (tiene_acceso_panel());

CREATE POLICY "panel escribe tiempos" ON tiempos
  FOR ALL TO authenticated USING (tiene_acceso_panel()) WITH CHECK (tiene_acceso_panel());

-- Catálogos (categorías, estilos, tipos de piscina, pruebas):
-- solo el admin los ajusta, ya que rara vez cambian.
CREATE POLICY "admin escribe categorias" ON categorias
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

CREATE POLICY "admin escribe estilos" ON estilos
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

CREATE POLICY "admin escribe tipos_piscina" ON tipos_piscina
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

CREATE POLICY "admin escribe pruebas" ON pruebas
  FOR ALL TO authenticated USING (es_admin()) WITH CHECK (es_admin());

-- Perfiles: cada quien ve su propio perfil; solo el admin ve y
-- gestiona los de los demás (asignar rol, activar/desactivar).
CREATE POLICY "usuario ve su perfil" ON perfiles
  FOR SELECT USING (id = auth.uid() OR es_admin());

CREATE POLICY "admin gestiona perfiles" ON perfiles
  FOR UPDATE TO authenticated USING (es_admin()) WITH CHECK (es_admin());

CREATE POLICY "admin elimina perfiles" ON perfiles
  FOR DELETE TO authenticated USING (es_admin());

-- =====================================================================
-- NOTAS DE USO
-- =====================================================================
-- 1. Tiempos en centésimas de segundo (integer):
--      35.18   -> 3518
--      1:04.31 -> 6431
--    formatear_tiempo(6431) -> '1:04.31'
--
-- 2. Ranking por categoría en un evento:
--      SELECT d.apellidos, d.nombres, c.nombre AS club,
--             formatear_tiempo(t.tiempo_siembra) AS siembra,
--             formatear_tiempo(t.tiempo_final)   AS final,
--             t.posicion, t.puntos
--      FROM tiempos t
--      JOIN deportistas d ON d.id = t.deportista_id
--      LEFT JOIN clubes c ON c.id = d.club_id
--      WHERE t.evento_id = $1 AND t.prueba_id = $2 AND t.categoria_id = $3
--      ORDER BY t.tiempo_final ASC;
--
-- 3. AGREGAR UN ESTILO NUEVO (ej: Combinado) A FUTURO:
--      INSERT INTO estilos (nombre) VALUES ('Combinado');
--      INSERT INTO pruebas (estilo_id, distancia)
--        SELECT id, 100 FROM estilos WHERE nombre = 'Combinado';
--    No requiere migraciones ni tocar tipos de columna.
--
-- 4. AGREGAR UNA PISCINA NUEVA A FUTURO (ej: si hubiera otra longitud):
--      INSERT INTO tipos_piscina (codigo, nombre, metros)
--      VALUES ('X', 'Nombre descriptivo', 33);
--
-- 5. CREAR UNA CUENTA NUEVA PARA UN DIGITADOR:
--    a) Dashboard de Supabase -> Authentication -> Users -> Add user
--       (con su correo y una contraseña temporal).
--    b) El trigger crea automáticamente su fila en "perfiles" con
--       rol = 'digitador' y activo = true. No se necesita nada más:
--       ya puede iniciar sesión y capturar eventos/resultados.
--    c) Si en algún momento se quiere ascenderlo a admin:
--         UPDATE perfiles SET rol = 'admin' WHERE id = '<uuid del usuario>';
--    d) Para revocarle el acceso sin borrar su cuenta:
--         UPDATE perfiles SET activo = false WHERE id = '<uuid del usuario>';
--
-- 6. Login del panel con supabase-js (funciona igual para admin y
--    digitadores; el rol determina qué puede editar el frontend, y las
--    políticas RLS lo hacen cumplir también a nivel de base de datos):
--      const { data } = await supabase.auth.signInWithPassword({ email, password });
--      const { data: perfil } = await supabase
--        .from('perfiles').select('rol').eq('id', data.user.id).single();
--      // perfil.rol === 'admin' -> mostrar también noticias y usuarios
--      // perfil.rol === 'digitador' -> mostrar solo eventos/resultados
-- =====================================================================

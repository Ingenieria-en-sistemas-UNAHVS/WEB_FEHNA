-- ============================================================
-- Sistema de medios FEHNA — migraciones (YA APLICADAS en DB_fehna)
-- Se incluyen para control de versiones / referencia.
-- ============================================================

-- 1) BUCKETS por modulo (publicos por defecto; privado opt-in)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('noticias','noticias',true,5242880,
     array['image/jpeg','image/png','image/webp','image/avif','image/gif']),
  ('eventos','eventos',true,5242880,
     array['image/jpeg','image/png','image/webp','image/avif','image/gif']),
  ('patrocinadores','patrocinadores',true,5242880,
     array['image/jpeg','image/png','image/webp','image/avif']),
  ('clubes','clubes',true,5242880,
     array['image/jpeg','image/png','image/webp','image/avif']),
  ('deportistas','deportistas',true,5242880,
     array['image/jpeg','image/png','image/webp','image/avif']),
  ('documentos','documentos',true,10485760,
     array['image/jpeg','image/png','image/webp','image/avif','application/pdf']),
  ('resultados','resultados',true,15728640,
     array['application/pdf','text/csv','application/vnd.ms-excel',
           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
  ('privado','privado',false,15728640,
     array['image/jpeg','image/png','image/webp','image/avif','application/pdf',
           'text/csv','application/vnd.ms-excel',
           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
on conflict (id) do update
  set public=excluded.public, file_size_limit=excluded.file_size_limit,
      allowed_mime_types=excluded.allowed_mime_types;

-- 2) Helper de rol
create or replace function public.es_staff()
returns boolean language sql stable security definer
set search_path = public, pg_temp as $$
  select exists (
    select 1 from public.perfiles p
    where p.id = auth.uid() and p.activo = true and p.rol in ('admin','digitador')
  );
$$;
revoke execute on function public.es_staff() from anon, public;
grant execute on function public.es_staff() to authenticated;

-- 3) Tipos + tabla medios
do $$ begin
  create type public.modulo_medio as enum
    ('noticias','eventos','patrocinadores','clubes','deportistas','documentos','resultados');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.tipo_medio as enum ('imagen','documento');
exception when duplicate_object then null; end $$;

create table if not exists public.medios (
  id bigint generated always as identity primary key,
  modulo public.modulo_medio not null,
  entidad_id bigint,
  bucket text not null,
  path text not null,
  tipo public.tipo_medio not null default 'imagen',
  mime_type text,
  tamano_bytes bigint,
  ancho integer,
  alto integer,
  titulo varchar(200),
  descripcion text,
  es_portada boolean not null default false,
  es_publico boolean not null default true,
  orden integer not null default 0,
  subido_por uuid references public.perfiles(id) on delete set null,
  creado_en timestamptz not null default now(),
  actualizada_en timestamptz not null default now(),
  unique (bucket, path)
);
create index if not exists idx_medios_modulo_entidad on public.medios (modulo, entidad_id, orden);
create unique index if not exists uq_medios_una_portada
  on public.medios (modulo, entidad_id) where es_portada = true;

create or replace function public.tg_medios_touch()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin new.actualizada_en = now(); return new; end $$;
drop trigger if exists trg_medios_touch on public.medios;
create trigger trg_medios_touch before update on public.medios
  for each row execute function public.tg_medios_touch();

-- 4) RLS de la tabla medios
alter table public.medios enable row level security;
drop policy if exists medios_select_publico on public.medios;
create policy medios_select_publico on public.medios for select to anon, authenticated
  using (es_publico = true);
drop policy if exists medios_select_staff on public.medios;
create policy medios_select_staff on public.medios for select to authenticated
  using (public.es_staff());
drop policy if exists medios_insert_staff on public.medios;
create policy medios_insert_staff on public.medios for insert to authenticated
  with check (public.es_staff());
drop policy if exists medios_update_staff on public.medios;
create policy medios_update_staff on public.medios for update to authenticated
  using (public.es_staff()) with check (public.es_staff());
drop policy if exists medios_delete_staff on public.medios;
create policy medios_delete_staff on public.medios for delete to authenticated
  using (public.es_staff());

-- 5) Policies de Storage
drop policy if exists medios_storage_read_publico on storage.objects;
create policy medios_storage_read_publico on storage.objects for select to anon, authenticated
  using (bucket_id in ('noticias','eventos','patrocinadores','clubes','deportistas','documentos','resultados'));
drop policy if exists medios_storage_read_privado on storage.objects;
create policy medios_storage_read_privado on storage.objects for select to authenticated
  using (bucket_id = 'privado' and public.es_staff());
drop policy if exists medios_storage_insert_staff on storage.objects;
create policy medios_storage_insert_staff on storage.objects for insert to authenticated
  with check (bucket_id in ('noticias','eventos','patrocinadores','clubes','deportistas','documentos','resultados','privado') and public.es_staff());
drop policy if exists medios_storage_update_staff on storage.objects;
create policy medios_storage_update_staff on storage.objects for update to authenticated
  using (bucket_id in ('noticias','eventos','patrocinadores','clubes','deportistas','documentos','resultados','privado') and public.es_staff())
  with check (bucket_id in ('noticias','eventos','patrocinadores','clubes','deportistas','documentos','resultados','privado') and public.es_staff());
drop policy if exists medios_storage_delete_staff on storage.objects;
create policy medios_storage_delete_staff on storage.objects for delete to authenticated
  using (bucket_id in ('noticias','eventos','patrocinadores','clubes','deportistas','documentos','resultados','privado') and public.es_staff());

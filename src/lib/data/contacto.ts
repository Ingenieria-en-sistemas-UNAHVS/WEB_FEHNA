import { createClient } from "@/lib/supabase/server";

export type RedSocialRow = {
  id: number;
  red: string;
  url: string;
  orden: number;
  visible: boolean;
};

export type InfoContactoRow = {
  id: number;
  icono: string;
  titulo: string;
  descripcion: string;
  orden: number;
  visible: boolean;
};

export async function getRedesSociales() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("redes_sociales")
    .select("id, red, url, orden")
    .eq("visible", true)
    .order("orden", { ascending: true });
  return (data ?? []) as RedSocialRow[];
}

export async function getInformacionContacto() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("informacion_contacto")
    .select("id, icono, titulo, descripcion, orden")
    .eq("visible", true)
    .order("orden", { ascending: true });
  return (data ?? []) as InfoContactoRow[];
}

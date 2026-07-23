// =====================================================================
// Cliente Supabase reutilizable (FEHNA)
// ---------------------------------------------------------------------
// Uso en cualquier componente:
//
//   import { supabase } from "@/lib/supabase";
//   const { data, error } = await supabase.from("eventos").select("*");
//
// Es un singleton: se crea una sola vez y se comparte en toda la app.
// Las credenciales se leen de las variables de entorno (archivo .env).
// La "publishable key" es segura para el frontend; la seguridad real la
// dan las políticas RLS definidas en la base de datos.
// =====================================================================
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase. Copia .env.example a .env y define " +
      "VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Reexporta los ayudantes de tipos para importarlos desde un solo lugar:
//   import type { Tables } from "@/lib/supabase";
//   type Evento = Tables<"eventos">;
export type { Database, Tables, TablesInsert, TablesUpdate, Enums } from "./database.types";

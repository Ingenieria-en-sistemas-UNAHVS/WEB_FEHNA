// =====================================================================
// Cliente Supabase reutilizable (FEHNA)
// ---------------------------------------------------------------------
// Singleton legacy para compatibilidad con código existente.
// Para código nuevo, importa directamente desde "@/lib/supabase/client".
// =====================================================================
export { createBrowserClient } from "./supabase/client";
export type { Database, Tables, TablesInsert, TablesUpdate, Enums } from "./database.types";

import { createBrowserClient as _create } from "@supabase/ssr";
import type { Database as DB } from "./database.types";

let _client: any = null;

function getClient() {
  if (_client) return _client;
  _client = _create<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
  return _client;
}

export const supabase = getClient();

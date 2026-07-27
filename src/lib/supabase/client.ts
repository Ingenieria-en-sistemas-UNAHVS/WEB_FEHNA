"use client";

import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import type { Database } from "../database.types";

export function createBrowserClient() {
  return _createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

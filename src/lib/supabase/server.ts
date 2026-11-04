import { createClient } from "@supabase/supabase-js";

/** Cliente de Supabase para Server Components. Misma anon key que el navegador: sin login en
 * este MVP no hay sesión/cookies que propagar, así que no hace falta un cliente por-request
 * con manejo de cookies — solo se separa de `client.ts` para no importar código de servidor
 * desde un módulo "use client". */
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Define .env.local.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

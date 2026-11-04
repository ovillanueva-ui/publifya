import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Define .env.local.");
}

/** Cliente de Supabase para el navegador (anon key). Sin login en este MVP: la seguridad real
 * vive en las políticas RLS y en las funciones RPC de mutación, no en esta key. */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

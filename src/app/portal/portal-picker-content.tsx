import { rowToCliente } from "@/lib/mappers/cliente";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ClientPickerGrid } from "@/components/portal/client-picker-grid";

/** Server Component async que hace el fetch real a Supabase — separado del page.tsx wrapper
 * para poder envolverlo en <Suspense> (mismo motivo que portal-client-content.tsx: bajo
 * `cacheComponents` un fetch fuera de un <Suspense> bloquea el prerenderizado). */
export async function PortalPickerContent() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("clientes").select("*").order("nombre");
  const clientes = (data ?? []).map(rowToCliente);

  return <ClientPickerGrid clientes={clientes} />;
}

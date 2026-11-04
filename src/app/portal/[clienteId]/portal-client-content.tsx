import { notFound } from "next/navigation";
import { rowToCliente } from "@/lib/mappers/cliente";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { PortalDashboard } from "@/components/portal/portal-dashboard";
import { PortalHeader } from "@/components/portal/portal-header";

/** Server Component async que de verdad hace `await params` + el lookup en Supabase — separado
 * del page.tsx wrapper para poder envolverlo en <Suspense> (patrón de Partial Prerendering que
 * pide `cacheComponents`/`partialPrefetching` en next.config.ts; ver CLAUDE.md). */
export async function PortalClientContent({ paramsPromise }: { paramsPromise: Promise<{ clienteId: string }> }) {
  const { clienteId } = await paramsPromise;
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("clientes").select("*").eq("id", clienteId).maybeSingle();
  if (!data) notFound();
  const cliente = rowToCliente(data);

  return (
    <div>
      <PortalHeader cliente={cliente} />
      <PortalDashboard clienteId={cliente.id} />
    </div>
  );
}

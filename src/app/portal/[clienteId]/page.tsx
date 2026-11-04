import { Suspense } from "react";
import { PortalPageSkeleton } from "@/components/portal/portal-page-skeleton";
import { PortalClientContent } from "./portal-client-content";

/** Sin `generateStaticParams`: los clientes viven en Supabase, no en un array estático, así que
 * no hay un set conocido en build time. Este wrapper NO hace `await` de `params` directamente
 * (eso rompería el prerenderizado bajo `cacheComponents`, ver CLAUDE.md) — solo monta el
 * <Suspense> alrededor del Server Component que sí lo hace. */
export default function PortalClientPage({ params }: { params: Promise<{ clienteId: string }> }) {
  return (
    <Suspense fallback={<PortalPageSkeleton />}>
      <PortalClientContent paramsPromise={params} />
    </Suspense>
  );
}

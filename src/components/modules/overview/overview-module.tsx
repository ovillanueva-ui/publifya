import { CLIENTES } from "@/data/clients";
import { useClientStore } from "@/store/client-store";
import { useClientScopedContent } from "@/hooks/use-filtered-content";
import { ClientBreakdownCard } from "./client-breakdown-card";
import { KpiCard } from "./kpi-card";

export function OverviewModule() {
  const list = useClientScopedContent();
  const activeClientId = useClientStore((s) => s.activeClientId);

  const kpis = [
    { label: "Contenidos totales", value: list.length },
    { label: "Publicados", value: list.filter((i) => i.estado === "Publicado").length },
    { label: "Programados", value: list.filter((i) => i.estado === "Programado").length },
    { label: "En revisión", value: list.filter((i) => i.estado === "En revisión").length },
  ];

  const porCliente = CLIENTES.filter((c) => activeClientId === "all" || c.id === activeClientId).map((c) => ({
    cliente: c,
    total: list.filter((i) => i.clienteId === c.id).length,
  }));

  return (
    <section>
      <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.11em] text-faint">ESPACIO DE TRABAJO</p>
      <h1 className="font-display text-[27px] font-semibold tracking-tight text-ink">Resumen</h1>
      <p className="mt-1.5 text-[13.5px] text-muted">Una vista general del contenido de tus clientes.</p>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <h2 className="mb-3 mt-8 font-sans text-sm font-bold text-ink">Contenido por cliente</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {porCliente.map(({ cliente, total }) => (
          <ClientBreakdownCard key={cliente.id} cliente={cliente} total={total} />
        ))}
      </div>
    </section>
  );
}

import { notFound } from "next/navigation";
import { CLIENTES, clienteById } from "@/data/clients";
import { PortalDashboard } from "@/components/portal/portal-dashboard";
import { PortalHeader } from "@/components/portal/portal-header";

export function generateStaticParams() {
  return CLIENTES.map((cliente) => ({ clienteId: cliente.id }));
}

export default async function PortalClientPage({ params }: { params: Promise<{ clienteId: string }> }) {
  const { clienteId } = await params;
  const cliente = clienteById(clienteId);
  if (!cliente) notFound();

  return (
    <div>
      <PortalHeader cliente={cliente} />
      <PortalDashboard clienteId={cliente.id} />
    </div>
  );
}

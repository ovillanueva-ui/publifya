import { findCliente } from "@/data/clients";
import { useClientsStore } from "@/store/clients-store";

export function ClientTag({ clienteId }: { clienteId: string }) {
  const clientes = useClientsStore((s) => s.clientes);
  const cliente = findCliente(clientes, clienteId);
  if (!cliente) return null;
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-ink">
      <span
        className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[5px] text-[9px] font-bold text-white"
        style={{ background: cliente.color }}
      >
        {cliente.iniciales}
      </span>
      {cliente.nombre}
    </span>
  );
}

import { clienteById } from "@/data/clients";

export function ClientTag({ clienteId }: { clienteId: string }) {
  const cliente = clienteById(clienteId);
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

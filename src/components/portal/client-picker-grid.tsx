import type { Cliente } from "@/types/content";
import { ClientPickerCard } from "./client-picker-card";

export function ClientPickerGrid({ clientes }: { clientes: Cliente[] }) {
  return (
    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {clientes.map((cliente) => (
        <ClientPickerCard key={cliente.id} cliente={cliente} />
      ))}
    </div>
  );
}

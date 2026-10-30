import { CLIENTES } from "@/data/clients";
import { ClientPickerCard } from "./client-picker-card";

export function ClientPickerGrid() {
  return (
    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {CLIENTES.map((cliente) => (
        <ClientPickerCard key={cliente.id} cliente={cliente} />
      ))}
    </div>
  );
}

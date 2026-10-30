import { CLIENTES } from "@/data/clients";
import { ClientCard } from "./client-card";

export function ClientsModule() {
  return (
    <section>
      <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.11em] text-faint">GESTIÓN</p>
      <h1 className="font-display text-[27px] font-semibold tracking-tight text-ink">Clientes</h1>
      <p className="mt-1.5 text-[13.5px] text-muted">Las cuentas que administra tu equipo. Selecciona una para ver solo su contenido.</p>

      <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {CLIENTES.map((cliente) => (
          <ClientCard key={cliente.id} cliente={cliente} />
        ))}
      </div>
    </section>
  );
}

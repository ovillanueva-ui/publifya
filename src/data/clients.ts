import type { Cliente } from "@/types/content";

export { useClientsStore } from "@/store/clients-store";

/** Busca un cliente dentro de una lista ya cargada — para usar dentro de callbacks (map/filter)
 * donde no se puede llamar al hook `useClientsStore` directamente. */
export function findCliente(clientes: Cliente[], id: string): Cliente | undefined {
  return clientes.find((c) => c.id === id);
}

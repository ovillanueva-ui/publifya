import type { ClienteRow } from "@/types/database";
import type { Cliente } from "@/types/content";

export function rowToCliente(row: ClienteRow): Cliente {
  return { id: row.id, nombre: row.nombre, sector: row.sector, color: row.color, iniciales: row.iniciales };
}

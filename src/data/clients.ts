import type { Cliente } from "@/types/content";

export const CLIENTES: Cliente[] = [
  { id: "cafe-luna", nombre: "Café Luna", sector: "Cafetería de especialidad", color: "#2F6F5E", iniciales: "CL" },
  { id: "moda-urbana", nombre: "Moda Urbana", sector: "Streetwear", color: "#B5533C", iniciales: "MU" },
  { id: "estudio-verde", nombre: "Estudio Verde", sector: "Arquitectura sostenible", color: "#5B7B4F", iniciales: "EV" },
  { id: "northstar-fit", nombre: "Northstar Fit", sector: "Estudio de entrenamiento", color: "#A0802E", iniciales: "NF" },
];

export function clienteById(id: string): Cliente | undefined {
  return CLIENTES.find((c) => c.id === id);
}

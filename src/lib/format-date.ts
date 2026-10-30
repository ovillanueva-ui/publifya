export function formatDate(value: string): string {
  if (!value) return "Sin definir";
  return new Date(`${value}T12:00:00`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

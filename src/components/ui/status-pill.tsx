import clsx from "clsx";
import type { EstadoContenido } from "@/types/content";

const STATUS_STYLES: Record<EstadoContenido, string> = {
  Borrador: "bg-draft-bg text-draft-fg",
  "En revisión": "bg-review-bg text-review-fg",
  Programado: "bg-scheduled-bg text-scheduled-fg",
  Publicado: "bg-published-bg text-published-fg",
};

export function StatusPill({ estado }: { estado: EstadoContenido }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold", STATUS_STYLES[estado])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {estado}
    </span>
  );
}

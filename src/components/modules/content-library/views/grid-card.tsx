import clsx from "clsx";
import { formatDate } from "@/lib/format-date";
import { ClientTag } from "@/components/ui/client-tag";
import { NetworkBadge } from "@/components/ui/network-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { useContentStore } from "@/store/content-store";
import type { Contenido } from "@/types/content";

export function GridCard({ item }: { item: Contenido }) {
  const selected = useContentStore((s) => s.selectedId === item.id);
  const setSelectedId = useContentStore((s) => s.setSelectedId);

  return (
    <button
      type="button"
      onClick={() => setSelectedId(item.id)}
      className={clsx(
        "flex flex-col gap-2.5 rounded-[10px] border border-line bg-surface p-4 text-left hover:border-accent hover:bg-accent-soft",
        selected && "border-accent bg-accent-soft"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <ClientTag clienteId={item.clienteId} />
        <StatusPill estado={item.estado} />
      </div>
      <span className="text-[13px] font-bold leading-snug text-ink">{item.titulo}</span>
      <span className="h-9 overflow-hidden text-xs leading-relaxed text-muted">{item.descripcion}</span>
      <div className="flex items-center justify-between gap-2 text-[11px] text-faint">
        <NetworkBadge redId={item.red} />
        <span>{formatDate(item.actualizado)}</span>
      </div>
    </button>
  );
}

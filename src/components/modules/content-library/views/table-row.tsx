import clsx from "clsx";
import { FileText } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import { initialsOf } from "@/lib/initials";
import { Avatar } from "@/components/ui/avatar";
import { ClientTag } from "@/components/ui/client-tag";
import { NetworkBadge } from "@/components/ui/network-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { useContentStore } from "@/store/content-store";
import type { Contenido } from "@/types/content";
import { RowActionsMenu } from "./row-actions-menu";

export function TableRow({ item }: { item: Contenido }) {
  const selected = useContentStore((s) => s.selectedId === item.id);
  const checked = useContentStore((s) => s.checkedIds.has(item.id));
  const setSelectedId = useContentStore((s) => s.setSelectedId);
  const toggleChecked = useContentStore((s) => s.toggleChecked);

  return (
    <tr className={clsx("cursor-pointer hover:bg-surface-2", selected && "bg-accent-soft")}>
      <td className="border-b border-line-soft px-3 py-[15px]">
        <input
          type="checkbox"
          aria-label={`Seleccionar ${item.titulo}`}
          checked={checked}
          onChange={(e) => toggleChecked(item.id, e.target.checked)}
        />
      </td>
      <td className="border-b border-line-soft px-3 py-[15px]" onClick={() => setSelectedId(item.id)}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line-soft bg-surface-2 text-accent">
            <FileText className="h-[17px] w-[17px]" strokeWidth={1.7} />
          </span>
          <span className="min-w-0">
            <span className="block text-[12.5px] font-bold text-ink">{item.titulo}</span>
            <span className="mt-0.5 block text-[11px] text-faint">
              {item.descripcion.slice(0, 48)}
              {item.descripcion.length > 48 ? "…" : ""}
            </span>
          </span>
        </div>
      </td>
      <td className="border-b border-line-soft px-3 py-[15px]" onClick={() => setSelectedId(item.id)}>
        <ClientTag clienteId={item.clienteId} />
      </td>
      <td className="border-b border-line-soft px-3 py-[15px]" onClick={() => setSelectedId(item.id)}>
        <StatusPill estado={item.estado} />
      </td>
      <td className="whitespace-nowrap border-b border-line-soft px-3 py-[15px] text-[12.5px] text-muted" onClick={() => setSelectedId(item.id)}>
        {item.tipo}
      </td>
      <td className="border-b border-line-soft px-3 py-[15px]" onClick={() => setSelectedId(item.id)}>
        <NetworkBadge redId={item.red} />
      </td>
      <td className="whitespace-nowrap border-b border-line-soft px-3 py-[15px] text-[12.5px] text-muted" onClick={() => setSelectedId(item.id)}>
        {formatDate(item.actualizado)}
      </td>
      <td className="whitespace-nowrap border-b border-line-soft px-3 py-[15px]" onClick={() => setSelectedId(item.id)}>
        <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
          <Avatar label={initialsOf(item.propietario)} size={24} />
          {item.propietario}
        </span>
      </td>
      <td className="border-b border-line-soft px-3 py-[15px]">
        <RowActionsMenu item={item} />
      </td>
    </tr>
  );
}

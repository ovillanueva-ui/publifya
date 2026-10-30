import { formatDate } from "@/lib/format-date";
import { NetworkBadge } from "@/components/ui/network-badge";
import { StatusPill } from "@/components/ui/status-pill";
import type { Contenido } from "@/types/content";

export function ContentHistoryList({ items }: { items: Contenido[] }) {
  return (
    <section>
      <h2 className="text-sm font-bold text-ink">Resto del contenido</h2>
      {items.length === 0 ? (
        <p className="mt-1 text-[12.5px] text-faint">Todavía no hay más contenido para mostrar.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-line-soft bg-surface-2 px-3.5 py-3">
              <StatusPill estado={item.estado} />
              <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink">{item.titulo}</span>
              <NetworkBadge redId={item.red} />
              <span className="text-[11px] text-faint">{formatDate(item.actualizado)}</span>
              {item.comentarioCliente && (
                <span className="w-full text-[11.5px] text-faint">Tu comentario: &ldquo;{item.comentarioCliente}&rdquo;</span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

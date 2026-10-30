import { formatDate } from "@/lib/format-date";
import { ClientTag } from "@/components/ui/client-tag";
import { NetworkBadge } from "@/components/ui/network-badge";
import { SectionCaption } from "@/components/ui/section-caption";
import { StatusPill } from "@/components/ui/status-pill";
import { TagChip } from "@/components/ui/tag-chip";
import type { Contenido } from "@/types/content";

export function DetailProperties({ item }: { item: Contenido }) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <SectionCaption className="mb-4">Propiedades</SectionCaption>
      <dl className="grid grid-cols-[96px_1fr] gap-x-2.5 gap-y-4 text-xs">
        <dt className="text-faint">Cliente</dt>
        <dd className="font-semibold text-ink">
          <ClientTag clienteId={item.clienteId} />
        </dd>
        <dt className="text-faint">Estado</dt>
        <dd>
          <StatusPill estado={item.estado} />
        </dd>
        <dt className="text-faint">Tipo</dt>
        <dd className="font-semibold text-ink">{item.tipo}</dd>
        <dt className="text-faint">Red</dt>
        <dd>
          <NetworkBadge redId={item.red} />
        </dd>
        <dt className="text-faint">Responsable</dt>
        <dd className="font-semibold text-ink">{item.propietario}</dd>
        <dt className="text-faint">Modificado</dt>
        <dd className="font-semibold text-ink">{formatDate(item.actualizado)}</dd>
        <dt className="text-faint">Publicación</dt>
        <dd className="font-semibold text-ink">{formatDate(item.publicacion)}</dd>
        <dt className="text-faint">Etiquetas</dt>
        <dd className="flex flex-wrap gap-1.5">
          {item.etiquetas.length ? item.etiquetas.map((tag) => <TagChip key={tag} label={tag} />) : <span className="text-faint">Sin etiquetas</span>}
        </dd>
      </dl>
    </div>
  );
}

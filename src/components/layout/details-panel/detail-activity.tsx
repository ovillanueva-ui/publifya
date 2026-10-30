import { formatDate } from "@/lib/format-date";
import { Avatar } from "@/components/ui/avatar";
import { SectionCaption } from "@/components/ui/section-caption";
import { initialsOf } from "@/lib/initials";
import type { Contenido } from "@/types/content";

export function DetailActivity({ item }: { item: Contenido }) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <SectionCaption className="mb-4">Actividad</SectionCaption>
      <div className="flex gap-2.5">
        <Avatar label={initialsOf(item.propietario)} size={28} />
        <div>
          <p className="text-xs leading-relaxed text-ink">{item.propietario} actualizó este contenido</p>
          <p className="mt-1 text-[11px] text-faint">{formatDate(item.actualizado)}</p>
        </div>
      </div>
    </div>
  );
}

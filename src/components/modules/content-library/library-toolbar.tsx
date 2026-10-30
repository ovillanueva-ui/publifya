import clsx from "clsx";
import { CalendarDays, LayoutGrid, List } from "lucide-react";
import { useClientScopedContent } from "@/hooks/use-filtered-content";
import { useLibraryFiltersStore, type SortOption } from "@/store/library-filters-store";
import type { VistaBiblioteca } from "@/types/content";

const VIEW_OPTIONS: { id: VistaBiblioteca; label: string; icon: typeof List }[] = [
  { id: "table", label: "Vista de tabla", icon: List },
  { id: "grid", label: "Vista de cuadrícula", icon: LayoutGrid },
  { id: "calendar", label: "Vista de calendario", icon: CalendarDays },
];

export function LibraryToolbar() {
  const total = useClientScopedContent().length;
  const sort = useLibraryFiltersStore((s) => s.sort);
  const setSort = useLibraryFiltersStore((s) => s.setSort);
  const vista = useLibraryFiltersStore((s) => s.vista);
  const setVista = useLibraryFiltersStore((s) => s.setVista);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-2">
        <span className="text-[13.5px] font-bold text-ink">Todo el contenido</span>
        <span className="rounded-md bg-surface-2 px-[7px] py-0.5 text-[10px] font-bold text-faint">{total}</span>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-xs text-faint">
          Ordenar por
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border border-line bg-surface px-2.5 py-2 text-xs text-ink"
        >
          <option value="reciente">Última actualización</option>
          <option value="titulo">Título A–Z</option>
          <option value="antiguo">Más antiguos primero</option>
        </select>
        <div className="ml-1 flex rounded-lg border border-line bg-surface p-0.5" role="group" aria-label="Vista de contenido">
          {VIEW_OPTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-label={label}
              aria-pressed={vista === id}
              onClick={() => setVista(id)}
              className={clsx(
                "inline-flex h-[30px] w-[30px] items-center justify-center rounded-md text-muted [&_svg]:h-[16px] [&_svg]:w-[16px]",
                vista === id && "bg-accent-soft text-accent"
              )}
            >
              <Icon strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import clsx from "clsx";
import { ESTADOS } from "@/data/content-types";
import { useFilteredContent } from "@/hooks/use-filtered-content";
import { useLibraryFiltersStore, type FiltroEstado } from "@/store/library-filters-store";

const TAB_LABELS: Record<FiltroEstado, string> = {
  Todos: "Todos",
  Borrador: "Borradores",
  "En revisión": "En revisión",
  Programado: "Programados",
  Publicado: "Publicados",
};

export function StatusTabs() {
  const estado = useLibraryFiltersStore((s) => s.estado);
  const setEstado = useLibraryFiltersStore((s) => s.setEstado);
  const resultCount = useFilteredContent().length;

  const tabs: FiltroEstado[] = ["Todos", ...ESTADOS];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3.5">
      <div className="flex gap-[22px] overflow-x-auto" role="tablist" aria-label="Filtrar por estado">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={estado === tab}
            onClick={() => setEstado(tab)}
            className={clsx(
              "whitespace-nowrap border-b-2 py-3.5 text-[12.5px] font-semibold",
              estado === tab ? "border-accent text-accent" : "border-transparent text-muted hover:text-ink"
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>
      <span className="text-[11.5px] text-faint">
        {resultCount} {resultCount === 1 ? "elemento" : "elementos"}
      </span>
    </div>
  );
}

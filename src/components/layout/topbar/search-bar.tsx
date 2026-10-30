import { Search } from "lucide-react";
import { useLibraryFiltersStore } from "@/store/library-filters-store";

export function SearchBar() {
  const query = useLibraryFiltersStore((s) => s.query);
  const setQuery = useLibraryFiltersStore((s) => s.setQuery);

  return (
    <div className="relative order-3 w-full max-w-[320px] md:order-none">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-faint" />
      <label htmlFor="global-search" className="sr-only">
        Buscar contenido
      </label>
      <input
        id="global-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar contenido, cliente o responsable..."
        className="h-9 w-full rounded-lg border border-line-soft bg-surface-2 pl-9 pr-3 text-[12.5px] text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-accent"
      />
    </div>
  );
}

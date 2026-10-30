import { REDES } from "@/data/networks";
import { TIPOS } from "@/data/content-types";
import { SelectField } from "@/components/ui/select-field";
import { useLibraryFiltersStore } from "@/store/library-filters-store";

export function FilterRow() {
  const red = useLibraryFiltersStore((s) => s.red);
  const setRed = useLibraryFiltersStore((s) => s.setRed);
  const tipo = useLibraryFiltersStore((s) => s.tipo);
  const setTipo = useLibraryFiltersStore((s) => s.setTipo);

  return (
    <div className="flex flex-wrap gap-2 pt-3.5">
      <SelectField id="filter-red" aria-label="Filtrar por red social" value={red} onChange={(e) => setRed(e.target.value)} className="w-auto py-2 text-xs">
        <option value="all">Todas las redes</option>
        {REDES.map((r) => (
          <option key={r.id} value={r.id}>
            {r.nombre}
          </option>
        ))}
      </SelectField>
      <SelectField aria-label="Filtrar por tipo de contenido" value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-auto py-2 text-xs">
        <option value="all">Todos los tipos</option>
        {TIPOS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </SelectField>
    </div>
  );
}

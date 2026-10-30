import { useMemo } from "react";
import { clienteById } from "@/data/clients";
import { useClientStore } from "@/store/client-store";
import { useContentStore } from "@/store/content-store";
import { useLibraryFiltersStore } from "@/store/library-filters-store";
import type { Contenido } from "@/types/content";

export function matchesActiveClient(item: Contenido, activeClientId: string): boolean {
  return activeClientId === "all" || item.clienteId === activeClientId;
}

/** Contenido del cliente activo, sin aplicar filtros de la biblioteca (estado, red, tipo, búsqueda). */
export function useClientScopedContent(): Contenido[] {
  const contenidos = useContentStore((s) => s.contenidos);
  const activeClientId = useClientStore((s) => s.activeClientId);
  return useMemo(() => contenidos.filter((item) => matchesActiveClient(item, activeClientId)), [contenidos, activeClientId]);
}

/** Lista final que se muestra en la biblioteca de contenido: cliente activo + filtros + orden. */
export function useFilteredContent(): Contenido[] {
  const scoped = useClientScopedContent();
  const { query, estado, red, tipo, sort } = useLibraryFiltersStore();

  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return scoped
      .filter((item) => {
        if (estado !== "Todos" && item.estado !== estado) return false;
        if (red !== "all" && item.red !== red) return false;
        if (tipo !== "all" && item.tipo !== tipo) return false;
        if (q) {
          const clienteNombre = clienteById(item.clienteId)?.nombre ?? "";
          const haystack = [item.titulo, item.descripcion, item.tipo, clienteNombre, item.propietario].join(" ").toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sort === "titulo") return a.titulo.localeCompare(b.titulo);
        if (sort === "antiguo") return a.actualizado.localeCompare(b.actualizado);
        return b.actualizado.localeCompare(a.actualizado);
      });
  }, [scoped, query, estado, red, tipo, sort]);
}

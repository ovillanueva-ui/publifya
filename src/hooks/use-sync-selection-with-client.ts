import { useEffect } from "react";
import { useClientScopedContent } from "@/hooks/use-filtered-content";
import { useContentStore } from "@/store/content-store";

/** Si el cliente activo cambia y el elemento seleccionado ya no le pertenece, selecciona el primero disponible. */
export function useSyncSelectionWithClient() {
  const scoped = useClientScopedContent();
  const selectedId = useContentStore((s) => s.selectedId);
  const setSelectedId = useContentStore((s) => s.setSelectedId);

  useEffect(() => {
    const stillValid = scoped.some((item) => item.id === selectedId);
    if (!stillValid) {
      setSelectedId(scoped[0]?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoped]);
}

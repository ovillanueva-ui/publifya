import { X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SoftButton } from "@/components/ui/soft-button";
import { useContentStore } from "@/store/content-store";
import { useModalStore } from "@/store/modal-store";
import { useUiStore } from "@/store/ui-store";
import { DetailActivity } from "./detail-activity";
import { DetailProperties } from "./detail-properties";
import { DetailThumb } from "./detail-thumb";

export function DetailsPanel() {
  const detailsPanelHidden = useUiStore((s) => s.detailsPanelHidden);
  const toggleDetailsPanel = useUiStore((s) => s.toggleDetailsPanel);
  const selectedId = useContentStore((s) => s.selectedId);
  const item = useContentStore((s) => s.contenidos.find((c) => c.id === s.selectedId));
  const openEditor = useModalStore((s) => s.openEditor);
  const openPreview = useModalStore((s) => s.openPreview);

  if (detailsPanelHidden) return null;

  return (
    <aside aria-label="Detalles del contenido" className="w-full flex-none overflow-auto border-t border-line bg-surface p-6 md:w-[320px] md:border-l md:border-t-0">
      <div className="mb-[22px] flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-ink">Detalles del contenido</h2>
        <IconButton aria-label="Cerrar panel de detalles" onClick={toggleDetailsPanel}>
          <X />
        </IconButton>
      </div>

      {item ? (
        <div>
          <DetailThumb />
          <h3 className="text-[16.5px] font-bold leading-snug text-ink">{item.titulo}</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{item.descripcion}</p>
          <div className="mt-[18px] flex gap-2">
            <PrimaryButton className="flex-1" onClick={() => openEditor(selectedId)}>
              Editar
            </PrimaryButton>
            <SoftButton className="flex-1" onClick={() => selectedId !== null && openPreview(selectedId)}>
              Vista previa
            </SoftButton>
          </div>
          <DetailProperties item={item} />
          <DetailActivity item={item} />
        </div>
      ) : (
        <p className="text-[12.5px] text-faint">Selecciona un elemento para ver sus detalles.</p>
      )}
    </aside>
  );
}

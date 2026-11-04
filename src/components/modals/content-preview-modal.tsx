"use client";

import { FileText, X } from "lucide-react";
import { ClientTag } from "@/components/ui/client-tag";
import { IconButton } from "@/components/ui/icon-button";
import { NetworkBadgeList } from "@/components/ui/network-badge-list";
import { SectionCaption } from "@/components/ui/section-caption";
import { useContentStore } from "@/store/content-store";
import { useModalStore } from "@/store/modal-store";
import { Modal } from "./modal";

export function ContentPreviewModal() {
  const previewOpen = useModalStore((s) => s.previewOpen);
  const previewId = useModalStore((s) => s.previewId);
  const closePreview = useModalStore((s) => s.closePreview);
  const item = useContentStore((s) => s.contenidos.find((c) => c.id === previewId));

  return (
    <Modal open={previewOpen} onClose={closePreview}>
      <div className="mb-[18px] flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-ink">Vista previa del contenido</h2>
        <IconButton aria-label="Cerrar vista previa" onClick={closePreview}>
          <X />
        </IconButton>
      </div>

      {item && (
        <>
          <div className="flex h-[130px] items-center justify-center rounded-[10px] bg-surface-2 text-accent">
            <FileText className="h-[34px] w-[34px]" />
          </div>
          <div className="mt-[18px] flex flex-wrap gap-2">
            <ClientTag clienteId={item.clienteId} />
            <NetworkBadgeList redIds={item.redes} />
          </div>
          <SectionCaption className="mt-3.5">{item.formato ?? item.tipoEditorial ?? "Sin definir"}</SectionCaption>
          <h3 className="mt-1.5 text-[19px] font-bold text-ink">{item.titulo}</h3>
          <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{item.descripcion || "Todavía no se agregó un resumen."}</p>
          {item.copyCompleto && (
            <p className="mt-2.5 whitespace-pre-line text-[12.5px] leading-relaxed text-faint">{item.copyCompleto}</p>
          )}
          <p className="mt-[18px] border-t border-line pt-3 text-[11.5px] text-faint">Esta vista previa muestra el resumen actual del contenido en la biblioteca.</p>
        </>
      )}
    </Modal>
  );
}

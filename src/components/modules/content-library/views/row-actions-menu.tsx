"use client";

import { useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { PopupMenuItem } from "@/components/ui/popup-menu-item";
import { PopupPanel } from "@/components/ui/popup-panel";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useContentStore } from "@/store/content-store";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { Contenido } from "@/types/content";

export function RowActionsMenu({ item }: { item: Contenido }) {
  const [open, setOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(
    ref,
    () => {
      setOpen(false);
      setConfirmingDelete(false);
    },
    open
  );

  const openEditor = useModalStore((s) => s.openEditor);
  const openPreview = useModalStore((s) => s.openPreview);
  const deleteContenido = useContentStore((s) => s.deleteContenido);
  const showToast = useToastStore((s) => s.show);

  return (
    <div ref={ref} className="relative">
      <IconButton
        aria-label={`Acciones para ${item.titulo}`}
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          setConfirmingDelete(false);
        }}
      >
        <Ellipsis />
      </IconButton>
      {open && (
        <PopupPanel className="right-0 top-[calc(100%+7px)]">
          {!confirmingDelete ? (
            <>
              <PopupMenuItem
                onClick={() => {
                  setOpen(false);
                  openPreview(item.id);
                }}
              >
                Vista previa
              </PopupMenuItem>
              <PopupMenuItem
                onClick={() => {
                  setOpen(false);
                  openEditor(item.id);
                }}
              >
                Editar
              </PopupMenuItem>
              <PopupMenuItem onClick={() => setConfirmingDelete(true)}>Eliminar</PopupMenuItem>
            </>
          ) : (
            <>
              <PopupMenuItem
                className="text-[#b5433a]"
                onClick={() => {
                  deleteContenido(item.id);
                  showToast("Contenido eliminado");
                  setOpen(false);
                }}
              >
                Confirmar eliminación
              </PopupMenuItem>
              <PopupMenuItem onClick={() => setConfirmingDelete(false)}>Cancelar</PopupMenuItem>
            </>
          )}
        </PopupPanel>
      )}
    </div>
  );
}

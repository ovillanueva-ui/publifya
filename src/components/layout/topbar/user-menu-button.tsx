"use client";

import { useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { PopupMenuItem } from "@/components/ui/popup-menu-item";
import { PopupPanel } from "@/components/ui/popup-panel";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useUiStore } from "@/store/ui-store";

export function UserMenuButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);
  const setActiveModule = useUiStore((s) => s.setActiveModule);

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label="Abrir menú de usuario" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Avatar label="AC" />
      </button>
      {open && (
        <PopupPanel className="right-0 top-[calc(100%+7px)]">
          <PopupMenuItem
            onClick={() => {
              setOpen(false);
              setActiveModule("Configuración");
            }}
          >
            Configuración del espacio
          </PopupMenuItem>
        </PopupPanel>
      )}
    </div>
  );
}

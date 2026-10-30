"use client";

import { useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import clsx from "clsx";
import { Avatar } from "@/components/ui/avatar";
import { PopupMenuItem } from "@/components/ui/popup-menu-item";
import { PopupPanel } from "@/components/ui/popup-panel";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useUiStore } from "@/store/ui-store";

export function UserCard() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const setActiveModule = useUiStore((s) => s.setActiveModule);

  return (
    <div ref={ref} className="relative border-t border-line p-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={clsx("flex w-full items-center gap-2.5 rounded-[10px] p-2 text-left hover:bg-surface-2", sidebarCollapsed && "md:justify-center")}
      >
        <Avatar label="AC" />
        <span className={clsx("min-w-0 flex-1", sidebarCollapsed && "md:hidden")}>
          <span className="block truncate text-[13px] font-bold leading-tight text-ink">Alex Chen</span>
          <span className="block truncate text-[11px] leading-tight text-faint">Administrador del espacio</span>
        </span>
        <Ellipsis className={clsx("h-3.5 w-3.5 flex-none text-faint", sidebarCollapsed && "md:hidden")} />
      </button>
      {open && (
        <PopupPanel className="bottom-[calc(100%+4px)] left-3 right-3 top-auto">
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

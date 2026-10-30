"use client";

import { useRef, useState } from "react";
import { Bell } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { PopupPanel } from "@/components/ui/popup-panel";
import { useClickOutside } from "@/hooks/use-click-outside";

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative">
      <IconButton aria-label="Notificaciones" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Bell />
      </IconButton>
      {open && (
        <PopupPanel className="right-0 top-[calc(100%+7px)] min-w-[240px]">
          <p className="px-2.5 pb-0.5 pt-2 text-[12.5px] font-bold text-ink">Notificaciones</p>
          <p className="px-2.5 pb-2.5 text-xs text-faint">Estás al día.</p>
        </PopupPanel>
      )}
    </div>
  );
}

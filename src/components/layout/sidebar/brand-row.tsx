import clsx from "clsx";
import { PanelLeftClose, X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/store/ui-store";

export function BrandRow() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebarCollapsed = useUiStore((s) => s.toggleSidebarCollapsed);
  const setMobileSidebarOpen = useUiStore((s) => s.setMobileSidebarOpen);

  return (
    <div className="mb-5 flex items-center justify-between gap-2">
      <span className={clsx("font-display text-[19px] font-semibold tracking-tight text-ink", sidebarCollapsed && "md:hidden")}>
        Publifya<span className="text-accent">.</span>
      </span>
      <IconButton className="hidden md:inline-flex" aria-label="Contraer barra lateral" onClick={toggleSidebarCollapsed}>
        <PanelLeftClose />
      </IconButton>
      <IconButton className="inline-flex md:hidden" aria-label="Cerrar navegación" onClick={() => setMobileSidebarOpen(false)}>
        <X />
      </IconButton>
    </div>
  );
}

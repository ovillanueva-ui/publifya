import { ChevronRight, Menu } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/store/ui-store";

export function Breadcrumb() {
  const activeModule = useUiStore((s) => s.activeModule);
  const setMobileSidebarOpen = useUiStore((s) => s.setMobileSidebarOpen);

  return (
    <div className="flex min-w-0 items-center gap-2 whitespace-nowrap text-xs text-faint">
      <IconButton className="md:hidden" aria-label="Abrir navegación" onClick={() => setMobileSidebarOpen(true)}>
        <Menu />
      </IconButton>
      <span>Espacio de trabajo</span>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="truncate font-semibold text-ink">{activeModule}</span>
    </div>
  );
}

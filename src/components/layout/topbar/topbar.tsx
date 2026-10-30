import { PanelRight } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/store/ui-store";
import { Breadcrumb } from "./breadcrumb";
import { NotificationsMenu } from "./notifications-menu";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { UserMenuButton } from "./user-menu-button";

export function Topbar() {
  const activeModule = useUiStore((s) => s.activeModule);
  const detailsPanelHidden = useUiStore((s) => s.detailsPanelHidden);
  const toggleDetailsPanel = useUiStore((s) => s.toggleDetailsPanel);
  const isLibrary = activeModule === "Biblioteca de contenido" || activeModule === "Calendario editorial";

  return (
    <header className="flex min-h-[66px] flex-wrap items-center gap-4 border-b border-line bg-surface px-5 py-2.5 md:flex-nowrap md:px-7">
      <Breadcrumb />
      <SearchBar />
      <div className="ml-auto flex items-center gap-1.5">
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenuButton />
        <span className="mx-1 h-5 w-px bg-line" />
        <IconButton
          aria-label="Mostrar u ocultar panel de detalles"
          aria-expanded={!detailsPanelHidden}
          disabled={!isLibrary}
          onClick={toggleDetailsPanel}
          className="disabled:opacity-40"
        >
          <PanelRight />
        </IconButton>
      </div>
    </header>
  );
}

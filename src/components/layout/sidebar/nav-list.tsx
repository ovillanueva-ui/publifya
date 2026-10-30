import { NAV_MANAGE, NAV_WORKSPACE, type NavItemConfig } from "@/data/nav-items";
import { SectionCaption } from "@/components/ui/section-caption";
import { useLibraryFiltersStore } from "@/store/library-filters-store";
import { useUiStore } from "@/store/ui-store";
import { NavItem } from "./nav-item";

function NavSection({ title, items }: { title: string; items: NavItemConfig[] }) {
  const activeModule = useUiStore((s) => s.activeModule);
  const setActiveModule = useUiStore((s) => s.setActiveModule);
  const setVista = useLibraryFiltersStore((s) => s.setVista);

  return (
    <div className="mb-4">
      <SectionCaption className="mb-2 px-3">{title}</SectionCaption>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeModule === item.id}
            onClick={() => {
              setActiveModule(item.id);
              if (item.id === "Calendario editorial") setVista("calendar");
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function NavList() {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Módulos">
      <NavSection title="Espacio de trabajo" items={NAV_WORKSPACE} />
      <div className="my-4 h-px bg-line" />
      <NavSection title="Gestión" items={NAV_MANAGE} />
    </nav>
  );
}

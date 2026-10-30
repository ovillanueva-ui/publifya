"use client";

import clsx from "clsx";
import { useUiStore } from "@/store/ui-store";
import { BrandRow } from "./brand-row";
import { ClientSwitcher } from "./client-switcher";
import { NavList } from "./nav-list";
import { UserCard } from "./user-card";

export function Sidebar() {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const mobileSidebarOpen = useUiStore((s) => s.mobileSidebarOpen);

  return (
    <aside
      aria-label="Navegación principal"
      className={clsx(
        "fixed inset-y-0 left-0 z-30 flex h-screen w-[252px] flex-none flex-col border-r border-line bg-surface transition-transform md:sticky md:translate-x-0",
        sidebarCollapsed ? "md:w-[76px]" : "md:w-[252px]",
        mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}
    >
      <div className="px-4 pt-5">
        <BrandRow />
        <ClientSwitcher />
      </div>
      <NavList />
      <UserCard />
    </aside>
  );
}

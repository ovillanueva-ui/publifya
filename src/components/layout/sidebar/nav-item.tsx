import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-3 whitespace-nowrap rounded-[9px] px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
        sidebarCollapsed && "md:justify-center",
        active ? "bg-accent-soft font-bold text-accent" : "text-muted hover:bg-surface-2 hover:text-ink"
      )}
    >
      <Icon className="h-[17px] w-[17px] flex-none" strokeWidth={1.8} />
      <span className={clsx(sidebarCollapsed && "md:hidden")}>{label}</span>
    </button>
  );
}

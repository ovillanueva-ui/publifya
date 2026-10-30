"use client";

import { useRef, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import clsx from "clsx";
import { CLIENTES, clienteById } from "@/data/clients";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useClientStore } from "@/store/client-store";
import { useUiStore } from "@/store/ui-store";
import { ClientMenu } from "./client-menu";

export function ClientSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const activeClientId = useClientStore((s) => s.activeClientId);
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const cliente = activeClientId !== "all" ? clienteById(activeClientId) : undefined;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={clsx(
          "flex w-full items-center gap-2.5 rounded-[10px] border border-line bg-surface-2 p-2 text-left hover:bg-line-soft",
          sidebarCollapsed && "md:justify-center"
        )}
      >
        <span
          className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ background: cliente?.color ?? "var(--color-accent)" }}
        >
          {cliente?.iniciales ?? "PF"}
        </span>
        <span className={clsx("min-w-0 flex-1", sidebarCollapsed && "md:hidden")}>
          <span className="block truncate text-[13px] font-bold leading-tight text-ink">{cliente?.nombre ?? "Todos los clientes"}</span>
          <span className="block truncate text-[11px] leading-tight text-faint">{cliente?.sector ?? `${CLIENTES.length} cuentas activas`}</span>
        </span>
        <ChevronsUpDown className={clsx("h-[13px] w-[13px] flex-none text-faint", sidebarCollapsed && "md:hidden")} />
      </button>
      {open && <ClientMenu onPick={() => setOpen(false)} />}
    </div>
  );
}

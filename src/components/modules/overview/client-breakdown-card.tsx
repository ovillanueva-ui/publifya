import type { Cliente } from "@/types/content";

export function ClientBreakdownCard({ cliente, total }: { cliente: Cliente; total: number }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ background: cliente.color }}
        >
          {cliente.iniciales}
        </span>
        <div>
          <span className="block text-sm font-bold text-ink">{cliente.nombre}</span>
          <span className="block text-[11.5px] text-faint">{cliente.sector}</span>
        </div>
      </div>
      <div>
        <span className="font-mono text-lg font-semibold tabular-nums text-ink">{total}</span>
        <span className="ml-1.5 text-[10.5px] uppercase tracking-wide text-faint">contenidos</span>
      </div>
    </div>
  );
}

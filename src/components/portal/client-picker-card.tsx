import Link from "next/link";
import type { Cliente } from "@/types/content";

export function ClientPickerCard({ cliente }: { cliente: Cliente }) {
  return (
    <Link
      href={`/portal/${cliente.id}`}
      className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent hover:bg-accent-soft"
    >
      <span
        className="flex h-10 w-10 flex-none items-center justify-center rounded-lg text-sm font-bold text-white"
        style={{ background: cliente.color }}
      >
        {cliente.iniciales}
      </span>
      <div>
        <span className="block text-sm font-bold text-ink">{cliente.nombre}</span>
        <span className="block text-[11.5px] text-faint">{cliente.sector}</span>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Cliente } from "@/types/content";

export function PortalHeader({ cliente }: { cliente: Cliente }) {
  return (
    <div className="mb-8">
      <Link href="/portal" className="mb-4 inline-flex items-center gap-1.5 text-xs text-faint hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> Cambiar de cuenta
      </Link>
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 flex-none items-center justify-center rounded-xl text-base font-bold text-white"
          style={{ background: cliente.color }}
        >
          {cliente.iniciales}
        </span>
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.11em] text-faint">PORTAL DE CLIENTE</p>
          <h1 className="font-display text-[25px] font-semibold tracking-tight text-ink">{cliente.nombre}</h1>
          <p className="text-[13px] text-muted">{cliente.sector}</p>
        </div>
      </div>
    </div>
  );
}

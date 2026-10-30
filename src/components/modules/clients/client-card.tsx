import { useClientStore } from "@/store/client-store";
import { useContentStore } from "@/store/content-store";
import { useUiStore } from "@/store/ui-store";
import type { Cliente } from "@/types/content";

export function ClientCard({ cliente }: { cliente: Cliente }) {
  const contenidos = useContentStore((s) => s.contenidos);
  const setActiveClient = useClientStore((s) => s.setActiveClient);
  const setActiveModule = useUiStore((s) => s.setActiveModule);

  const items = contenidos.filter((c) => c.clienteId === cliente.id);
  const publicados = items.filter((c) => c.estado === "Publicado").length;
  const programados = items.filter((c) => c.estado === "Programado").length;

  return (
    <button
      type="button"
      onClick={() => {
        setActiveClient(cliente.id);
        setActiveModule("Biblioteca de contenido");
      }}
      className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-4 text-left hover:border-accent"
    >
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
      <div className="flex gap-4">
        <Stat label="Contenidos" value={items.length} />
        <Stat label="Publicados" value={publicados} />
        <Stat label="Programados" value={programados} />
      </div>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <span className="block font-mono text-lg font-semibold tabular-nums text-ink">{value}</span>
      <span className="block text-[10.5px] uppercase tracking-wide text-faint">{label}</span>
    </div>
  );
}

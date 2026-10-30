import { LayoutDashboard } from "lucide-react";
import { PLACEHOLDER_COPY } from "@/data/placeholder-copy";
import { SoftButton } from "@/components/ui/soft-button";
import { useUiStore, type ModuloId } from "@/store/ui-store";

export function PlaceholderModule({ moduleId }: { moduleId: ModuloId }) {
  const setActiveModule = useUiStore((s) => s.setActiveModule);

  return (
    <section>
      <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.11em] text-faint">ESPACIO DE TRABAJO</p>
      <h1 className="font-display text-[27px] font-semibold tracking-tight text-ink">{moduleId}</h1>
      <p className="mt-1.5 text-[13.5px] text-muted">{PLACEHOLDER_COPY[moduleId] ?? "Este módulo está listo para tu equipo."}</p>

      <div className="mt-6 max-w-[480px] rounded-xl border border-line bg-surface p-7">
        <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-line-soft bg-surface-2 text-accent">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-ink">Tu espacio de trabajo, en un solo lugar</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          Selecciona la Biblioteca de contenido para gestionar tus elementos editoriales, o usa el calendario para ver el contenido programado.
        </p>
        <SoftButton className="mt-4" onClick={() => setActiveModule("Biblioteca de contenido")}>
          Abrir Biblioteca de contenido
        </SoftButton>
      </div>
    </section>
  );
}

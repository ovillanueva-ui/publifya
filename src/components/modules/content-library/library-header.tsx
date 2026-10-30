import { Plus, SlidersHorizontal } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SoftButton } from "@/components/ui/soft-button";
import { useModalStore } from "@/store/modal-store";

export function LibraryHeader() {
  const openEditor = useModalStore((s) => s.openEditor);

  function focusFilters() {
    const el = document.getElementById("filter-red");
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    el?.focus();
  }

  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.11em] text-faint">CONTENIDO / BIBLIOTECA</p>
        <h1 className="font-display text-[27px] font-semibold tracking-tight text-ink" style={{ textWrap: "balance" }}>
          Biblioteca de contenido
        </h1>
        <p className="mt-1.5 text-[13.5px] text-muted">Crea, organiza y gestiona el contenido de todos tus clientes.</p>
      </div>
      <div className="flex items-center gap-2 pt-0.5">
        <SoftButton onClick={focusFilters}>
          <SlidersHorizontal />
          <span>Filtros</span>
        </SoftButton>
        <PrimaryButton onClick={() => openEditor()}>
          <Plus />
          <span>Nuevo contenido</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

import { useContentStore } from "@/store/content-store";

export function SelectionBar() {
  const checkedIds = useContentStore((s) => s.checkedIds);
  const clearChecked = useContentStore((s) => s.clearChecked);

  if (checkedIds.size === 0) return null;

  return (
    <div className="mb-3 flex items-center gap-3 rounded-[9px] border border-line bg-accent-soft px-4 py-2.5 text-[12.5px] text-accent">
      <span>{checkedIds.size} seleccionados</span>
      <button type="button" onClick={clearChecked} className="underline">
        Limpiar selección
      </button>
    </div>
  );
}

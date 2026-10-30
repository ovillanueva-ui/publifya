import { useFilteredContent } from "@/hooks/use-filtered-content";
import { useContentStore } from "@/store/content-store";
import { TableRow } from "./table-row";

export function TableView() {
  const list = useFilteredContent();
  const checkedIds = useContentStore((s) => s.checkedIds);
  const setCheckedMany = useContentStore((s) => s.setCheckedMany);

  const allChecked = list.length > 0 && list.every((item) => checkedIds.has(item.id));
  const someChecked = list.some((item) => checkedIds.has(item.id));

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead>
          <tr>
            <th className="w-9 border-b border-line bg-surface-2 px-3 py-3.5">
              <input
                type="checkbox"
                aria-label="Seleccionar todo el contenido visible"
                checked={allChecked}
                ref={(el) => {
                  if (el) el.indeterminate = someChecked && !allChecked;
                }}
                onChange={(e) => setCheckedMany(list.map((i) => i.id), e.target.checked)}
              />
            </th>
            {["Título del contenido", "Cliente", "Estado", "Tipo", "Red", "Actualizado", "Responsable"].map((label) => (
              <th key={label} className="whitespace-nowrap border-b border-line bg-surface-2 px-3 py-3.5 text-[10px] font-bold uppercase tracking-wide text-faint">
                {label}
              </th>
            ))}
            <th className="w-[42px] border-b border-line bg-surface-2 px-3 py-3.5">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

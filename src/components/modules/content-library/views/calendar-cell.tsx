import { useContentStore } from "@/store/content-store";
import type { Contenido } from "@/types/content";

export function CalendarCell({ day, items }: { day: number | null; items: Contenido[] }) {
  const setSelectedId = useContentStore((s) => s.setSelectedId);

  if (day === null) return <div className="min-h-[108px] border-b border-r border-line-soft bg-surface-2" />;

  return (
    <div className="min-h-[108px] border-b border-r border-line-soft bg-surface p-2.5">
      <span className="text-[11px] text-faint">{day}</span>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          title={item.titulo}
          onClick={() => setSelectedId(item.id)}
          className="mt-1.5 block w-full overflow-hidden truncate rounded-md bg-accent-soft px-1.5 py-1 text-left text-[10px] text-accent"
        >
          {item.titulo}
        </button>
      ))}
    </div>
  );
}

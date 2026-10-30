import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useFilteredContent } from "@/hooks/use-filtered-content";
import { useLibraryFiltersStore } from "@/store/library-filters-store";
import { CalendarCell } from "./calendar-cell";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function CalendarView() {
  const list = useFilteredContent();
  const calendarDate = useLibraryFiltersStore((s) => s.calendarDate);
  const shiftCalendarMonth = useLibraryFiltersStore((s) => s.shiftCalendarMonth);

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: { day: number | null; key: string }[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ day: null, key: `empty-${i}` });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, key: `day-${d}` });

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line p-3.5">
        <IconButton aria-label="Mes anterior" onClick={() => shiftCalendarMonth(-1)}>
          <ChevronLeft />
        </IconButton>
        <h2 className="text-sm font-bold text-ink capitalize">
          {calendarDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h2>
        <IconButton aria-label="Mes siguiente" onClick={() => shiftCalendarMonth(1)}>
          <ChevronRight />
        </IconButton>
      </div>
      <div className="grid grid-cols-7 border-b border-line py-2.5 text-center text-[10px] font-bold uppercase tracking-wide text-faint">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map(({ day, key }) => {
          const dayKey = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
          return <CalendarCell key={key} day={day} items={day ? list.filter((item) => item.publicacion === dayKey) : []} />;
        })}
      </div>
    </div>
  );
}

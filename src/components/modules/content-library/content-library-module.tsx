import { useFilteredContent } from "@/hooks/use-filtered-content";
import { useLibraryFiltersStore } from "@/store/library-filters-store";
import { EmptyState } from "./empty-state";
import { FilterRow } from "./filter-row";
import { LibraryHeader } from "./library-header";
import { LibraryToolbar } from "./library-toolbar";
import { SelectionBar } from "./selection-bar";
import { StatusTabs } from "./status-tabs";
import { CalendarView } from "./views/calendar-view";
import { GridView } from "./views/grid-view";
import { TableView } from "./views/table-view";

export function ContentLibraryModule() {
  const vista = useLibraryFiltersStore((s) => s.vista);
  const hasResults = useFilteredContent().length > 0;

  return (
    <section>
      <LibraryHeader />
      <StatusTabs />
      <FilterRow />
      <LibraryToolbar />
      <SelectionBar />

      {hasResults ? (
        <>
          {vista === "table" && <TableView />}
          {vista === "grid" && <GridView />}
          {vista === "calendar" && <CalendarView />}
        </>
      ) : (
        <EmptyState />
      )}

      <p className="mt-5 text-xs text-faint">Una vista clara de cada historia en marcha, para cada cliente.</p>
    </section>
  );
}

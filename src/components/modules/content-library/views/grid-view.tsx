import { useFilteredContent } from "@/hooks/use-filtered-content";
import { GridCard } from "./grid-card";

export function GridView() {
  const list = useFilteredContent();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((item) => (
        <GridCard key={item.id} item={item} />
      ))}
    </div>
  );
}

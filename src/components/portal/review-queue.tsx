import type { Contenido } from "@/types/content";
import { ReviewItemCard } from "./review-item-card";

export function ReviewQueue({ items }: { items: Contenido[] }) {
  return (
    <section>
      <h2 className="text-sm font-bold text-ink">Pendiente de tu aprobación</h2>
      <p className="mt-1 text-[12.5px] text-faint">
        {items.length ? "Revisa cada elemento y apruébalo o pide cambios." : "No hay contenido esperando tu revisión en este momento."}
      </p>
      {items.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <ReviewItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

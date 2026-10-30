import { redById } from "@/data/networks";
import type { RedId } from "@/types/content";

export function NetworkBadge({ redId }: { redId: RedId }) {
  const red = redById(redId);
  if (!red) return null;
  const Icon = red.icon;
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-ink">
      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-md text-white" style={{ background: red.color }}>
        <Icon className="h-3 w-3" strokeWidth={2.2} />
      </span>
      {red.nombre}
    </span>
  );
}

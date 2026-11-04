import { NetworkBadge } from "./network-badge";
import type { RedId } from "@/types/content";

export function NetworkBadgeList({ redIds }: { redIds: RedId[] }) {
  if (redIds.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {redIds.map((redId) => (
        <NetworkBadge key={redId} redId={redId} />
      ))}
    </div>
  );
}

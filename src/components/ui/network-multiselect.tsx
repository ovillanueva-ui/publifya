import clsx from "clsx";
import { REDES } from "@/data/networks";
import type { RedId } from "@/types/content";

export function NetworkMultiSelect({ value, onChange }: { value: RedId[]; onChange: (next: RedId[]) => void }) {
  function toggle(redId: RedId) {
    onChange(value.includes(redId) ? value.filter((r) => r !== redId) : [...value, redId]);
  }

  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Redes sociales / canal">
      {REDES.map((red) => {
        const selected = value.includes(red.id);
        const Icon = red.icon;
        return (
          <button
            key={red.id}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(red.id)}
            className={clsx(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors",
              selected ? "border-transparent text-white" : "border-line bg-surface text-muted hover:border-accent"
            )}
            style={selected ? { background: red.color } : undefined}
          >
            <Icon className="h-3 w-3" strokeWidth={2.2} />
            {red.nombre}
          </button>
        );
      })}
    </div>
  );
}

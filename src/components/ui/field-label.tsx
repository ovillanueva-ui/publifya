import type { ReactNode } from "react";

export function FieldLabel({ htmlFor, children, hint }: { htmlFor?: string; children: ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[11px] font-bold text-muted">
      {children} {hint && <span className="font-normal text-faint">{hint}</span>}
    </label>
  );
}

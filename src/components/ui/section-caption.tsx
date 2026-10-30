import clsx from "clsx";
import type { ReactNode } from "react";

export function SectionCaption({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={clsx("text-[10px] font-bold uppercase tracking-[0.11em] text-faint", className)}>{children}</p>;
}

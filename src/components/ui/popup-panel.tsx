import clsx from "clsx";
import type { ReactNode } from "react";

export function PopupPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "absolute z-50 min-w-[180px] rounded-xl border border-line bg-surface p-1 shadow-[0_16px_40px_rgba(28,35,33,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}

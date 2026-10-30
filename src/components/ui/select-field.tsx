import { forwardRef, type SelectHTMLAttributes } from "react";
import clsx from "clsx";

export const SelectField = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function SelectField(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx(
        "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] text-ink focus-visible:outline-2 focus-visible:outline-accent",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

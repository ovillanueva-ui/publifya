import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const SoftButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function SoftButton(
  { className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[12.5px] font-semibold text-muted transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent [&_svg]:h-[15px] [&_svg]:w-[15px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

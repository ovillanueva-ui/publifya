import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function PrimaryButton(
  { className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-accent bg-accent px-4 py-2.5 text-[12.5px] font-bold text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:h-[15px] [&_svg]:w-[15px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

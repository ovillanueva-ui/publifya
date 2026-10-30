import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function IconButton(
  { className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent [&_svg]:h-[17px] [&_svg]:w-[17px] [&_svg]:stroke-[1.8]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

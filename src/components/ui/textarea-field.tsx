import { forwardRef, type TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextareaField(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-accent",
        className
      )}
      {...props}
    />
  );
});

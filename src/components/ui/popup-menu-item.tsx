import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export function PopupMenuItem({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={clsx("block w-full rounded-md px-2.5 py-2 text-left text-[12.5px] text-ink hover:bg-surface-2", className)}
      {...props}
    />
  );
}

import clsx from "clsx";

export function Avatar({ label, size = 30, className }: { label: string; size?: number; className?: string }) {
  return (
    <span
      className={clsx("inline-flex flex-none items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent", className)}
      style={{ width: size, height: size }}
    >
      {label}
    </span>
  );
}

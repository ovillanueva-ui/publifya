"use client";

import { useToastStore } from "@/store/toast-store";

export function Toast() {
  const message = useToastStore((s) => s.message);
  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[120] -translate-x-1/2 rounded-lg bg-ink px-4 py-2.5 text-[12.5px] text-bg"
    >
      {message}
    </div>
  );
}

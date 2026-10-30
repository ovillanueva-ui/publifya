import type { ReactNode } from "react";
import { Toast } from "@/components/ui/toast";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[720px] px-5 py-10 md:py-14">{children}</div>
      <Toast />
    </div>
  );
}

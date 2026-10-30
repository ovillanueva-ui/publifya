"use client";

import { useContentStore } from "@/store/content-store";
import { ContentHistoryList } from "./content-history-list";
import { ReviewQueue } from "./review-queue";

export function PortalDashboard({ clienteId }: { clienteId: string }) {
  const items = useContentStore((s) => s.contenidos.filter((c) => c.clienteId === clienteId));
  const enRevision = items.filter((c) => c.estado === "En revisión");
  const resto = [...items.filter((c) => c.estado !== "En revisión")].sort((a, b) => b.actualizado.localeCompare(a.actualizado));

  return (
    <div className="flex flex-col gap-10">
      <ReviewQueue items={enRevision} />
      <ContentHistoryList items={resto} />
    </div>
  );
}

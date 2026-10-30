"use client";

import { useMemo } from "react";
import { useContentStore } from "@/store/content-store";
import { ContentHistoryList } from "./content-history-list";
import { ReviewQueue } from "./review-queue";

export function PortalDashboard({ clienteId }: { clienteId: string }) {
  const contenidos = useContentStore((s) => s.contenidos);
  const items = useMemo(() => contenidos.filter((c) => c.clienteId === clienteId), [contenidos, clienteId]);
  const enRevision = useMemo(() => items.filter((c) => c.estado === "En revisión"), [items]);
  const resto = useMemo(
    () => [...items.filter((c) => c.estado !== "En revisión")].sort((a, b) => b.actualizado.localeCompare(a.actualizado)),
    [items]
  );

  return (
    <div className="flex flex-col gap-10">
      <ReviewQueue items={enRevision} />
      <ContentHistoryList items={resto} />
    </div>
  );
}

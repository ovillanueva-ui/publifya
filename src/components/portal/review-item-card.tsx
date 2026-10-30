"use client";

import { useState } from "react";
import { formatDate } from "@/lib/format-date";
import { NetworkBadge } from "@/components/ui/network-badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SoftButton } from "@/components/ui/soft-button";
import { TagChip } from "@/components/ui/tag-chip";
import { TextField } from "@/components/ui/text-field";
import { useContentStore } from "@/store/content-store";
import { useToastStore } from "@/store/toast-store";
import type { Contenido } from "@/types/content";

export function ReviewItemCard({ item }: { item: Contenido }) {
  const [requesting, setRequesting] = useState(false);
  const [comment, setComment] = useState("");
  const approveContenido = useContentStore((s) => s.approveContenido);
  const requestChanges = useContentStore((s) => s.requestChanges);
  const showToast = useToastStore((s) => s.show);

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-sm font-bold text-ink">{item.titulo}</span>
          <span className="mt-1 block text-[12.5px] text-muted">{item.descripcion}</span>
        </div>
        <NetworkBadge redId={item.red} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11.5px] text-faint">
        <span>{item.tipo}</span>
        {item.publicacion && <span>· Programado para el {formatDate(item.publicacion)}</span>}
      </div>

      {item.etiquetas.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.etiquetas.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}

      {!requesting ? (
        <div className="mt-4 flex gap-2">
          <PrimaryButton
            onClick={() => {
              approveContenido(item.id);
              showToast("Contenido aprobado");
            }}
          >
            Aprobar
          </PrimaryButton>
          <SoftButton onClick={() => setRequesting(true)}>Pedir cambios</SoftButton>
        </div>
      ) : (
        <div className="mt-4">
          <TextField
            autoFocus
            placeholder="Cuéntanos qué te gustaría cambiar"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <SoftButton
              onClick={() => {
                setRequesting(false);
                setComment("");
              }}
            >
              Cancelar
            </SoftButton>
            <PrimaryButton
              disabled={!comment.trim()}
              onClick={() => {
                requestChanges(item.id, comment.trim());
                showToast("Pediste cambios para este contenido");
                setRequesting(false);
                setComment("");
              }}
            >
              Enviar
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

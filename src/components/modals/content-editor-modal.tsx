"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { CLIENTES } from "@/data/clients";
import { ESTADOS, TIPOS } from "@/data/content-types";
import { REDES } from "@/data/networks";
import { EQUIPO } from "@/data/team";
import { FieldLabel } from "@/components/ui/field-label";
import { IconButton } from "@/components/ui/icon-button";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SelectField } from "@/components/ui/select-field";
import { SoftButton } from "@/components/ui/soft-button";
import { TextField } from "@/components/ui/text-field";
import { useClientStore } from "@/store/client-store";
import { useContentStore } from "@/store/content-store";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { Contenido, EstadoContenido, NuevoContenido, RedId, TipoContenido } from "@/types/content";
import { Modal } from "./modal";

const EMPTY_FORM: NuevoContenido = {
  clienteId: CLIENTES[0].id,
  titulo: "",
  descripcion: "",
  estado: "Borrador",
  tipo: "Publicación",
  red: "instagram",
  propietario: EQUIPO[0],
  publicacion: "",
  etiquetas: [],
};

function formFromItem(item: Contenido | undefined, fallbackClienteId: string): NuevoContenido {
  if (!item) return { ...EMPTY_FORM, clienteId: fallbackClienteId };
  const { clienteId, titulo, descripcion, estado, tipo, red, propietario, publicacion, etiquetas } = item;
  return { clienteId, titulo, descripcion, estado, tipo, red, propietario, publicacion, etiquetas };
}

/** Se remonta cada vez que el modal se abre (Modal no renderiza children cuando está cerrado), así el formulario siempre arranca con datos frescos sin necesitar un efecto. */
function EditorForm({ editorId, onClose }: { editorId: number | null; onClose: () => void }) {
  const activeClientId = useClientStore((s) => s.activeClientId);
  const existing = useContentStore((s) => s.contenidos.find((c) => c.id === editorId));
  const createContenido = useContentStore((s) => s.createContenido);
  const updateContenido = useContentStore((s) => s.updateContenido);
  const showToast = useToastStore((s) => s.show);

  const [form, setForm] = useState<NuevoContenido>(() => formFromItem(existing, activeClientId !== "all" ? activeClientId : CLIENTES[0].id));
  const [tagsInput, setTagsInput] = useState(() => (existing ? existing.etiquetas.join(", ") : ""));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    const values: NuevoContenido = {
      ...form,
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      etiquetas: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editorId !== null) {
      updateContenido(editorId, values);
      showToast("Contenido actualizado");
    } else {
      createContenido(values);
      showToast("Contenido creado");
    }
    onClose();
  }

  return (
    <>
      <div className="mb-[18px] flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-ink">{editorId !== null ? "Editar contenido" : "Nuevo contenido"}</h2>
        <IconButton aria-label="Cerrar editor" onClick={onClose}>
          <X />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div>
          <FieldLabel htmlFor="content-title">Título del contenido</FieldLabel>
          <TextField
            id="content-title"
            maxLength={100}
            required
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
        </div>
        <div>
          <FieldLabel htmlFor="content-description">Descripción</FieldLabel>
          <TextField
            id="content-description"
            maxLength={180}
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="content-cliente">Cliente</FieldLabel>
            <SelectField id="content-cliente" value={form.clienteId} onChange={(e) => setForm({ ...form, clienteId: e.target.value })}>
              {CLIENTES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </SelectField>
          </div>
          <div>
            <FieldLabel htmlFor="content-tipo">Tipo de contenido</FieldLabel>
            <SelectField id="content-tipo" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoContenido })}>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="content-estado">Estado</FieldLabel>
            <SelectField id="content-estado" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as EstadoContenido })}>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </SelectField>
          </div>
          <div>
            <FieldLabel htmlFor="content-red">Red social / canal</FieldLabel>
            <SelectField id="content-red" value={form.red} onChange={(e) => setForm({ ...form, red: e.target.value as RedId })}>
              {REDES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="content-date">Fecha de publicación</FieldLabel>
            <TextField id="content-date" type="date" value={form.publicacion} onChange={(e) => setForm({ ...form, publicacion: e.target.value })} />
          </div>
          <div>
            <FieldLabel htmlFor="content-owner">Responsable</FieldLabel>
            <SelectField id="content-owner" value={form.propietario} onChange={(e) => setForm({ ...form, propietario: e.target.value })}>
              {EQUIPO.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <div>
          <FieldLabel htmlFor="content-tags" hint="(separadas por coma)">
            Etiquetas
          </FieldLabel>
          <TextField id="content-tags" placeholder="Editorial, Temporada" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 pt-1.5">
          <SoftButton type="button" onClick={onClose}>
            Cancelar
          </SoftButton>
          <PrimaryButton type="submit">{editorId !== null ? "Guardar cambios" : "Crear contenido"}</PrimaryButton>
        </div>
      </form>
    </>
  );
}

export function ContentEditorModal() {
  const editorOpen = useModalStore((s) => s.editorOpen);
  const editorId = useModalStore((s) => s.editorId);
  const closeEditor = useModalStore((s) => s.closeEditor);

  return (
    <Modal open={editorOpen} onClose={closeEditor}>
      <EditorForm editorId={editorId} onClose={closeEditor} />
    </Modal>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { ESTADOS, PESOS, TIPOS, TIPOS_EDITORIAL } from "@/data/content-types";
import { EQUIPO } from "@/data/team";
import { FieldLabel } from "@/components/ui/field-label";
import { IconButton } from "@/components/ui/icon-button";
import { NetworkMultiSelect } from "@/components/ui/network-multiselect";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SelectField } from "@/components/ui/select-field";
import { SoftButton } from "@/components/ui/soft-button";
import { TextField } from "@/components/ui/text-field";
import { TextareaField } from "@/components/ui/textarea-field";
import { useClientStore } from "@/store/client-store";
import { useClientsStore } from "@/store/clients-store";
import { useContentStore } from "@/store/content-store";
import { useModalStore } from "@/store/modal-store";
import { useToastStore } from "@/store/toast-store";
import type { Contenido, EstadoContenido, FormatoContenido, NuevoContenido, PesoContenido, RedId, TipoEditorial } from "@/types/content";
import { Modal } from "./modal";

const EMPTY_FORM: NuevoContenido = {
  clienteId: "",
  titulo: "",
  descripcion: "",
  estado: "Borrador",
  formato: "Publicación",
  tipoEditorial: null,
  redes: [],
  peso: null,
  enfoque: null,
  copyCompleto: null,
  hashtags: null,
  cta: null,
  propietario: EQUIPO[0],
  publicacion: "",
  etiquetas: [],
};

function formFromItem(item: Contenido | undefined, fallbackClienteId: string): NuevoContenido {
  if (!item) return { ...EMPTY_FORM, clienteId: fallbackClienteId };
  const {
    clienteId, titulo, descripcion, estado, formato, tipoEditorial, redes, peso, enfoque, copyCompleto, hashtags, cta, propietario, publicacion, etiquetas,
  } = item;
  return { clienteId, titulo, descripcion, estado, formato, tipoEditorial, redes, peso, enfoque, copyCompleto, hashtags, cta, propietario, publicacion, etiquetas };
}

/** Se remonta cada vez que el modal se abre (Modal no renderiza children cuando está cerrado), así el formulario siempre arranca con datos frescos sin necesitar un efecto. */
function EditorForm({ editorId, onClose }: { editorId: string | null; onClose: () => void }) {
  const activeClientId = useClientStore((s) => s.activeClientId);
  const clientes = useClientsStore((s) => s.clientes);
  const existing = useContentStore((s) => s.contenidos.find((c) => c.id === editorId));
  const createContenido = useContentStore((s) => s.createContenido);
  const updateContenido = useContentStore((s) => s.updateContenido);
  const showToast = useToastStore((s) => s.show);

  const [form, setForm] = useState<NuevoContenido>(() =>
    formFromItem(existing, activeClientId !== "all" ? activeClientId : clientes[0]?.id ?? "")
  );
  const [tagsInput, setTagsInput] = useState(() => (existing ? existing.etiquetas.join(", ") : ""));
  const [hashtagsInput, setHashtagsInput] = useState(() => (existing?.hashtags ?? []).join(", "));
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.titulo.trim() || !form.clienteId) return;
    setSubmitting(true);
    const values: NuevoContenido = {
      ...form,
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      etiquetas: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      hashtags: hashtagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editorId !== null) {
      await updateContenido(editorId, values);
      showToast("Contenido actualizado");
    } else {
      await createContenido(values);
      showToast("Contenido creado");
    }
    setSubmitting(false);
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
          <FieldLabel htmlFor="content-description">Descripción / gancho</FieldLabel>
          <TextField
            id="content-description"
            maxLength={180}
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </div>
        <div>
          <FieldLabel htmlFor="content-copy" hint="(opcional)">
            Copy completo
          </FieldLabel>
          <TextareaField
            id="content-copy"
            rows={4}
            value={form.copyCompleto ?? ""}
            onChange={(e) => setForm({ ...form, copyCompleto: e.target.value || null })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="content-cliente">Cliente</FieldLabel>
            <SelectField id="content-cliente" required value={form.clienteId} onChange={(e) => setForm({ ...form, clienteId: e.target.value })}>
              <option value="" disabled>
                Selecciona un cliente
              </option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </SelectField>
          </div>
          <div>
            <FieldLabel htmlFor="content-formato">Formato</FieldLabel>
            <SelectField
              id="content-formato"
              value={form.formato ?? ""}
              onChange={(e) => setForm({ ...form, formato: e.target.value as FormatoContenido })}
            >
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
            <FieldLabel htmlFor="content-tipo-editorial" hint="(opcional)">
              Tipo editorial
            </FieldLabel>
            <SelectField
              id="content-tipo-editorial"
              value={form.tipoEditorial ?? ""}
              onChange={(e) => setForm({ ...form, tipoEditorial: (e.target.value || null) as TipoEditorial | null })}
            >
              <option value="">Sin clasificar</option>
              {TIPOS_EDITORIAL.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectField>
          </div>
          <div>
            <FieldLabel htmlFor="content-peso" hint="(opcional)">
              Peso
            </FieldLabel>
            <SelectField
              id="content-peso"
              value={form.peso ?? ""}
              onChange={(e) => setForm({ ...form, peso: (e.target.value || null) as PesoContenido | null })}
            >
              <option value="">Sin clasificar</option>
              {PESOS.map((p) => (
                <option key={p} value={p}>
                  {p === "valor" ? "Valor" : "Servicio"}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <div>
          <FieldLabel>Redes sociales / canal</FieldLabel>
          <NetworkMultiSelect value={form.redes} onChange={(redes: RedId[]) => setForm({ ...form, redes })} />
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
            <FieldLabel htmlFor="content-date">Fecha de publicación</FieldLabel>
            <TextField id="content-date" type="date" value={form.publicacion} onChange={(e) => setForm({ ...form, publicacion: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="content-enfoque" hint="(opcional)">
              Enfoque
            </FieldLabel>
            <TextField id="content-enfoque" value={form.enfoque ?? ""} onChange={(e) => setForm({ ...form, enfoque: e.target.value || null })} />
          </div>
          <div>
            <FieldLabel htmlFor="content-cta" hint="(opcional)">
              CTA
            </FieldLabel>
            <TextField id="content-cta" value={form.cta ?? ""} onChange={(e) => setForm({ ...form, cta: e.target.value || null })} />
          </div>
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
        <div>
          <FieldLabel htmlFor="content-tags" hint="(separadas por coma)">
            Etiquetas
          </FieldLabel>
          <TextField id="content-tags" placeholder="Editorial, Temporada" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor="content-hashtags" hint="(separados por coma, opcional)">
            Hashtags
          </FieldLabel>
          <TextField id="content-hashtags" placeholder="#nutricion, #saludmetabolica" value={hashtagsInput} onChange={(e) => setHashtagsInput(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 pt-1.5">
          <SoftButton type="button" onClick={onClose}>
            Cancelar
          </SoftButton>
          <PrimaryButton type="submit" disabled={submitting}>
            {editorId !== null ? "Guardar cambios" : "Crear contenido"}
          </PrimaryButton>
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

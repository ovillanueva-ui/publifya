import type { ContenidoRow, VContenidoRow } from "@/types/database";
import type { Contenido, NuevoContenido } from "@/types/content";

export function rowToContenido(row: VContenidoRow): Contenido {
  return {
    id: row.id,
    clienteId: row.cliente_id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    estado: row.estado,
    formato: row.formato,
    tipoEditorial: row.tipo_editorial,
    redes: row.redes,
    peso: row.peso,
    enfoque: row.enfoque,
    copyCompleto: row.copy_completo,
    hashtags: row.hashtags,
    cta: row.cta,
    propietario: row.propietario,
    publicacion: row.fecha_publicacion ?? "",
    etiquetas: row.etiquetas,
    comentarioCliente: row.comentario_cliente ?? undefined,
    actualizado: row.updated_at.slice(0, 10),
  };
}

/** Para cuando se tiene una fila base de `contenidos` (el resultado de un insert/update, que no
 * trae la agregación de etiquetas de la vista) y ya se sabe qué etiquetas se acaban de aplicar
 * vía `set_contenido_tags` — evita un segundo round-trip solo para releer la vista. */
export function baseRowToContenido(row: ContenidoRow, etiquetas: string[]): Contenido {
  return rowToContenido({ ...row, etiquetas });
}

export function contenidoToRow(values: NuevoContenido) {
  return {
    cliente_id: values.clienteId,
    titulo: values.titulo,
    descripcion: values.descripcion,
    estado: values.estado,
    formato: values.formato,
    tipo_editorial: values.tipoEditorial,
    redes: values.redes,
    peso: values.peso,
    enfoque: values.enfoque,
    copy_completo: values.copyCompleto,
    hashtags: values.hashtags,
    cta: values.cta,
    propietario: values.propietario,
    fecha_publicacion: values.publicacion || null,
    comentario_cliente: values.comentarioCliente ?? null,
  };
}

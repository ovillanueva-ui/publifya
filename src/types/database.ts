/** Formas de las tablas/vistas de Supabase (escrito a mano: no hay proyecto enlazado para generarlo). */

export type EstadoContenidoRow = "Borrador" | "En revisión" | "Programado" | "Publicado";
export type FormatoContenidoRow = "Publicación" | "Historia" | "Reel" | "Carrusel" | "Video" | "Artículo" | "Newsletter" | "Infografía";
export type TipoEditorialRow = "Educativo" | "Informativo" | "Entretenimiento" | "Comunidad" | "Promocional";
export type RedSocialRow = "instagram" | "facebook" | "tiktok" | "x" | "linkedin" | "youtube" | "blog" | "email" | "web";
export type PesoContenidoRow = "valor" | "servicio";

export interface ClienteRow {
  id: string;
  nombre: string;
  sector: string;
  color: string;
  iniciales: string;
  created_at: string;
}

export interface ContenidoRow {
  id: string;
  cliente_id: string;
  titulo: string;
  descripcion: string;
  estado: EstadoContenidoRow;
  formato: FormatoContenidoRow | null;
  tipo_editorial: TipoEditorialRow | null;
  redes: RedSocialRow[];
  peso: PesoContenidoRow | null;
  enfoque: string | null;
  copy_completo: string | null;
  hashtags: string[] | null;
  cta: string | null;
  propietario: string;
  fecha_publicacion: string | null;
  comentario_cliente: string | null;
  created_at: string;
  updated_at: string;
}

/** `contenidos` + `etiquetas` pre-agregadas (vista `v_contenidos`). Es lo que lee el store. */
export interface VContenidoRow extends ContenidoRow {
  etiquetas: string[];
}

export interface TagRow {
  id: string;
  nombre: string;
}

export interface ContenidoTagRow {
  contenido_id: string;
  tag_id: string;
}

export interface ContenidoActividadRow {
  id: string;
  contenido_id: string;
  tipo: "creado" | "actualizado" | "aprobado" | "cambios_solicitados" | "eliminado";
  detalle: string | null;
  created_at: string;
}

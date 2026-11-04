import type { EstadoContenido, FormatoContenido, PesoContenido, TipoEditorial } from "@/types/content";

export const TIPOS: FormatoContenido[] = ["Publicación", "Historia", "Reel", "Carrusel", "Video", "Artículo", "Newsletter", "Infografía"];

export const ESTADOS: EstadoContenido[] = ["Borrador", "En revisión", "Programado", "Publicado"];

export const TIPOS_EDITORIAL: TipoEditorial[] = ["Educativo", "Informativo", "Entretenimiento", "Comunidad", "Promocional"];

export const PESOS: PesoContenido[] = ["valor", "servicio"];

import type { LucideIcon } from "lucide-react";

export type EstadoContenido = "Borrador" | "En revisión" | "Programado" | "Publicado";

export type FormatoContenido =
  | "Publicación"
  | "Historia"
  | "Reel"
  | "Carrusel"
  | "Video"
  | "Artículo"
  | "Newsletter"
  | "Infografía";

export type TipoEditorial = "Educativo" | "Informativo" | "Entretenimiento" | "Comunidad" | "Promocional";

export type PesoContenido = "valor" | "servicio";

export type RedId = "instagram" | "facebook" | "tiktok" | "x" | "linkedin" | "youtube" | "blog" | "email" | "web";

export interface Cliente {
  id: string;
  nombre: string;
  sector: string;
  color: string;
  iniciales: string;
}

export interface Red {
  id: RedId;
  nombre: string;
  icon: LucideIcon;
  color: string;
}

export interface Contenido {
  id: string;
  clienteId: string;
  titulo: string;
  descripcion: string;
  estado: EstadoContenido;
  formato: FormatoContenido | null;
  tipoEditorial: TipoEditorial | null;
  redes: RedId[];
  peso: PesoContenido | null;
  enfoque: string | null;
  copyCompleto: string | null;
  hashtags: string[] | null;
  cta: string | null;
  actualizado: string;
  propietario: string;
  publicacion: string;
  etiquetas: string[];
  comentarioCliente?: string;
}

export type VistaBiblioteca = "table" | "grid" | "calendar";

export type NuevoContenido = Omit<Contenido, "id" | "actualizado">;

import type { LucideIcon } from "lucide-react";

export type EstadoContenido = "Borrador" | "En revisión" | "Programado" | "Publicado";

export type TipoContenido =
  | "Publicación"
  | "Historia"
  | "Reel"
  | "Carrusel"
  | "Video"
  | "Artículo"
  | "Newsletter"
  | "Infografía";

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
  id: number;
  clienteId: string;
  titulo: string;
  descripcion: string;
  estado: EstadoContenido;
  tipo: TipoContenido;
  red: RedId;
  actualizado: string;
  propietario: string;
  publicacion: string;
  etiquetas: string[];
}

export type VistaBiblioteca = "table" | "grid" | "calendar";

export type NuevoContenido = Omit<Contenido, "id" | "actualizado">;

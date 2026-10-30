import { Building2, CalendarDays, Files, GitBranch, Image, LayoutDashboard, LayoutTemplate, Settings2, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ModuloId } from "@/store/ui-store";

export interface NavItemConfig {
  id: ModuloId;
  label: string;
  icon: LucideIcon;
}

export const NAV_WORKSPACE: NavItemConfig[] = [
  { id: "Resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "Biblioteca de contenido", label: "Biblioteca de contenido", icon: Files },
  { id: "Calendario editorial", label: "Calendario editorial", icon: CalendarDays },
  { id: "Biblioteca multimedia", label: "Biblioteca multimedia", icon: Image },
  { id: "Plantillas", label: "Plantillas", icon: LayoutTemplate },
];

export const NAV_MANAGE: NavItemConfig[] = [
  { id: "Flujo de trabajo", label: "Flujo de trabajo", icon: GitBranch },
  { id: "Clientes", label: "Clientes", icon: Building2 },
  { id: "Miembros del equipo", label: "Miembros del equipo", icon: UsersRound },
  { id: "Configuración", label: "Configuración", icon: Settings2 },
];

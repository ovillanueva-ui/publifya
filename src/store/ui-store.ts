import { create } from "zustand";

export type ModuloId =
  | "Resumen"
  | "Biblioteca de contenido"
  | "Calendario editorial"
  | "Biblioteca multimedia"
  | "Plantillas"
  | "Flujo de trabajo"
  | "Clientes"
  | "Miembros del equipo"
  | "Configuración";

interface UiState {
  activeModule: ModuloId;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  detailsPanelHidden: boolean;
  setActiveModule: (module: ModuloId) => void;
  toggleSidebarCollapsed: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleDetailsPanel: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeModule: "Biblioteca de contenido",
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  detailsPanelHidden: false,

  setActiveModule: (activeModule) => set({ activeModule, mobileSidebarOpen: false }),
  toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),
  toggleDetailsPanel: () => set((state) => ({ detailsPanelHidden: !state.detailsPanelHidden })),
}));

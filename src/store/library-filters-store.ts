import { create } from "zustand";
import type { EstadoContenido, VistaBiblioteca } from "@/types/content";

export type SortOption = "reciente" | "titulo" | "antiguo";
export type FiltroEstado = EstadoContenido | "Todos";

interface LibraryFiltersState {
  query: string;
  estado: FiltroEstado;
  red: string | "all";
  tipo: string | "all";
  sort: SortOption;
  vista: VistaBiblioteca;
  calendarDate: Date;
  setQuery: (query: string) => void;
  setEstado: (estado: FiltroEstado) => void;
  setRed: (red: string | "all") => void;
  setTipo: (tipo: string | "all") => void;
  setSort: (sort: SortOption) => void;
  setVista: (vista: VistaBiblioteca) => void;
  shiftCalendarMonth: (delta: number) => void;
}

export const useLibraryFiltersStore = create<LibraryFiltersState>((set) => ({
  query: "",
  estado: "Todos",
  red: "all",
  tipo: "all",
  sort: "reciente",
  vista: "table",
  calendarDate: new Date(2026, 9, 1),

  setQuery: (query) => set({ query }),
  setEstado: (estado) => set({ estado }),
  setRed: (red) => set({ red }),
  setTipo: (tipo) => set({ tipo }),
  setSort: (sort) => set({ sort }),
  setVista: (vista) => set({ vista }),
  shiftCalendarMonth: (delta) =>
    set((state) => {
      const next = new Date(state.calendarDate);
      next.setMonth(next.getMonth() + delta);
      return { calendarDate: next };
    }),
}));

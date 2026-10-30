import { create } from "zustand";
import { CONTENIDOS_INICIALES } from "@/data/mock-content";
import type { Contenido, NuevoContenido } from "@/types/content";

interface ContentStoreState {
  contenidos: Contenido[];
  selectedId: number | null;
  checkedIds: Set<number>;
  setSelectedId: (id: number | null) => void;
  toggleChecked: (id: number, checked: boolean) => void;
  setCheckedMany: (ids: number[], checked: boolean) => void;
  clearChecked: () => void;
  createContenido: (values: NuevoContenido) => Contenido;
  updateContenido: (id: number, values: NuevoContenido) => void;
  deleteContenido: (id: number) => void;
  approveContenido: (id: number) => void;
  requestChanges: (id: number, comentario: string) => void;
}

export const useContentStore = create<ContentStoreState>((set, get) => ({
  contenidos: CONTENIDOS_INICIALES,
  selectedId: CONTENIDOS_INICIALES[0]?.id ?? null,
  checkedIds: new Set<number>(),

  setSelectedId: (id) => set({ selectedId: id }),

  toggleChecked: (id, checked) =>
    set((state) => {
      const next = new Set(state.checkedIds);
      if (checked) next.add(id);
      else next.delete(id);
      return { checkedIds: next };
    }),

  setCheckedMany: (ids, checked) =>
    set((state) => {
      const next = new Set(state.checkedIds);
      ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
      return { checkedIds: next };
    }),

  clearChecked: () => set({ checkedIds: new Set() }),

  createContenido: (values) => {
    const nextId = Math.max(0, ...get().contenidos.map((c) => c.id)) + 1;
    const item: Contenido = { id: nextId, actualizado: new Date().toISOString().slice(0, 10), ...values };
    set((state) => ({ contenidos: [item, ...state.contenidos], selectedId: item.id }));
    return item;
  },

  updateContenido: (id, values) =>
    set((state) => ({
      contenidos: state.contenidos.map((c) => (c.id === id ? { ...c, ...values, actualizado: new Date().toISOString().slice(0, 10) } : c)),
    })),

  deleteContenido: (id) =>
    set((state) => {
      const contenidos = state.contenidos.filter((c) => c.id !== id);
      const checkedIds = new Set(state.checkedIds);
      checkedIds.delete(id);
      const selectedId = state.selectedId === id ? contenidos[0]?.id ?? null : state.selectedId;
      return { contenidos, checkedIds, selectedId };
    }),

  approveContenido: (id) =>
    set((state) => ({
      contenidos: state.contenidos.map((c) =>
        c.id === id ? { ...c, estado: "Programado", comentarioCliente: undefined, actualizado: new Date().toISOString().slice(0, 10) } : c
      ),
    })),

  requestChanges: (id, comentario) =>
    set((state) => ({
      contenidos: state.contenidos.map((c) =>
        c.id === id ? { ...c, estado: "Borrador", comentarioCliente: comentario, actualizado: new Date().toISOString().slice(0, 10) } : c
      ),
    })),
}));

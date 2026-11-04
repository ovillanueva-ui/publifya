import { create } from "zustand";
import { baseRowToContenido, contenidoToRow, rowToContenido } from "@/lib/mappers/contenido";
import { supabase } from "@/lib/supabase/client";
import type { ContenidoRow, VContenidoRow } from "@/types/database";
import type { Contenido, NuevoContenido } from "@/types/content";

interface ContentStoreState {
  contenidos: Contenido[];
  status: "idle" | "loading" | "loaded" | "error";
  selectedId: string | null;
  checkedIds: Set<string>;
  setSelectedId: (id: string | null) => void;
  toggleChecked: (id: string, checked: boolean) => void;
  setCheckedMany: (ids: string[], checked: boolean) => void;
  clearChecked: () => void;
  fetchContenidos: () => Promise<void>;
  createContenido: (values: NuevoContenido) => Promise<Contenido | null>;
  updateContenido: (id: string, values: NuevoContenido) => Promise<void>;
  deleteContenido: (id: string) => Promise<void>;
  approveContenido: (id: string) => Promise<void>;
  requestChanges: (id: string, comentario: string) => Promise<void>;
}

export const useContentStore = create<ContentStoreState>((set, get) => ({
  contenidos: [],
  status: "idle",
  selectedId: null,
  checkedIds: new Set<string>(),

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

  fetchContenidos: async () => {
    if (get().status === "loading") return;
    set({ status: "loading" });
    const { data, error } = await supabase.from("v_contenidos").select("*").order("updated_at", { ascending: false });
    if (error) {
      set({ status: "error" });
      return;
    }
    const contenidos = (data as VContenidoRow[] | null ?? []).map(rowToContenido);
    set((state) => ({
      contenidos,
      status: "loaded",
      selectedId: state.selectedId ?? contenidos[0]?.id ?? null,
    }));
  },

  createContenido: async (values) => {
    const { data, error } = await supabase.from("contenidos").insert(contenidoToRow(values)).select().single();
    if (error || !data) return null;
    await supabase.rpc("set_contenido_tags", { p_contenido_id: data.id, p_nombres: values.etiquetas });
    const item = baseRowToContenido(data, values.etiquetas);
    set((state) => ({ contenidos: [item, ...state.contenidos], selectedId: item.id }));
    return item;
  },

  updateContenido: async (id, values) => {
    const { data, error } = await supabase.from("contenidos").update(contenidoToRow(values)).eq("id", id).select().single();
    if (error || !data) return;
    await supabase.rpc("set_contenido_tags", { p_contenido_id: id, p_nombres: values.etiquetas });
    const item = baseRowToContenido(data, values.etiquetas);
    set((state) => ({ contenidos: state.contenidos.map((c) => (c.id === id ? item : c)) }));
  },

  deleteContenido: async (id) => {
    const { error } = await supabase.from("contenidos").delete().eq("id", id);
    if (error) return;
    set((state) => {
      const contenidos = state.contenidos.filter((c) => c.id !== id);
      const checkedIds = new Set(state.checkedIds);
      checkedIds.delete(id);
      const selectedId = state.selectedId === id ? contenidos[0]?.id ?? null : state.selectedId;
      return { contenidos, checkedIds, selectedId };
    });
  },

  approveContenido: async (id) => {
    const { data, error } = await supabase.rpc("approve_content", { p_contenido_id: id }).select().single();
    if (error || !data) return;
    const row = data as ContenidoRow;
    set((state) => ({
      contenidos: state.contenidos.map((c) => (c.id === id ? { ...baseRowToContenido(row, c.etiquetas), comentarioCliente: undefined } : c)),
    }));
  },

  requestChanges: async (id, comentario) => {
    const { data, error } = await supabase.rpc("request_content_changes", { p_contenido_id: id, p_comentario: comentario }).select().single();
    if (error || !data) return;
    const row = data as ContenidoRow;
    set((state) => ({
      contenidos: state.contenidos.map((c) => (c.id === id ? baseRowToContenido(row, c.etiquetas) : c)),
    }));
  },
}));

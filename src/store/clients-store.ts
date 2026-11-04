import { create } from "zustand";
import { rowToCliente } from "@/lib/mappers/cliente";
import { supabase } from "@/lib/supabase/client";
import type { Cliente } from "@/types/content";

interface ClientsStoreState {
  clientes: Cliente[];
  status: "idle" | "loading" | "loaded" | "error";
  fetchClientes: () => Promise<void>;
}

export const useClientsStore = create<ClientsStoreState>((set, get) => ({
  clientes: [],
  status: "idle",

  fetchClientes: async () => {
    if (get().status === "loading") return;
    set({ status: "loading" });
    const { data, error } = await supabase.from("clientes").select("*").order("nombre");
    if (error) {
      set({ status: "error" });
      return;
    }
    set({ clientes: (data ?? []).map(rowToCliente), status: "loaded" });
  },
}));

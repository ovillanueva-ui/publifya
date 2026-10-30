import { create } from "zustand";

interface ClientStoreState {
  activeClientId: string | "all";
  setActiveClient: (id: string | "all") => void;
}

export const useClientStore = create<ClientStoreState>((set) => ({
  activeClientId: "all",
  setActiveClient: (id) => set({ activeClientId: id }),
}));

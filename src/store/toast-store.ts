import { create } from "zustand";

interface ToastState {
  message: string | null;
  show: (message: string) => void;
}

let hideTimer: ReturnType<typeof setTimeout> | undefined;

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message) => {
    set({ message });
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => set({ message: null }), 2800);
  },
}));

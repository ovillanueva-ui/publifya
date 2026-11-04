import { create } from "zustand";

interface ModalState {
  editorOpen: boolean;
  editorId: string | null;
  previewOpen: boolean;
  previewId: string | null;
  openEditor: (id?: string | null) => void;
  closeEditor: () => void;
  openPreview: (id: string) => void;
  closePreview: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  editorOpen: false,
  editorId: null,
  previewOpen: false,
  previewId: null,

  openEditor: (id = null) => set({ editorOpen: true, editorId: id }),
  closeEditor: () => set({ editorOpen: false, editorId: null }),
  openPreview: (id) => set({ previewOpen: true, previewId: id }),
  closePreview: () => set({ previewOpen: false, previewId: null }),
}));

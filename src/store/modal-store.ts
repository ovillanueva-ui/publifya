import { create } from "zustand";

interface ModalState {
  editorOpen: boolean;
  editorId: number | null;
  previewOpen: boolean;
  previewId: number | null;
  openEditor: (id?: number | null) => void;
  closeEditor: () => void;
  openPreview: (id: number) => void;
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

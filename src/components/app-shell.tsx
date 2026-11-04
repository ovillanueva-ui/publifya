"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { Topbar } from "@/components/layout/topbar/topbar";
import { DetailsPanel } from "@/components/layout/details-panel/details-panel";
import { ContentLibraryModule } from "@/components/modules/content-library/content-library-module";
import { OverviewModule } from "@/components/modules/overview/overview-module";
import { ClientsModule } from "@/components/modules/clients/clients-module";
import { PlaceholderModule } from "@/components/modules/placeholder/placeholder-module";
import { ContentEditorModal } from "@/components/modals/content-editor-modal";
import { ContentPreviewModal } from "@/components/modals/content-preview-modal";
import { Toast } from "@/components/ui/toast";
import { useSyncSelectionWithClient } from "@/hooks/use-sync-selection-with-client";
import { useClientsStore } from "@/store/clients-store";
import { useContentStore } from "@/store/content-store";
import { useUiStore } from "@/store/ui-store";

function ActiveModule() {
  const activeModule = useUiStore((s) => s.activeModule);

  switch (activeModule) {
    case "Biblioteca de contenido":
    case "Calendario editorial":
      return <ContentLibraryModule />;
    case "Resumen":
      return <OverviewModule />;
    case "Clientes":
      return <ClientsModule />;
    default:
      return <PlaceholderModule moduleId={activeModule} />;
  }
}

export function AppShell() {
  useSyncSelectionWithClient();
  useEffect(() => {
    useClientsStore.getState().fetchClientes();
    useContentStore.getState().fetchContenidos();
  }, []);
  const mobileSidebarOpen = useUiStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore((s) => s.setMobileSidebarOpen);
  const activeModule = useUiStore((s) => s.activeModule);
  const isLibrary = activeModule === "Biblioteca de contenido" || activeModule === "Calendario editorial";

  return (
    <div className="flex min-h-screen w-full">
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="flex min-w-0 flex-1 flex-col md:flex-row">
          <main className="min-w-0 flex-1 px-5 py-8 md:px-8">
            <ActiveModule />
          </main>
          {isLibrary && <DetailsPanel />}
        </div>
      </div>
      <ContentEditorModal />
      <ContentPreviewModal />
      <Toast />
    </div>
  );
}

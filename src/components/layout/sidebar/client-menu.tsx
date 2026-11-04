import { PopupMenuItem } from "@/components/ui/popup-menu-item";
import { PopupPanel } from "@/components/ui/popup-panel";
import { useClientStore } from "@/store/client-store";
import { useClientsStore } from "@/store/clients-store";

export function ClientMenu({ onPick }: { onPick: () => void }) {
  const activeClientId = useClientStore((s) => s.activeClientId);
  const setActiveClient = useClientStore((s) => s.setActiveClient);
  const clientes = useClientsStore((s) => s.clientes);

  return (
    <PopupPanel className="left-0 top-[calc(100%+6px)]">
      <PopupMenuItem
        onClick={() => {
          setActiveClient("all");
          onPick();
        }}
      >
        {activeClientId === "all" ? "✓ " : ""}Todos los clientes
      </PopupMenuItem>
      {clientes.map((cliente) => (
        <PopupMenuItem
          key={cliente.id}
          onClick={() => {
            setActiveClient(cliente.id);
            onPick();
          }}
        >
          {activeClientId === cliente.id ? "✓ " : ""}
          {cliente.nombre}
        </PopupMenuItem>
      ))}
    </PopupPanel>
  );
}

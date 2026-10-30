import { ClientPickerGrid } from "@/components/portal/client-picker-grid";

export default function PortalPickerPage() {
  return (
    <div>
      <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.11em] text-faint">PUBLIFYA</p>
      <h1 className="font-display text-[27px] font-semibold tracking-tight text-ink">Portal de clientes</h1>
      <p className="mt-1.5 text-[13.5px] text-muted">Selecciona tu cuenta para revisar el contenido preparado para ti.</p>
      <ClientPickerGrid />
    </div>
  );
}

export function KpiCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-4">
      <span className="font-mono text-2xl font-semibold tabular-nums text-ink">{value}</span>
      <span className="text-[10.5px] font-bold uppercase tracking-wide text-faint">{label}</span>
    </div>
  );
}

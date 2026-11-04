export function PortalPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="mb-4 h-3 w-24 rounded bg-surface-2" />
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-none rounded-xl bg-surface-2" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-20 rounded bg-surface-2" />
            <div className="h-5 w-40 rounded bg-surface-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="h-16 rounded-lg bg-surface-2" />
        <div className="h-16 rounded-lg bg-surface-2" />
        <div className="h-16 rounded-lg bg-surface-2" />
      </div>
    </div>
  );
}

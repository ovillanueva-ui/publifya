import { FileText } from "lucide-react";

export function DetailThumb() {
  return (
    <div className="mb-[18px] flex h-[120px] w-full items-center justify-center rounded-[10px] bg-accent-soft text-accent">
      <FileText className="h-8 w-8" strokeWidth={1.3} />
    </div>
  );
}

import type { LiveStatus } from "@/lib/types";

const statusConfig: Record<
  LiveStatus,
  { label: string; className: string }
> = {
  open: { label: "Открыто", className: "bg-live/10 text-live" },
  busy: { label: "Много гостей", className: "bg-accent/10 text-accent" },
  closing: { label: "Скоро закроется", className: "bg-muted/10 text-muted" },
};

export function StatusBadge({ status }: { status: LiveStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

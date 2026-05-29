import type { LiveStatus } from "@/lib/types";

const statusConfig: Record<
  LiveStatus,
  { label: string; className: string }
> = {
  open: { label: "Открыто", className: "text-live" },
  busy: { label: "Много гостей", className: "text-accent" },
  closing: { label: "Скоро закроется", className: "text-muted" },
};

export function StatusBadge({ status }: { status: LiveStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm ${config.className}`}
    >
      {config.label}
    </span>
  );
}

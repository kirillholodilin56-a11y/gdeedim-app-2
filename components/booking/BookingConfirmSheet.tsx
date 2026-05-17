"use client";

import { motion } from "framer-motion";
import { BottomSheetShell, SheetHandle } from "@/components/ui/BottomSheetShell";
import type { PeopleCount, VisitTime } from "@/lib/preorder";
import { formatTableSummary, type SelectedTable } from "@/lib/table-plans";

interface BookingConfirmSheetProps {
  open: boolean;
  restaurantName: string;
  visitTime: VisitTime | null;
  peopleCount: PeopleCount | null;
  selectedTable: SelectedTable | null;
  onDone: () => void;
}

export function BookingConfirmSheet({
  open,
  restaurantName,
  visitTime,
  peopleCount,
  selectedTable,
  onDone,
}: BookingConfirmSheetProps) {
  return (
    <BottomSheetShell open={open} onClose={onDone} zIndex={70}>
      <div className="rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
        <SheetHandle />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/15">
          <CheckIcon />
        </div>
        <h2 className="mt-4 text-center text-xl font-semibold tracking-tight">
          Столик забронирован
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Ждём вас в заведении в выбранное время
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-white p-4 shadow-card">
          <Row label="Заведение" value={restaurantName} />
          <Row label="Время" value={visitTime ?? "—"} />
          <Row
            label="Гостей"
            value={peopleCount ? `${peopleCount} чел.` : "—"}
          />
          <Row label="Столик" value={formatTableSummary(selectedTable)} />
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onDone}
          className="mt-5 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white"
        >
          Готово
        </motion.button>
      </div>
    </BottomSheetShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12l5 5L19 7"
        stroke="#7A9E87"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

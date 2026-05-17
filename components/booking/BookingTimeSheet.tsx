"use client";

import { motion } from "framer-motion";
import { BottomSheetShell, SheetHandle } from "@/components/ui/BottomSheetShell";
import {
  PEOPLE_COUNT_OPTIONS,
  VISIT_TIME_OPTIONS,
  type PeopleCount,
  type VisitTime,
} from "@/lib/preorder";
import { hasTablePlan } from "@/lib/table-plans";

interface BookingTimeSheetProps {
  open: boolean;
  restaurantId: string;
  visitTime: VisitTime | null;
  peopleCount: PeopleCount | null;
  onVisitTimeChange: (time: VisitTime) => void;
  onPeopleCountChange: (count: PeopleCount) => void;
  onConfirm: () => void;
  onChooseTable: () => void;
  onClose: () => void;
}

export function BookingTimeSheet({
  open,
  restaurantId,
  visitTime,
  peopleCount,
  onVisitTimeChange,
  onPeopleCountChange,
  onConfirm,
  onChooseTable,
  onClose,
}: BookingTimeSheetProps) {
  const canProceed = visitTime !== null && peopleCount !== null;
  const showTableOption = hasTablePlan(restaurantId);

  return (
    <BottomSheetShell open={open} onClose={onClose}>
      <motion.div className="rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
        <SheetHandle />
        <h2 className="text-xl font-semibold tracking-tight">
          Бронь столика
        </h2>
        <p className="mt-1 text-sm text-muted">
          Выберите время и количество гостей
        </p>

        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-muted">
          Когда придёте
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {VISIT_TIME_OPTIONS.map((time) => (
            <ChipButton
              key={time}
              label={time}
              selected={visitTime === time}
              onSelect={() => onVisitTimeChange(time)}
              variant="dark"
            />
          ))}
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-muted">
          Гостей
        </p>
        <div className="mt-2 flex gap-2">
          {PEOPLE_COUNT_OPTIONS.map((count) => (
            <ChipButton
              key={count}
              label={count}
              selected={peopleCount === count}
              onSelect={() => onPeopleCountChange(count)}
              variant="sage"
              className="flex-1"
            />
          ))}
        </div>

        <motion.button
          type="button"
          whileTap={canProceed ? { scale: 0.98 } : undefined}
          disabled={!canProceed}
          onClick={onConfirm}
          className="mt-6 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white disabled:opacity-40"
        >
          Подтвердить бронь
        </motion.button>

        {showTableOption && (
          <motion.button
            type="button"
            whileTap={canProceed ? { scale: 0.98 } : undefined}
            disabled={!canProceed}
            onClick={onChooseTable}
            className="mt-2 w-full rounded-2xl border border-charcoal/10 bg-white py-3.5 text-sm font-semibold text-charcoal disabled:opacity-40"
          >
            Выбрать столик
          </motion.button>
        )}
      </motion.div>
    </BottomSheetShell>
  );
}

function ChipButton({
  label,
  selected,
  onSelect,
  variant,
  className = "",
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  variant: "dark" | "sage";
  className?: string;
}) {
  const selectedClass =
    variant === "sage"
      ? "bg-sage text-white"
      : "bg-charcoal text-white";
  const idleClass = "bg-white text-charcoal shadow-card";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`rounded-2xl py-3.5 text-sm font-semibold transition-colors ${className} ${
        selected ? selectedClass : idleClass
      }`}
    >
      {label}
    </motion.button>
  );
}

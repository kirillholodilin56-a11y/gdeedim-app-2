"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  PEOPLE_COUNT_OPTIONS,
  VISIT_TIME_OPTIONS,
  type PeopleCount,
  type VisitTime,
} from "@/lib/preorder";
import { usePreorder } from "@/context/PreorderContext";

interface TimeSelectionModalProps {
  open: boolean;
}

export function TimeSelectionModal({ open }: TimeSelectionModalProps) {
  const {
    visitTime,
    peopleCount,
    setVisitTime,
    setPeopleCount,
    confirmPreorder,
    closeFlow,
    total,
  } = usePreorder();

  const canConfirm = visitTime !== null && peopleCount !== null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
            onClick={closeFlow}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
            className="fixed bottom-0 left-1/2 z-[70] w-full max-w-[430px] -translate-x-1/2 safe-bottom"
          >
            <div className="rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted/25" />

              <h2 className="text-xl font-semibold tracking-tight">
                Время визита
              </h2>
              <p className="mt-1 text-sm text-muted">
                Блюда подготовят к вашему приходу
              </p>

              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-muted">
                Когда придёте
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {VISIT_TIME_OPTIONS.map((time) => (
                  <TimeChip
                    key={time}
                    label={time}
                    selected={visitTime === time}
                    onSelect={() => setVisitTime(time as VisitTime)}
                  />
                ))}
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-muted">
                Гостей
              </p>
              <motion.div className="mt-2 flex gap-2">
                {PEOPLE_COUNT_OPTIONS.map((count) => (
                  <PeopleChip
                    key={count}
                    label={count}
                    selected={peopleCount === count}
                    onSelect={() => setPeopleCount(count as PeopleCount)}
                  />
                ))}
              </motion.div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-card">
                <span className="text-sm text-muted">Итого</span>
                <span className="text-lg font-semibold">
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <motion.button
                type="button"
                whileTap={canConfirm ? { scale: 0.98 } : undefined}
                disabled={!canConfirm}
                onClick={confirmPreorder}
                className="mt-4 w-full rounded-2xl bg-accent py-4 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
              >
                Подтвердить время
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TimeChip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`rounded-2xl py-3.5 text-sm font-semibold transition-colors ${
        selected
          ? "bg-charcoal text-white"
          : "bg-white text-charcoal shadow-card"
      }`}
    >
      {label}
    </motion.button>
  );
}

function PeopleChip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition-colors ${
        selected
          ? "bg-sage text-white"
          : "bg-white text-charcoal shadow-card"
      }`}
    >
      {label}
    </motion.button>
  );
}

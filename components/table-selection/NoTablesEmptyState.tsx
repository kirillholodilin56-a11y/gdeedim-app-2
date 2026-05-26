"use client";

import { motion } from "framer-motion";

interface NoTablesEmptyStateProps {
  onChangeTime: () => void;
  onContinueWithoutTable: () => void;
  continueLabel?: string;
}

export function NoTablesEmptyState({
  onChangeTime,
  onContinueWithoutTable,
  continueLabel = "Продолжить без выбора столика",
}: NoTablesEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1 rounded-2xl bg-white p-5 text-center shadow-card"
    >
      <h2 className="text-lg font-semibold tracking-tight">
        Нет свободных столиков
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Попробуйте выбрать другое время или уменьшить количество гостей.
      </p>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onChangeTime}
        className="mt-5 w-full rounded-2xl bg-charcoal py-3.5 text-sm font-semibold text-white"
      >
        Изменить время
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onContinueWithoutTable}
        className="mt-2 w-full rounded-2xl border border-charcoal/10 bg-white py-3.5 text-sm font-semibold text-charcoal"
      >
        {continueLabel}
      </motion.button>
    </motion.div>
  );
}

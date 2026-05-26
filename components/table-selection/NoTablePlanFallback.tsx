"use client";

import { motion } from "framer-motion";
import type { SelectedTable } from "@/lib/table-plans";

interface NoTablePlanFallbackProps {
  selectedTable: SelectedTable | null;
  onSelectAutoAssign: () => void;
}

export function NoTablePlanFallback({
  selectedTable,
  onSelectAutoAssign,
}: NoTablePlanFallbackProps) {
  return (
    <div className="mt-5 rounded-2xl bg-white p-5 text-center shadow-card">
      <p className="text-sm font-medium text-charcoal">
        Столик подберёт администратор
      </p>
      <p className="mt-2 text-xs text-muted">
        В этом заведении выбор столика недоступен — мы закрепим место при вашем
        приходе.
      </p>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectAutoAssign()}
        className={`mt-4 w-full rounded-2xl py-3 text-sm font-semibold ${
          selectedTable?.autoAssigned
            ? "bg-charcoal text-white"
            : "bg-sand text-charcoal"
        }`}
      >
        Понятно
      </motion.button>
    </div>
  );
}

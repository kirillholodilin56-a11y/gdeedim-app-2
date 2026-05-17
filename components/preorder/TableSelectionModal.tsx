"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import type { PeopleCount } from "@/lib/preorder";
import {
  AUTO_ASSIGNED_TABLE,
  formatTableSummary,
  getTablePlan,
  hasTablePlan,
  isTableSelectable,
  tableToSelection,
  type RestaurantTable,
} from "@/lib/table-plans";
import { usePreorder } from "@/context/PreorderContext";

interface TableSelectionModalProps {
  open: boolean;
}

export function TableSelectionModal({ open }: TableSelectionModalProps) {
  const {
    restaurantId,
    peopleCount,
    selectedTable,
    setSelectedTable,
    proceedToConfirm,
    closeFlow,
    total,
  } = usePreorder();

  const plan = restaurantId ? getTablePlan(restaurantId) : null;
  const showFloorPlan = restaurantId ? hasTablePlan(restaurantId) : false;

  const canConfirm = showFloorPlan
    ? selectedTable !== null &&
      !selectedTable.autoAssigned &&
      Boolean(selectedTable.tableId)
    : selectedTable?.autoAssigned === true;

  const handleSelectTable = (table: RestaurantTable) => {
    if (!peopleCount || !isTableSelectable(table, peopleCount)) return;
    setSelectedTable(tableToSelection(table));
  };

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
          <div className="mobile-fixed-shell bottom-0 z-[70] safe-bottom">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            >
              <div className="max-h-[90vh] overflow-y-auto rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted/25" />

                <h2 className="text-xl font-semibold tracking-tight">
                  Выберите столик
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Покажем свободные места на выбранное время.
                </p>

                {showFloorPlan && plan && peopleCount ? (
                  <>
                    <FloorPlanLegend />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 }}
                      className="relative mt-4 aspect-[4/3] w-full rounded-2xl bg-white p-3 shadow-card"
                    >
                      <div className="absolute inset-3 rounded-xl border border-dashed border-sand/80" />
                      {plan.tables.map((table, i) => (
                        <TableNode
                          key={table.id}
                          table={table}
                          peopleCount={peopleCount}
                          selected={selectedTable?.tableId === table.id}
                          onSelect={() => handleSelectTable(table)}
                          index={i}
                        />
                      ))}
                    </motion.div>
                    {selectedTable && !selectedTable.autoAssigned && (
                      <p className="mt-3 text-center text-sm font-medium text-charcoal">
                        {formatTableSummary(selectedTable)}
                      </p>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-2xl bg-white p-5 text-center shadow-card"
                  >
                    <p className="text-sm font-medium text-charcoal">
                      Столик подберёт администратор
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      В этом заведении выбор столика недоступен — мы закрепим
                      место при вашем приходе.
                    </p>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTable(AUTO_ASSIGNED_TABLE)}
                      className={`mt-4 w-full rounded-2xl py-3 text-sm font-semibold ${
                        selectedTable?.autoAssigned
                          ? "bg-charcoal text-white"
                          : "bg-sand text-charcoal"
                      }`}
                    >
                      Понятно
                    </motion.button>
                  </motion.div>
                )}

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-card">
                  <span className="text-sm text-muted">Итого</span>
                  <PriceLabel amount={total} className="text-lg font-semibold" />
                </div>

                <motion.button
                  type="button"
                  whileTap={canConfirm ? { scale: 0.98 } : undefined}
                  disabled={!canConfirm}
                  onClick={proceedToConfirm}
                  className="mt-4 w-full rounded-2xl bg-accent py-4 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
                >
                  Подтвердить предзаказ
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function FloorPlanLegend() {
  const items = [
    { key: "free", label: "свободно", className: "bg-white ring-1 ring-charcoal/10" },
    { key: "busy", label: "занято", className: "bg-muted/25" },
    { key: "sel", label: "выбрано", className: "bg-charcoal" },
  ] as const;

  return (
    <div className="mt-4 flex justify-center gap-4">
      {items.map((item) => (
        <span key={item.key} className="flex items-center gap-1.5 text-[10px] text-muted">
          <span className={`h-3 w-3 rounded-full ${item.className}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function TableNode({
  table,
  peopleCount,
  selected,
  onSelect,
  index,
}: {
  table: RestaurantTable;
  peopleCount: PeopleCount;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const occupied = table.status === "occupied";
  const selectable = isTableSelectable(table, peopleCount);
  const tooSmall = !occupied && !selectable;

  const sizeClass =
    table.size === "lg"
      ? "h-14 w-14"
      : table.size === "md"
        ? "h-12 w-12"
        : "h-10 w-10";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      whileTap={selectable ? { scale: 0.92 } : undefined}
      disabled={!selectable}
      onClick={onSelect}
      style={{
        left: `${table.x}%`,
        top: `${table.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className={`absolute flex flex-col items-center justify-center rounded-full text-center transition-colors ${sizeClass} ${
        selected
          ? "bg-charcoal text-white shadow-glow ring-2 ring-accent/40"
          : occupied || tooSmall
            ? "cursor-not-allowed bg-muted/25 text-muted/60"
            : "bg-white text-charcoal shadow-card ring-1 ring-charcoal/10 hover:ring-accent/30"
      }`}
      aria-label={`Столик ${table.number}, ${table.seats} мест`}
    >
      <span className="text-[10px] font-bold leading-none">{table.number}</span>
      <span className="text-[8px] leading-tight opacity-80">{table.seats}</span>
    </motion.button>
  );
}

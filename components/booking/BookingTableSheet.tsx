"use client";

import { motion } from "framer-motion";
import { BottomSheetShell, SheetHandle } from "@/components/ui/BottomSheetShell";
import type { PeopleCount } from "@/lib/preorder";
import {
  AUTO_ASSIGNED_TABLE,
  formatTableSummary,
  getTablePlan,
  hasTablePlan,
  isTableSelectable,
  tableToSelection,
  type RestaurantTable,
  type SelectedTable,
} from "@/lib/table-plans";

interface BookingTableSheetProps {
  open: boolean;
  restaurantId: string;
  peopleCount: PeopleCount | null;
  selectedTable: SelectedTable | null;
  onSelectTable: (table: SelectedTable | null) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function BookingTableSheet({
  open,
  restaurantId,
  peopleCount,
  selectedTable,
  onSelectTable,
  onConfirm,
  onClose,
}: BookingTableSheetProps) {
  const plan = getTablePlan(restaurantId);
  const showFloorPlan = hasTablePlan(restaurantId);

  const canConfirm = showFloorPlan
    ? selectedTable !== null &&
      !selectedTable.autoAssigned &&
      Boolean(selectedTable.tableId)
    : selectedTable?.autoAssigned === true;

  const handleSelectTable = (table: RestaurantTable) => {
    if (!peopleCount || !isTableSelectable(table, peopleCount)) return;
    onSelectTable(tableToSelection(table));
  };

  return (
    <BottomSheetShell open={open} onClose={onClose}>
      <div className="max-h-[90vh] overflow-y-auto rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
        <SheetHandle />
        <h2 className="text-xl font-semibold tracking-tight">Выберите столик</h2>
        <p className="mt-1 text-sm text-muted">
          Покажем свободные места на выбранное время
        </p>

        {showFloorPlan && plan && peopleCount ? (
          <>
            <FloorPlanLegend />
            <div className="relative mt-4 aspect-[4/3] w-full rounded-2xl bg-white p-3 shadow-card">
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
            </div>
            {selectedTable && !selectedTable.autoAssigned && (
              <p className="mt-3 text-center text-sm font-medium text-charcoal">
                {formatTableSummary(selectedTable)}
              </p>
            )}
          </>
        ) : (
          <div className="mt-5 rounded-2xl bg-white p-5 text-center shadow-card">
            <p className="text-sm font-medium text-charcoal">
              Столик подберёт администратор
            </p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTable(AUTO_ASSIGNED_TABLE)}
              className={`mt-4 w-full rounded-2xl py-3 text-sm font-semibold ${
                selectedTable?.autoAssigned
                  ? "bg-charcoal text-white"
                  : "bg-sand text-charcoal"
              }`}
            >
              Понятно
            </motion.button>
          </div>
        )}

        <motion.button
          type="button"
          whileTap={canConfirm ? { scale: 0.98 } : undefined}
          disabled={!canConfirm}
          onClick={onConfirm}
          className="mt-5 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white disabled:opacity-40"
        >
          Подтвердить бронь
        </motion.button>
      </div>
    </BottomSheetShell>
  );
}

function FloorPlanLegend() {
  const items = [
    { label: "свободно", className: "bg-white ring-1 ring-charcoal/10" },
    { label: "занято", className: "bg-muted/25" },
    { label: "выбрано", className: "bg-charcoal" },
  ];

  return (
    <div className="mt-4 flex justify-center gap-4">
      {items.map((item) => (
        <span
          key={item.label}
          className="flex items-center gap-1.5 text-[10px] text-muted"
        >
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
            : "bg-white text-charcoal shadow-card ring-1 ring-charcoal/10"
      }`}
    >
      <span className="text-[10px] font-bold leading-none">{table.number}</span>
      <span className="text-[8px] leading-tight opacity-80">{table.seats}</span>
    </motion.button>
  );
}

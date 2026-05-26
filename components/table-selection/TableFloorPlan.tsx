"use client";

import { motion } from "framer-motion";
import {
  formatTableSummary,
  tableToSelection,
  type RestaurantTable,
  type SelectedTable,
} from "@/lib/table-plans";

interface TableFloorPlanProps {
  tables: RestaurantTable[];
  selectedTable: SelectedTable | null;
  onSelectTable: (table: SelectedTable) => void;
}

export function TableFloorPlan({
  tables,
  selectedTable,
  onSelectTable,
}: TableFloorPlanProps) {
  return (
    <>
      <div className="mt-4 flex justify-center gap-4">
        <LegendDot label="свободно" className="bg-white ring-1 ring-charcoal/10" />
        <LegendDot label="выбрано" className="bg-charcoal" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="relative mt-4 aspect-[4/3] w-full rounded-2xl bg-white p-3 shadow-card"
      >
        <div className="absolute inset-3 rounded-xl border border-dashed border-sand/80" />
        {tables.map((table, i) => (
          <TableNode
            key={table.id}
            table={table}
            selected={selectedTable?.tableId === table.id}
            onSelect={() => onSelectTable(tableToSelection(table))}
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
  );
}

function LegendDot({ label, className }: { label: string; className: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-muted">
      <span className={`h-3 w-3 rounded-full ${className}`} />
      {label}
    </span>
  );
}

function TableNode({
  table,
  selected,
  onSelect,
  index,
}: {
  table: RestaurantTable;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
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
      whileTap={{ scale: 0.92 }}
      onClick={onSelect}
      style={{
        left: `${table.x}%`,
        top: `${table.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className={`absolute flex flex-col items-center justify-center rounded-full bg-white text-charcoal shadow-card ring-1 ring-charcoal/10 transition-colors hover:ring-accent/30 ${sizeClass} ${
        selected ? "bg-charcoal text-white shadow-glow ring-2 ring-accent/40" : ""
      }`}
      aria-label={`Столик ${table.number}, ${table.seats} мест`}
      aria-pressed={selected}
    >
      <span className="text-[10px] font-bold leading-none">{table.number}</span>
      <span className="text-[8px] leading-tight opacity-80">{table.seats}</span>
    </motion.button>
  );
}

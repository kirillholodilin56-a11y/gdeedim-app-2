"use client";

import { motion } from "framer-motion";
import { BottomSheetShell, SheetHandle } from "@/components/ui/BottomSheetShell";
import {
  TableSelectionSheetContent,
  useTableSelectionState,
} from "@/components/table-selection/TableSelectionSheetContent";
import type { PeopleCount } from "@/lib/preorder";
import type { SelectedTable } from "@/lib/table-plans";

interface BookingTableSheetProps {
  open: boolean;
  restaurantId: string;
  peopleCount: PeopleCount | null;
  selectedTable: SelectedTable | null;
  onSelectTable: (table: SelectedTable | null) => void;
  onBack: () => void;
  onContinueWithoutTable: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function BookingTableSheet({
  open,
  restaurantId,
  peopleCount,
  selectedTable,
  onSelectTable,
  onBack,
  onContinueWithoutTable,
  onConfirm,
  onClose,
}: BookingTableSheetProps) {
  const { noSuitableTables, canConfirmWithTable } = useTableSelectionState(
    restaurantId,
    peopleCount,
    selectedTable
  );

  return (
    <BottomSheetShell open={open} onClose={onClose}>
      <div className="max-h-[90vh] overflow-y-auto rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
        <SheetHandle />

        <TableSelectionSheetContent
          restaurantId={restaurantId}
          peopleCount={peopleCount}
          selectedTable={selectedTable}
          onSelectTable={onSelectTable}
          onBack={onBack}
          onChangeTime={onBack}
          onContinueWithoutTable={onContinueWithoutTable}
          footer={
            !noSuitableTables ? (
              <motion.button
                type="button"
                whileTap={canConfirmWithTable ? { scale: 0.98 } : undefined}
                disabled={!canConfirmWithTable}
                onClick={onConfirm}
                className="mt-5 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white disabled:opacity-40"
              >
                Подтвердить бронь
              </motion.button>
            ) : null
          }
        />
      </div>
    </BottomSheetShell>
  );
}

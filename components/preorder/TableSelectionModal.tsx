"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import {
  TableSelectionSheetContent,
  useTableSelectionState,
} from "@/components/table-selection/TableSelectionSheetContent";
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
    backToTimeSelection,
    confirmWithoutTable,
    closeFlow,
    total,
  } = usePreorder();

  const rid = restaurantId ?? "";
  const { noSuitableTables, canConfirmWithTable } = useTableSelectionState(
    rid,
    peopleCount,
    selectedTable
  );

  return (
    <AnimatePresence>
      {open && restaurantId && (
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

                <TableSelectionSheetContent
                  restaurantId={rid}
                  peopleCount={peopleCount}
                  selectedTable={selectedTable}
                  onSelectTable={setSelectedTable}
                  onBack={backToTimeSelection}
                  onChangeTime={backToTimeSelection}
                  onContinueWithoutTable={confirmWithoutTable}
                  footer={
                    <>
                      <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-card">
                        <span className="text-sm text-muted">Итого</span>
                        <PriceLabel
                          amount={total}
                          className="text-lg font-semibold"
                        />
                      </div>
                      {!noSuitableTables && (
                        <motion.button
                          type="button"
                          whileTap={
                            canConfirmWithTable ? { scale: 0.98 } : undefined
                          }
                          disabled={!canConfirmWithTable}
                          onClick={proceedToConfirm}
                          className="mt-4 w-full rounded-2xl bg-accent py-4 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
                        >
                          Подтвердить предзаказ
                        </motion.button>
                      )}
                    </>
                  }
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

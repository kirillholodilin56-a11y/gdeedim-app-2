"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { getReservationLineTotal } from "@/lib/discount-reservation";
import { useDiscountReservation } from "@/context/DiscountReservationContext";

export function DiscountReservationBar() {
  const {
    lines,
    itemCount,
    total,
    isSheetExpanded,
    setSheetExpanded,
    startPickup,
    addOne,
    removeOne,
    canAddMore,
  } = useDiscountReservation();

  const visible = lines.length > 0;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {isSheetExpanded && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Закрыть бронь"
              className="fixed inset-0 z-40 bg-charcoal/25 backdrop-blur-[2px]"
              onClick={() => setSheetExpanded(false)}
            />
          )}

          <div className="mobile-fixed-shell bottom-[5.75rem] z-50">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-charcoal/5">
                <AnimatePresence initial={false}>
                  {isSheetExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-b border-sand/80"
                    >
                      <div className="max-h-48 overflow-y-auto px-4 pt-4">
                        <p className="text-xs font-medium text-muted">
                          Самовывоз из заведения
                        </p>
                        <ul className="mt-2 space-y-3 pb-3">
                          {lines.map((line) => (
                            <li
                              key={line.offerId}
                              className="flex items-center gap-3"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                  {line.offer.dishName}
                                </p>
                                <p className="truncate text-xs text-muted">
                                  {line.offer.restaurantName}
                                </p>
                                <p className="mt-0.5 text-xs text-muted">
                                  <span className="whitespace-nowrap tabular-nums">
                                    {line.quantity} ×{" "}
                                    <PriceLabel
                                      amount={line.offer.newPrice}
                                      className="inline text-xs font-normal text-muted"
                                    />
                                  </span>
                                </p>
                              </div>
                              <div className="flex shrink-0 items-center gap-2">
                                <QuantityStepper
                                  quantity={line.quantity}
                                  onDecrease={() => removeOne(line.offerId)}
                                  onIncrease={() => addOne(line.offerId)}
                                  increaseDisabled={!canAddMore(line.offerId)}
                                />
                                <PriceLabel
                                  amount={getReservationLineTotal(line)}
                                  className="text-sm font-semibold"
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => setSheetExpanded(!isSheetExpanded)}
                    className="flex min-w-0 flex-1 flex-col text-left"
                  >
                    <span className="text-xs text-muted">
                      {itemCount}{" "}
                      {itemCount === 1
                        ? "позиция"
                        : itemCount < 5
                          ? "позиции"
                          : "позиций"}
                    </span>
                    <PriceLabel
                      amount={total}
                      className="text-lg font-semibold tracking-tight"
                    />
                  </button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={startPickup}
                    className="shrink-0 rounded-2xl bg-sage px-4 py-3.5 text-sm font-semibold text-white"
                  >
                    Забрать сегодня
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

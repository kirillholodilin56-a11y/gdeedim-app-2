"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    removeOne,
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

          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-[5.75rem] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-4"
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
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">
                                {line.offer.dishName}
                              </p>
                              <p className="truncate text-xs text-muted">
                                {line.offer.restaurantName}
                              </p>
                              <p className="text-xs text-muted">
                                {line.quantity} × {line.offer.newPrice} ₽
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => removeOne(line.offerId)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-sm font-medium"
                                aria-label="Убрать одну порцию"
                              >
                                −
                              </button>
                              <span className="w-4 text-center text-sm font-medium">
                                {line.quantity}
                              </span>
                              <span className="w-10 text-right text-sm font-semibold">
                                {getReservationLineTotal(line)} ₽
                              </span>
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
                  <span className="text-lg font-semibold tracking-tight">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
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
        </>
      )}
    </AnimatePresence>
  );
}

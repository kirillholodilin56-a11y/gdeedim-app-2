"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  formatRemainingAvailability,
  getReservationLineOldTotal,
  getReservationLineTotal,
} from "@/lib/discount-reservation";
import { PriceLabel } from "@/components/ui/PriceLabel";
import { useDiscountReservation } from "@/context/DiscountReservationContext";

export function DiscountReservationConfirm() {
  const { flowStep, lines, total, completeReservation, closeFlow } =
    useDiscountReservation();

  const open = flowStep === "confirm" && lines.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/45 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0"
            onClick={closeFlow}
          />

          <div className="mobile-fixed-shell bottom-0 safe-bottom">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            >
              <div className="w-full rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted/25" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 400 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/15"
            >
              <CheckIcon />
            </motion.div>

            <h2 className="mt-4 text-center text-xl font-semibold tracking-tight">
              Позиция забронирована
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted">
              Заведение сохранит позицию до указанного времени. Заберите блюдо в
              зале без доставки.
            </p>

            <div className="mt-6 max-h-[50vh] space-y-4 overflow-y-auto">
              {lines.map((line, index) => (
                <motion.div
                  key={line.offerId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="rounded-2xl bg-white p-4 shadow-card"
                >
                  <p className="text-xs font-medium text-accent">
                    {line.offer.restaurantName}
                  </p>
                  <p className="mt-0.5 text-base font-semibold">
                    {line.offer.dishName}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    <span className="whitespace-nowrap tabular-nums">
                      {line.quantity} ×{" "}
                      <PriceLabel
                        amount={line.offer.newPrice}
                        className="inline text-xs font-normal text-muted"
                      />
                    </span>
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                      −{line.offer.discountPercent}%
                    </span>
                    <div className="flex items-baseline justify-end gap-2">
                      <PriceLabel
                        amount={getReservationLineOldTotal(line)}
                        className="text-xs text-muted line-through"
                      />
                      <PriceLabel
                        amount={getReservationLineTotal(line)}
                        className="text-lg font-bold text-charcoal"
                      />
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 border-t border-sand pt-3 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-muted">Самовывоз</span>
                      <span className="text-right font-medium">
                        {line.offer.pickupWindow}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted">Наличие</span>
                      <span className="text-right font-medium text-sage">
                        {formatRemainingAvailability(
                          line.offer.availability,
                          line.quantity
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-card">
              <span className="text-sm text-muted">Итого к оплате в зале</span>
              <PriceLabel
                amount={total}
                className="text-lg font-semibold text-accent"
              />
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={completeReservation}
              className="mt-5 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white"
            >
              Готово
            </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12l5 5L19 7"
        stroke="#7A9E87"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

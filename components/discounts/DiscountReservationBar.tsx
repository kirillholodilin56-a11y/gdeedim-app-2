"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuItemImage } from "@/components/ui/MenuItemImage";
import { PriceLabel } from "@/components/ui/PriceLabel";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import {
  formatRemainingAvailability,
  getReservationLineOldTotal,
  getReservationLineTotal,
} from "@/lib/discount-reservation";
import { useDiscountReservation } from "@/context/DiscountReservationContext";

function formatItemCount(count: number): string {
  if (count === 1) return "1 позиция";
  if (count < 5) return `${count} позиции`;
  return `${count} позиций`;
}

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

  const openCart = () => setSheetExpanded(true);
  const closeCart = () => setSheetExpanded(false);
  const toggleCart = () => setSheetExpanded(!isSheetExpanded);

  const handlePickup = () => {
    startPickup();
  };

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
              aria-label="Закрыть корзину"
              className="fixed inset-0 z-40 bg-charcoal/25 backdrop-blur-[2px]"
              onClick={closeCart}
            />
          )}

          <div className="mobile-fixed-shell bottom-[5.75rem] z-50">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-sage/20">
                <AnimatePresence initial={false}>
                  {isSheetExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-b border-sand/80"
                    >
                      <div className="max-h-56 overflow-y-auto px-4 pt-4">
                        <h3 className="text-sm font-semibold tracking-tight text-charcoal">
                          Корзина
                        </h3>
                        <p className="mt-0.5 text-[11px] text-muted">
                          Самовывоз из заведения
                        </p>
                        <ul className="mt-3 space-y-3">
                          {lines.map((line) => (
                            <li
                              key={line.offerId}
                              className="rounded-2xl bg-cream/60 p-3"
                            >
                              <div className="flex gap-3">
                                <MenuItemImage
                                  name={line.offer.dishName}
                                  alt={line.offer.dishName}
                                  className="h-12 w-12 shrink-0"
                                  sizes="48px"
                                />
                                <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium">
                                    {line.offer.dishName}
                                  </p>
                                  <p className="truncate text-xs text-muted">
                                    {line.offer.restaurantName}
                                  </p>
                                </div>
                                <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                                  −{line.offer.discountPercent}%
                                </span>
                              </div>
                              <p className="mt-1.5 text-[11px] text-muted">
                                Забрать · {line.offer.pickupWindow}
                              </p>
                              <p className="mt-0.5 text-[11px] font-medium text-sage">
                                {formatRemainingAvailability(
                                  line.offer.availability,
                                  line.quantity
                                )}
                              </p>
                              <div className="mt-2.5 flex items-center gap-3">
                                <QuantityStepper
                                  quantity={line.quantity}
                                  onDecrease={() => removeOne(line.offerId)}
                                  onIncrease={() => addOne(line.offerId)}
                                  increaseDisabled={!canAddMore(line.offerId)}
                                />
                                <div className="ml-auto text-right">
                                  <p className="text-xs text-muted line-through">
                                    <PriceLabel
                                      amount={getReservationLineOldTotal(line)}
                                      className="inline text-xs"
                                    />
                                  </p>
                                  <PriceLabel
                                    amount={getReservationLineTotal(line)}
                                    className="text-sm font-semibold text-charcoal"
                                  />
                                </div>
                              </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex items-center justify-between border-t border-sand pt-3 pb-1">
                          <span className="text-sm font-medium text-muted">
                            Итого
                          </span>
                          <PriceLabel
                            amount={total}
                            className="text-lg font-semibold text-sage"
                          />
                        </div>

                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePickup}
                          className="mb-3 mt-3 w-full rounded-2xl bg-sage py-3.5 text-sm font-semibold text-white shadow-soft"
                        >
                          Забрать сегодня
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 p-3.5">
                  <button
                    type="button"
                    onClick={toggleCart}
                    className="flex min-w-0 flex-1 flex-col text-left"
                    aria-expanded={isSheetExpanded}
                    aria-label={
                      isSheetExpanded
                        ? "Свернуть корзину"
                        : "Открыть корзину"
                    }
                  >
                    <span className="text-sm font-semibold text-charcoal">
                      {formatItemCount(itemCount)}
                    </span>
                    <PriceLabel
                      amount={total}
                      className="text-base font-semibold tracking-tight text-sage"
                    />
                    {!isSheetExpanded && (
                      <span className="mt-0.5 text-[10px] text-muted">
                        нажмите, чтобы посмотреть
                      </span>
                    )}
                  </button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={isSheetExpanded ? closeCart : openCart}
                    className="shrink-0 rounded-2xl bg-sage px-4 py-3 text-sm font-semibold text-white"
                  >
                    {isSheetExpanded ? "Свернуть" : "Корзина"}
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

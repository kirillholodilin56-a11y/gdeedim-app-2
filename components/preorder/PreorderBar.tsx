"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { getLineTotal } from "@/lib/preorder";
import { usePreorder } from "@/context/PreorderContext";

interface PreorderBarProps {
  restaurantId: string;
}

export function PreorderBar({ restaurantId }: PreorderBarProps) {
  const {
    hasCartForRestaurant,
    lines,
    itemCount,
    total,
    isSheetExpanded,
    setSheetExpanded,
    startCheckout,
    addOne,
    removeOne,
  } = usePreorder();

  const visible = hasCartForRestaurant(restaurantId);

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
              onClick={() => setSheetExpanded(false)}
            />
          )}

          <div className="mobile-fixed-shell bottom-0 z-50 safe-bottom pb-4">
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
                      <div className="max-h-52 overflow-y-auto px-4 pt-4">
                        <p className="text-xs font-medium text-muted">
                          Ваш предзаказ
                        </p>
                        <ul className="mt-2 space-y-3 pb-3">
                          {lines.map((line) => (
                            <li
                              key={line.menuItemId}
                              className="flex items-center gap-3"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                  {line.name}
                                </p>
                                <p className="mt-0.5 text-xs text-muted">
                                  <span className="whitespace-nowrap tabular-nums">
                                    {line.quantity} ×{" "}
                                    <PriceLabel
                                      amount={line.unitPrice}
                                      className="inline text-xs font-normal text-muted"
                                    />
                                  </span>
                                  {line.discountPercent ? (
                                    <span className="ml-1 text-accent">
                                      −{line.discountPercent}%
                                    </span>
                                  ) : null}
                                </p>
                              </div>
                              <div className="flex shrink-0 items-center gap-2">
                                <QuantityStepper
                                  quantity={line.quantity}
                                  onDecrease={() => removeOne(line.menuItemId)}
                                  onIncrease={() => addOne(line.menuItemId)}
                                />
                                <PriceLabel
                                  amount={getLineTotal(line)}
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
                        ? "блюдо"
                        : itemCount < 5
                          ? "блюда"
                          : "блюд"}
                    </span>
                    <PriceLabel
                      amount={total}
                      className="text-lg font-semibold tracking-tight"
                    />
                  </button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={startCheckout}
                    className="shrink-0 rounded-2xl bg-charcoal px-5 py-3.5 text-sm font-semibold text-white"
                  >
                    Оформить предзаказ
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

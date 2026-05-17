"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { getLineTotal } from "@/lib/preorder";
import { usePreorder } from "@/context/PreorderContext";

interface PreorderBarProps {
  restaurantId: string;
}

function formatDishCount(count: number): string {
  if (count === 1) return "1 блюдо";
  if (count < 5) return `${count} блюда`;
  return `${count} блюд`;
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

  const openCart = () => setSheetExpanded(true);
  const closeCart = () => setSheetExpanded(false);
  const toggleCart = () => setSheetExpanded(!isSheetExpanded);

  const handleCheckout = () => {
    startCheckout();
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
                      <div className="max-h-56 overflow-y-auto px-4 pt-4">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Корзина
                        </h3>
                        <ul className="mt-3 space-y-3">
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
                                  onDecrease={() =>
                                    removeOne(line.menuItemId)
                                  }
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

                        <div className="mt-4 flex items-center justify-between border-t border-sand pt-3 pb-1">
                          <span className="text-sm font-medium text-muted">
                            Итого
                          </span>
                          <PriceLabel
                            amount={total}
                            className="text-lg font-semibold"
                          />
                        </div>

                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCheckout}
                          className="mb-3 mt-3 w-full rounded-2xl bg-accent py-3.5 text-sm font-semibold text-white shadow-glow"
                        >
                          Оформить предзаказ
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
                      {formatDishCount(itemCount)}
                    </span>
                    <PriceLabel
                      amount={total}
                      className="text-base font-semibold tracking-tight"
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
                    className="shrink-0 rounded-2xl bg-charcoal px-4 py-3 text-sm font-semibold text-white"
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

"use client";

import { AnimatePresence, motion } from "framer-motion";
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

          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 safe-bottom px-4 pb-4"
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
                    <motion.div className="max-h-52 overflow-y-auto px-4 pt-4">
                      <p className="text-xs font-medium text-muted">
                        Ваш предзаказ
                      </p>
                      <ul className="mt-2 space-y-3 pb-3">
                        {lines.map((line) => (
                          <li
                            key={line.menuItemId}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">
                                {line.name}
                              </p>
                              <p className="text-xs text-muted">
                                {line.quantity} × {line.unitPrice} ₽
                                {line.discountPercent ? (
                                  <span className="ml-1 text-accent">
                                    −{line.discountPercent}%
                                  </span>
                                ) : null}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => removeOne(line.menuItemId)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-sm font-medium text-charcoal"
                                aria-label="Убрать одну порцию"
                              >
                                −
                              </button>
                              <span className="w-4 text-center text-sm font-medium">
                                {line.quantity}
                              </span>
                              <span className="w-7 text-right text-sm font-semibold">
                                {getLineTotal(line)} ₽
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
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
                  <span className="text-lg font-semibold tracking-tight">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
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
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getLineTotal } from "@/lib/preorder";
import { usePreorder } from "@/context/PreorderContext";

interface ConfirmationModalProps {
  open: boolean;
}

export function ConfirmationModal({ open }: ConfirmationModalProps) {
  const {
    restaurantName,
    lines,
    total,
    visitTime,
    peopleCount,
    completePreorder,
  } = usePreorder();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/45 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="mx-4 mb-8 w-full max-w-[390px] rounded-4xl bg-cream p-6 shadow-soft safe-bottom sm:mb-0"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/15"
            >
              <CheckIcon />
            </motion.div>

            <h2 className="mt-4 text-center text-xl font-semibold tracking-tight">
              Предзаказ оформлен
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted">
              Заведение получит заказ заранее, а блюда подготовят к вашему
              визиту.
            </p>

            <div className="mt-6 space-y-3 rounded-2xl bg-white p-4 shadow-card">
              <Row label="Заведение" value={restaurantName ?? "—"} />
              <Row label="Время" value={visitTime ?? "—"} />
              <Row
                label="Гостей"
                value={peopleCount ? `${peopleCount} чел.` : "—"}
              />
              <div className="border-t border-sand pt-3">
                <p className="text-xs font-medium text-muted">Блюда</p>
                <ul className="mt-2 space-y-2">
                  {lines.map((line) => (
                    <li
                      key={line.menuItemId}
                      className="flex justify-between gap-2 text-sm"
                    >
                      <span className="min-w-0 truncate">
                        {line.name}
                        {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                      </span>
                      <span className="shrink-0 font-medium">
                        {getLineTotal(line)} ₽
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between border-t border-sand pt-3">
                <span className="text-sm font-medium">Итого</span>
                <span className="text-lg font-semibold text-accent">
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={completePreorder}
              className="mt-6 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white"
            >
              Готово
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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

"use client";

import { motion } from "framer-motion";

interface DiscountOfferQuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  increaseDisabled?: boolean;
}

export function DiscountOfferQuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  increaseDisabled = false,
}: DiscountOfferQuantityControlProps) {
  return (
    <motion.div
      layout
      className="inline-flex items-center rounded-full bg-sage p-0.5 shadow-soft"
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={onDecrease}
        className="flex h-9 w-9 items-center justify-center rounded-full text-base font-medium text-white"
        aria-label="Уменьшить количество"
      >
        −
      </motion.button>
      <span className="min-w-[1.75rem] px-1 text-center text-sm font-semibold tabular-nums text-white">
        {quantity}
      </span>
      <motion.button
        type="button"
        whileTap={increaseDisabled ? undefined : { scale: 0.92 }}
        onClick={onIncrease}
        disabled={increaseDisabled}
        className="flex h-9 w-9 items-center justify-center rounded-full text-base font-medium text-white disabled:opacity-45"
        aria-label="Увеличить количество"
      >
        +
      </motion.button>
    </motion.div>
  );
}

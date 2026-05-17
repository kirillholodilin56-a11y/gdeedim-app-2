"use client";

import { motion } from "framer-motion";

interface MenuItemQuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  increaseDisabled?: boolean;
}

export function MenuItemQuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  increaseDisabled = false,
}: MenuItemQuantityControlProps) {
  return (
    <div className="flex shrink-0 items-center rounded-full bg-accent p-0.5 shadow-glow">
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={onDecrease}
        className="flex h-8 w-8 items-center justify-center rounded-full text-base font-medium text-white"
        aria-label="Уменьшить количество"
      >
        −
      </motion.button>
      <span className="min-w-[1.5rem] px-1 text-center text-sm font-semibold tabular-nums text-white">
        {quantity}
      </span>
      <motion.button
        type="button"
        whileTap={increaseDisabled ? undefined : { scale: 0.92 }}
        onClick={onIncrease}
        disabled={increaseDisabled}
        className="flex h-8 w-8 items-center justify-center rounded-full text-base font-medium text-white disabled:opacity-45"
        aria-label="Увеличить количество"
      >
        +
      </motion.button>
    </div>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MenuItem } from "@/lib/types";
import {
  canIncreaseMenuItemQuantity,
  getEffectivePrice,
} from "@/lib/preorder";
import { usePreorder } from "@/context/PreorderContext";
import { MenuItemQuantityControl } from "./MenuItemQuantityControl";

interface MenuDishRowProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
  index?: number;
}

export function MenuDishRow({
  item,
  restaurantId,
  restaurantName,
  index = 0,
}: MenuDishRowProps) {
  const { lines, addItem, addOne, removeOne } = usePreorder();
  const effectivePrice = getEffectivePrice(item);
  const quantity =
    lines.find((line) => line.menuItemId === item.id)?.quantity ?? 0;
  const canIncrease = canIncreaseMenuItemQuantity(quantity, item.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`flex gap-3 rounded-2xl bg-white p-3 shadow-card ${
        !item.isAvailable ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug">{item.name}</p>
          {!item.isAvailable && (
            <span className="shrink-0 rounded-full bg-muted/15 px-2 py-0.5 text-[10px] font-medium text-muted">
              Стоп
            </span>
          )}
          {item.isDiscount && item.isAvailable && (
            <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
              −{item.discountPercent}%
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted">
          {item.description}
        </p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="text-sm font-semibold">
            {item.isDiscount && item.discountPercent ? (
              <>
                <span className="mr-1.5 text-xs font-normal text-muted line-through">
                  {item.price} ₽
                </span>
                {effectivePrice} ₽
              </>
            ) : (
              <>{item.price} ₽</>
            )}
          </p>
          {item.isAvailable ? (
            <AnimatePresence mode="wait" initial={false}>
              {quantity === 0 ? (
                <motion.button
                  key="add"
                  type="button"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => addItem(restaurantId, restaurantName, item)}
                  className="shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow"
                >
                  Добавить
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  <MenuItemQuantityControl
                    quantity={quantity}
                    onDecrease={() => removeOne(item.id)}
                    onIncrease={() => addOne(item.id)}
                    increaseDisabled={!canIncrease}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <span className="shrink-0 rounded-full bg-muted/10 px-3 py-1.5 text-xs font-medium text-muted">
              Стоп-лист
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

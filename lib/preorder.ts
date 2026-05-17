import type { MenuItem } from "./types";

export const VISIT_TIME_OPTIONS = ["18:30", "19:00", "19:30", "20:00"] as const;
export const PEOPLE_COUNT_OPTIONS = ["1", "2", "3", "4+"] as const;

export type VisitTime = (typeof VISIT_TIME_OPTIONS)[number];
export type PeopleCount = (typeof PEOPLE_COUNT_OPTIONS)[number];

export interface PreorderLine {
  menuItemId: string;
  name: string;
  unitPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  quantity: number;
}

export function getEffectivePrice(item: MenuItem): number {
  if (item.isDiscount && item.discountPercent) {
    return Math.round(item.price * (1 - item.discountPercent / 100));
  }
  return item.price;
}

export function getLineTotal(line: PreorderLine): number {
  return line.unitPrice * line.quantity;
}

export function getCartTotal(lines: PreorderLine[]): number {
  return lines.reduce((sum, line) => sum + getLineTotal(line), 0);
}

export function getCartItemCount(lines: PreorderLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

/** Parse stock from descriptions like «осталось 3 порции» */
export function getMenuItemStockLimit(description: string): number {
  const match = description.match(/осталось\s+(\d+)/i);
  if (!match) return 99;
  const n = parseInt(match[1], 10);
  return Number.isFinite(n) && n > 0 ? n : 99;
}

export function canIncreaseMenuItemQuantity(
  currentQty: number,
  description: string
): boolean {
  return currentQty < getMenuItemStockLimit(description);
}

export function menuItemToLine(item: MenuItem): Omit<PreorderLine, "quantity"> {
  const unitPrice = getEffectivePrice(item);
  return {
    menuItemId: item.id,
    name: item.name,
    unitPrice,
    originalPrice:
      item.isDiscount && item.discountPercent ? item.price : undefined,
    discountPercent: item.discountPercent,
  };
}

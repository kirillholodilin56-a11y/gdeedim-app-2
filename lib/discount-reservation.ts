import type { PickupOffer } from "./types";

export interface DiscountReservationLine {
  offerId: string;
  offer: PickupOffer;
  quantity: number;
}

/** Parse stock from strings like «осталось 4 порции» */
export function parseStockLimit(availability: string): number {
  const match = availability.match(/осталось\s+(\d+)/i);
  if (!match) return 99;
  const n = parseInt(match[1], 10);
  return Number.isFinite(n) && n > 0 ? n : 99;
}

export function getOfferStockLimit(offer: PickupOffer): number {
  return parseStockLimit(offer.availability);
}

export function canIncreaseQuantity(
  currentQty: number,
  offer: PickupOffer
): boolean {
  return currentQty < getOfferStockLimit(offer);
}

/** Updates «осталось N …» based on items already in the reservation. */
export function formatRemainingAvailability(
  availability: string,
  reservedQty: number
): string {
  const remaining = Math.max(
    0,
    parseStockLimit(availability) - reservedQty
  );
  if (/осталось\s+\d+/i.test(availability)) {
    return availability.replace(/осталось\s+\d+/i, `осталось ${remaining}`);
  }
  return availability;
}

export function getReservationLineTotal(line: DiscountReservationLine): number {
  return line.offer.newPrice * line.quantity;
}

export function getReservationLineOldTotal(
  line: DiscountReservationLine
): number {
  return line.offer.oldPrice * line.quantity;
}

export function getReservationCartTotal(
  lines: DiscountReservationLine[]
): number {
  return lines.reduce((sum, line) => sum + getReservationLineTotal(line), 0);
}

export function getReservationItemCount(
  lines: DiscountReservationLine[]
): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

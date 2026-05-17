import type { PickupOffer } from "./types";

export interface DiscountReservationLine {
  offerId: string;
  offer: PickupOffer;
  quantity: number;
}

export function getReservationLineTotal(line: DiscountReservationLine): number {
  return line.offer.newPrice * line.quantity;
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

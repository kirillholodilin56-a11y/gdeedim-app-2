"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PickupOffer } from "@/lib/types";
import {
  canIncreaseQuantity,
  getOfferStockLimit,
  getReservationCartTotal,
  getReservationItemCount,
  type DiscountReservationLine,
} from "@/lib/discount-reservation";

export type DiscountReservationStep = "idle" | "confirm";

interface DiscountReservationContextValue {
  lines: DiscountReservationLine[];
  itemCount: number;
  total: number;
  flowStep: DiscountReservationStep;
  isSheetExpanded: boolean;
  addOffer: (offer: PickupOffer) => boolean;
  addOne: (offerId: string) => boolean;
  removeOne: (offerId: string) => void;
  setSheetExpanded: (expanded: boolean) => void;
  startPickup: () => void;
  completeReservation: () => void;
  closeFlow: () => void;
  getQuantity: (offerId: string) => number;
  canAddMore: (offerId: string) => boolean;
  isAtStockLimit: (offerId: string) => boolean;
}

const DiscountReservationContext =
  createContext<DiscountReservationContextValue | null>(null);

export function DiscountReservationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lines, setLines] = useState<DiscountReservationLine[]>([]);
  const [flowStep, setFlowStep] = useState<DiscountReservationStep>("idle");
  const [isSheetExpanded, setSheetExpanded] = useState(false);
  const itemCount = useMemo(() => getReservationItemCount(lines), [lines]);
  const total = useMemo(() => getReservationCartTotal(lines), [lines]);

  const getQuantity = useCallback(
    (offerId: string) => lines.find((l) => l.offerId === offerId)?.quantity ?? 0,
    [lines]
  );

  const canAddMore = useCallback(
    (offerId: string) => {
      const line = lines.find((l) => l.offerId === offerId);
      if (!line) return true;
      return canIncreaseQuantity(line.quantity, line.offer);
    },
    [lines]
  );

  const isAtStockLimit = useCallback(
    (offerId: string) => {
      const line = lines.find((l) => l.offerId === offerId);
      if (!line) return false;
      return !canIncreaseQuantity(line.quantity, line.offer);
    },
    [lines]
  );

  const addOffer = useCallback((offer: PickupOffer): boolean => {
    let added = false;
    setLines((prev) => {
      const existing = prev.find((l) => l.offerId === offer.id);
      if (existing) {
        if (!canIncreaseQuantity(existing.quantity, offer)) return prev;
        added = true;
        return prev.map((l) =>
          l.offerId === offer.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      if (getOfferStockLimit(offer) < 1) return prev;
      added = true;
      return [...prev, { offerId: offer.id, offer, quantity: 1 }];
    });
    return added;
  }, []);

  const addOne = useCallback((offerId: string): boolean => {
    let added = false;
    setLines((prev) => {
      const line = prev.find((l) => l.offerId === offerId);
      if (!line || !canIncreaseQuantity(line.quantity, line.offer)) return prev;
      added = true;
      return prev.map((l) =>
        l.offerId === offerId ? { ...l, quantity: l.quantity + 1 } : l
      );
    });
    return added;
  }, []);

  const removeOne = useCallback((offerId: string) => {
    setLines((prev) => {
      const line = prev.find((l) => l.offerId === offerId);
      if (!line) return prev;
      if (line.quantity <= 1) {
        const next = prev.filter((l) => l.offerId !== offerId);
        if (next.length === 0) setSheetExpanded(false);
        return next;
      }
      return prev.map((l) =>
        l.offerId === offerId ? { ...l, quantity: l.quantity - 1 } : l
      );
    });
  }, []);

  const startPickup = useCallback(() => {
    if (lines.length === 0) return;
    setFlowStep("confirm");
    setSheetExpanded(false);
  }, [lines]);

  const completeReservation = useCallback(() => {
    setLines([]);
    setFlowStep("idle");
    setSheetExpanded(false);
  }, []);

  const closeFlow = useCallback(() => {
    setFlowStep("idle");
  }, []);

  const value = useMemo<DiscountReservationContextValue>(
    () => ({
      lines,
      itemCount,
      total,
      flowStep,
      isSheetExpanded,
      addOffer,
      addOne,
      removeOne,
      setSheetExpanded,
      startPickup,
      completeReservation,
      closeFlow,
      getQuantity,
      canAddMore,
      isAtStockLimit,
    }),
    [
      lines,
      itemCount,
      total,
      flowStep,
      isSheetExpanded,
      addOffer,
      addOne,
      removeOne,
      startPickup,
      completeReservation,
      closeFlow,
      getQuantity,
      canAddMore,
      isAtStockLimit,
    ]
  );

  return (
    <DiscountReservationContext.Provider value={value}>
      {children}
    </DiscountReservationContext.Provider>
  );
}

export function useDiscountReservation() {
  const ctx = useContext(DiscountReservationContext);
  if (!ctx) {
    throw new Error(
      "useDiscountReservation must be used within DiscountReservationProvider"
    );
  }
  return ctx;
}

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
  addOffer: (offer: PickupOffer) => void;
  removeOne: (offerId: string) => void;
  setSheetExpanded: (expanded: boolean) => void;
  startPickup: () => void;
  completeReservation: () => void;
  closeFlow: () => void;
  isInCart: (offerId: string) => boolean;
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

  const addOffer = useCallback((offer: PickupOffer) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.offerId === offer.id);
      if (existing) {
        return prev.map((l) =>
          l.offerId === offer.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { offerId: offer.id, offer, quantity: 1 }];
    });
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

  const isInCart = useCallback(
    (offerId: string) => lines.some((l) => l.offerId === offerId),
    [lines]
  );

  const value = useMemo<DiscountReservationContextValue>(
    () => ({
      lines,
      itemCount,
      total,
      flowStep,
      isSheetExpanded,
      addOffer,
      removeOne,
      setSheetExpanded,
      startPickup,
      completeReservation,
      closeFlow,
      isInCart,
    }),
    [
      lines,
      itemCount,
      total,
      flowStep,
      isSheetExpanded,
      addOffer,
      removeOne,
      startPickup,
      completeReservation,
      closeFlow,
      isInCart,
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

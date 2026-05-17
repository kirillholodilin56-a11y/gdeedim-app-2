"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import type { PickupOffer } from "@/lib/types";
import { formatRemainingAvailability } from "@/lib/discount-reservation";
import { useDiscountReservation } from "@/context/DiscountReservationContext";
import { DiscountOfferQuantityControl } from "./DiscountOfferQuantityControl";

interface PickupOfferListProps {
  offers: PickupOffer[];
  highlightedOfferId?: string | null;
}

export function PickupOfferList({
  offers,
  highlightedOfferId,
}: PickupOfferListProps) {
  const { addOffer, addOne, removeOne, getQuantity, canAddMore } =
    useDiscountReservation();

  return (
    <div className="space-y-3">
      {offers.map((offer, i) => {
        const isHighlighted = highlightedOfferId === offer.id;
        const quantity = getQuantity(offer.id);
        const inCart = quantity > 0;
        const canIncrease = canAddMore(offer.id);
        const availabilityLabel = formatRemainingAvailability(
          offer.availability,
          quantity
        );

        return (
          <motion.article
            key={offer.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className={`rounded-2xl bg-white p-4 shadow-card transition-shadow ${
              isHighlighted ? "ring-2 ring-accent/30" : ""
            } ${inCart ? "ring-2 ring-sage/35" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/restaurants/${offer.restaurantId}`}
                  className="text-xs font-medium text-accent"
                >
                  {offer.restaurantName}
                </Link>
                <h3 className="mt-0.5 text-base font-semibold text-charcoal">
                  {offer.dishName}
                </h3>
                <p className="mt-2 text-[11px] text-muted">
                  Самовывоз · {offer.pickupWindow}
                </p>
                <motion.p
                  key={availabilityLabel}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  className="mt-0.5 text-[11px] font-medium text-sage"
                >
                  {availabilityLabel}
                </motion.p>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                  −{offer.discountPercent}%
                </span>
                <p className="mt-2 text-xs text-muted line-through">
                  <PriceLabel amount={offer.oldPrice} />
                </p>
                <PriceLabel
                  amount={offer.newPrice}
                  className="text-lg font-bold text-charcoal"
                />
              </div>
            </div>

            <div className="mt-4 flex min-h-[44px] items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {quantity === 0 ? (
                  <motion.button
                    key="add"
                    type="button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addOffer(offer)}
                    className="w-full rounded-2xl bg-charcoal py-3 text-sm font-semibold text-white"
                  >
                    Добавить
                  </motion.button>
                ) : (
                  <motion.div
                    key="stepper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="flex w-full flex-col items-center gap-2"
                  >
                    <DiscountOfferQuantityControl
                      quantity={quantity}
                      onDecrease={() => removeOne(offer.id)}
                      onIncrease={() => addOne(offer.id)}
                      increaseDisabled={!canIncrease}
                    />
                    {!canIncrease && (
                      <p className="text-center text-xs text-muted">
                        Больше нет в наличии
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

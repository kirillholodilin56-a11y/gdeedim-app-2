"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PickupOffer } from "@/lib/types";
import { useDiscountReservation } from "@/context/DiscountReservationContext";

interface PickupOfferListProps {
  offers: PickupOffer[];
  highlightedOfferId?: string | null;
}

export function PickupOfferList({
  offers,
  highlightedOfferId,
}: PickupOfferListProps) {
  const { addOffer, isInCart } = useDiscountReservation();

  return (
    <div className="space-y-3">
      {offers.map((offer, i) => {
        const isHighlighted = highlightedOfferId === offer.id;
        const inCart = isInCart(offer.id);

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
                <p className="mt-0.5 text-[11px] font-medium text-sage">
                  {offer.availability}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                  −{offer.discountPercent}%
                </span>
                <p className="mt-2 text-xs text-muted line-through">
                  {offer.oldPrice} ₽
                </p>
                <p className="text-lg font-bold text-charcoal">
                  {offer.newPrice} ₽
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => addOffer(offer)}
              className={`mt-4 w-full rounded-2xl py-3 text-sm font-semibold transition-colors ${
                inCart
                  ? "bg-sage/15 text-sage"
                  : "bg-charcoal text-white"
              }`}
            >
              {inCart ? "Добавлено · +1" : "Забронировать"}
            </motion.button>
          </motion.article>
        );
      })}
    </div>
  );
}

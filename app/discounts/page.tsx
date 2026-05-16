"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";
import { PickupOfferList } from "@/components/discounts/PickupOfferList";
import { TomskDiscountMap } from "@/components/discounts/TomskDiscountMap";
import { discountMapPins, pickupOffers } from "@/lib/discount-mock";

export default function DiscountsPage() {
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const visibleOffers = useMemo(() => {
    if (!selectedPinId) return pickupOffers.slice(0, 5);
    const pin = discountMapPins.find((p) => p.id === selectedPinId);
    if (!pin) return pickupOffers.slice(0, 5);
    const matched = pickupOffers.filter((o) => o.mapPinId === selectedPinId);
    return matched.length > 0 ? matched : pickupOffers.slice(0, 5);
  }, [selectedPinId]);

  const highlightedOfferId = visibleOffers[0]?.id ?? null;

  const handleSelectPin = (pinId: string) => {
    setSelectedPinId((prev) => (prev === pinId ? null : pinId));
  };

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-3">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Антисписание
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="mt-1 text-sm leading-relaxed text-muted"
        >
          Блюда со скидкой рядом — забери сегодня до закрытия.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mx-5 mb-4"
      >
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 shadow-soft">
          <LocationDotIcon />
          <span className="text-sm font-medium text-charcoal">
            Томск · рядом со мной
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <TomskDiscountMap
          pins={discountMapPins}
          selectedPinId={selectedPinId}
          onSelectPin={handleSelectPin}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mx-5 mt-4 rounded-2xl bg-sand/80 px-4 py-3 text-xs leading-relaxed text-muted"
      >
        Заведения добавляют блюда, которые нужно реализовать сегодня. Вы видите
        скидку, бронируете позицию и забираете её в заведении — без доставки.
      </motion.p>

      <section className="mt-5 rounded-t-4xl bg-white px-5 pb-4 pt-5 shadow-[0_-8px_32px_rgba(28,27,26,0.06)]">
        <div className="mb-1 flex items-center justify-center">
          <span className="h-1 w-10 rounded-full bg-charcoal/10" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">
          Можно забрать сегодня
        </h2>
        <p className="mb-4 mt-0.5 text-xs text-muted">
          {selectedPinId
            ? discountMapPins.find((p) => p.id === selectedPinId)?.restaurantName
            : `${pickupOffers.length} предложений рядом`}
        </p>
        <PickupOfferList
          offers={visibleOffers}
          highlightedOfferId={highlightedOfferId}
        />
      </section>
    </MobileShell>
  );
}

function LocationDotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-6-5.4-6-10a6 6 0 1112 0c0 4.6-6 10-6 10z"
        stroke="#7A9E87"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.5" fill="#7A9E87" />
    </svg>
  );
}

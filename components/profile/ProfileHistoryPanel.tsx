"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PriceLabel } from "@/components/ui/PriceLabel";
import type {
  MockBooking,
  MockDiscountHistory,
  MockPreorderHistory,
  ProfileTabId,
} from "@/lib/profile-mock";

interface ProfileHistoryPanelProps {
  tab: ProfileTabId;
  bookings: MockBooking[];
  preorders: MockPreorderHistory[];
  discounts: MockDiscountHistory[];
}

export function ProfileHistoryPanel({
  tab,
  bookings,
  preorders,
  discounts,
}: ProfileHistoryPanelProps) {
  const items =
    tab === "bookings"
      ? bookings
      : tab === "preorders"
        ? preorders
        : discounts;

  if (items.length === 0) {
    return <ProfileEmptyState />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
        className="space-y-3"
      >
        {tab === "bookings" &&
          bookings.map((item, i) => (
            <BookingCard key={item.id} booking={item} index={i} />
          ))}
        {tab === "preorders" &&
          preorders.map((item, i) => (
            <PreorderCard key={item.id} preorder={item} index={i} />
          ))}
        {tab === "discounts" &&
          discounts.map((item, i) => (
            <DiscountCard key={item.id} discount={item} index={i} />
          ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ProfileEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white px-6 py-10 text-center shadow-card"
    >
      <p className="text-base font-semibold">Пока ничего нет</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Ваши брони и предзаказы появятся здесь.
      </p>
    </motion.div>
  );
}

function BookingCard({ booking, index }: { booking: MockBooking; index: number }) {
  return (
    <HistoryCard index={index}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          {booking.restaurantName}
        </h3>
        <StatusPill
          label={booking.statusLabel}
          variant={booking.status === "active" ? "active" : "muted"}
        />
      </div>
      <p className="mt-2 text-sm text-charcoal">{booking.dateTimeLabel}</p>
      <p className="mt-1 text-sm text-muted">{booking.guestsTableLabel}</p>
    </HistoryCard>
  );
}

function PreorderCard({
  preorder,
  index,
}: {
  preorder: MockPreorderHistory;
  index: number;
}) {
  return (
    <HistoryCard index={index}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          {preorder.restaurantName}
        </h3>
        <StatusPill
          label={preorder.statusLabel}
          variant={
            preorder.status === "awaiting_visit" ? "accent" : "muted"
          }
        />
      </div>
      <p className="mt-2 text-sm text-charcoal">{preorder.dishesLabel}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-sm text-muted">{preorder.visitTimeLabel}</p>
        <PriceLabel amount={preorder.total} className="text-sm font-semibold" />
      </div>
    </HistoryCard>
  );
}

function DiscountCard({
  discount,
  index,
}: {
  discount: MockDiscountHistory;
  index: number;
}) {
  return (
    <HistoryCard index={index}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          {discount.restaurantName}
        </h3>
        <StatusPill label={discount.statusLabel} variant="accent" />
      </div>
      <p className="mt-2 text-sm text-charcoal">{discount.dishName}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-sm text-muted">{discount.pickupLabel}</p>
        <span className="shrink-0 text-sm font-semibold text-accent">
          <span className="font-medium text-muted">{discount.discountLabel}</span>
          {" · "}
          <PriceLabel amount={discount.newPrice} className="inline" />
        </span>
      </div>
    </HistoryCard>
  );
}

function HistoryCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="rounded-3xl bg-white p-4 shadow-card"
    >
      {children}
    </motion.article>
  );
}

function StatusPill({
  label,
  variant,
}: {
  label: string;
  variant: "active" | "accent" | "muted";
}) {
  const styles = {
    active: "bg-sage/15 text-sage",
    accent: "bg-accent/12 text-accent",
    muted: "bg-sand text-muted",
  }[variant];

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${styles}`}
    >
      {label}
    </span>
  );
}

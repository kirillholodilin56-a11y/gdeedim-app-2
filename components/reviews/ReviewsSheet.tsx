"use client";

import { motion } from "framer-motion";
import { BottomSheetShell, SheetHandle } from "@/components/ui/BottomSheetShell";
import type { RestaurantReviewSummary } from "@/lib/restaurant-reviews";

interface ReviewsSheetProps {
  open: boolean;
  onClose: () => void;
  summary: RestaurantReviewSummary;
}

export function ReviewsSheet({ open, onClose, summary }: ReviewsSheetProps) {
  return (
    <BottomSheetShell open={open} onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
        <SheetHandle />
        <h2 className="text-xl font-semibold tracking-tight">Отзывы</h2>

        <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
          <div>
            <p className="text-3xl font-semibold tracking-tight">
              {summary.averageRating.toFixed(1)}
            </p>
            <div className="mt-1 flex gap-0.5">
              <StarRow rating={summary.averageRating} />
            </div>
          </div>
          <div className="h-10 w-px bg-sand" />
          <p className="text-sm text-muted">
            {summary.totalCount} отзывов
          </p>
        </div>

        <ul className="mt-4 space-y-3">
          {summary.reviews.map((review, i) => (
            <motion.li
              key={review.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/80 text-sm font-semibold text-accent">
                  {review.authorInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{review.authorName}</p>
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-charcoal">
                      ★ {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">
                    {review.text}
                  </p>
                  {review.tag && (
                    <span className="mt-2 inline-block rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-medium text-muted">
                      {review.tag}
                    </span>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </BottomSheetShell>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={n <= Math.round(rating) ? "text-accent" : "text-muted/30"}
        >
          ★
        </span>
      ))}
    </>
  );
}

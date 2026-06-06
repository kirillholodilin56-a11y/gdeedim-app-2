"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BottomSheetShell, SheetHandle } from "@/components/ui/BottomSheetShell";
import { PROFILE_USER, type MockBooking } from "@/lib/profile-mock";
import { saveStoredReview } from "@/lib/review-storage";

interface ReviewSubmitSheetProps {
  open: boolean;
  booking: MockBooking | null;
  onClose: () => void;
  onSubmitted: () => void;
}

export function ReviewSubmitSheet({
  open,
  booking,
  onClose,
  onSubmitted,
}: ReviewSubmitSheetProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setRating(0);
    setReviewText("");
    setError(null);
  }, [open, booking?.id]);

  const canSubmit = rating > 0 && reviewText.trim().length > 0;

  function handleSubmit() {
    if (!booking?.restaurantId || !canSubmit) return;

    const result = saveStoredReview({
      bookingId: booking.id,
      restaurantId: booking.restaurantId,
      restaurantName: booking.restaurantName,
      rating,
      reviewText: reviewText.trim(),
      createdAt: new Date().toISOString(),
      authorName: PROFILE_USER.name,
    });

    if (!result.ok) {
      setError("Отзыв по этой брони уже оставлен");
      return;
    }

    onSubmitted();
    onClose();
  }

  return (
    <BottomSheetShell open={open} onClose={onClose}>
      <div className="rounded-t-4xl bg-cream px-5 pb-8 pt-3 shadow-soft">
        <SheetHandle />
        <h2 className="text-xl font-semibold tracking-tight">Оставить отзыв</h2>
        {booking && (
          <p className="mt-1 text-sm text-muted">{booking.restaurantName}</p>
        )}

        <div className="mt-5 rounded-2xl bg-white p-4 shadow-card">
          <p className="text-sm font-medium">Оценка</p>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} из 5`}
                onClick={() => setRating(value)}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-colors ${
                  value <= rating
                    ? "bg-accent/15 text-accent"
                    : "bg-sand text-muted/40"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-white p-4 shadow-card">
          <label htmlFor="review-text" className="text-sm font-medium">
            Комментарий
          </label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={4}
            placeholder="Расскажите о визите..."
            className="mt-3 w-full resize-none rounded-2xl border border-sand bg-cream/50 px-4 py-3 text-sm leading-relaxed text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-accent/40"
          />
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-accent">{error}</p>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: canSubmit ? 0.98 : 1 }}
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="mt-5 w-full rounded-2xl bg-charcoal py-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Отправить отзыв
        </motion.button>
      </div>
    </BottomSheetShell>
  );
}

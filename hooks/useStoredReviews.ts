"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStoredReviews,
  REVIEWS_UPDATED_EVENT,
  type StoredReview,
} from "@/lib/review-storage";

export function useStoredReviews() {
  const [reviews, setReviews] = useState<StoredReview[]>([]);

  const refresh = useCallback(() => {
    setReviews(getStoredReviews());
  }, []);

  useEffect(() => {
    refresh();

    const onUpdate = () => refresh();
    window.addEventListener(REVIEWS_UPDATED_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener(REVIEWS_UPDATED_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);

  return {
    reviews,
    hasReviewForBooking: (bookingId: string) =>
      reviews.some((review) => review.bookingId === bookingId),
    refresh,
  };
}

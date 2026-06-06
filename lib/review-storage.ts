export const REVIEWS_STORAGE_KEY = "gde-edim-reviews";
export const REVIEWS_UPDATED_EVENT = "gde-edim-reviews-updated";

export interface StoredReview {
  bookingId: string;
  restaurantId: string;
  restaurantName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  authorName: string;
}

function readReviews(): StoredReview[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredReview[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeReviews(reviews: StoredReview[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event(REVIEWS_UPDATED_EVENT));
}

export function getStoredReviews(): StoredReview[] {
  return readReviews();
}

export function hasReviewForBooking(bookingId: string): boolean {
  return readReviews().some((review) => review.bookingId === bookingId);
}

export function getStoredReviewsForRestaurant(restaurantId: string): StoredReview[] {
  return readReviews().filter((review) => review.restaurantId === restaurantId);
}

export function saveStoredReview(
  review: StoredReview
): { ok: true } | { ok: false; reason: "duplicate" } {
  const existing = readReviews();
  if (existing.some((item) => item.bookingId === review.bookingId)) {
    return { ok: false, reason: "duplicate" };
  }

  writeReviews([review, ...existing]);
  return { ok: true };
}

export function formatReviewDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) return "Сегодня";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) return "Вчера";

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

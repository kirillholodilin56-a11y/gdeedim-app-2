import {
  formatReviewDate,
  type StoredReview,
} from "./review-storage";

export interface RestaurantReview {
  id: string;
  authorName: string;
  authorInitial: string;
  rating: number;
  text: string;
  tag?: string;
  createdAt?: string;
  dateLabel?: string;
}

export interface RestaurantReviewSummary {
  averageRating: number;
  totalCount: number;
  reviews: RestaurantReview[];
}

const BASE_REVIEWS: Omit<RestaurantReview, "id">[] = [
  {
    authorName: "Анна",
    authorInitial: "А",
    rating: 5,
    text: "Хороший кофе и быстрое обслуживание.",
    tag: "кофе",
  },
  {
    authorName: "Дмитрий",
    authorInitial: "Д",
    rating: 5,
    text: "Меню реально совпадает с наличием.",
    tag: "live меню",
  },
  {
    authorName: "Мария",
    authorInitial: "М",
    rating: 4,
    text: "Удобно оформить заказ заранее.",
    tag: "быстро",
  },
  {
    authorName: "Игорь",
    authorInitial: "И",
    rating: 5,
    text: "Сырники понравились, принесли быстро.",
    tag: "завтраки",
  },
  {
    authorName: "Елена",
    authorInitial: "Е",
    rating: 5,
    text: "Атмосферное место для завтрака.",
    tag: "уютно",
  },
  {
    authorName: "Павел",
    authorInitial: "П",
    rating: 4,
    text: "Понравилось, что видно остатки блюд.",
    tag: "live меню",
  },
];

function storedToRestaurantReview(stored: StoredReview): RestaurantReview {
  return {
    id: `stored-${stored.bookingId}`,
    authorName: stored.authorName,
    authorInitial: stored.authorName.charAt(0).toUpperCase(),
    rating: stored.rating,
    text: stored.reviewText,
    createdAt: stored.createdAt,
    dateLabel: formatReviewDate(stored.createdAt),
  };
}

/** Demo reviews merged with user reviews from localStorage. */
export function getReviewsForRestaurant(
  restaurantId: string,
  venueRating: number,
  storedReviews: StoredReview[] = []
): RestaurantReviewSummary {
  const offset = restaurantId.length % 2;
  const mockReviews = BASE_REVIEWS.slice(0, 6 - offset).map((review, i) => ({
    ...review,
    id: `${restaurantId}-rev-${i}`,
  }));

  const localReviews = storedReviews
    .filter((review) => review.restaurantId === restaurantId)
    .map(storedToRestaurantReview)
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );

  const reviews = [...localReviews, ...mockReviews];
  const mockTotal = 24 + (restaurantId.charCodeAt(0) % 40);

  const averageRating =
    reviews.length > 0
      ? Math.round(
          (reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length) *
            10
        ) / 10
      : venueRating;

  return {
    averageRating,
    totalCount: mockTotal + localReviews.length,
    reviews,
  };
}

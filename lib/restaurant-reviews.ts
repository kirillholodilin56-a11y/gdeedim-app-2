export interface RestaurantReview {
  id: string;
  authorName: string;
  authorInitial: string;
  rating: number;
  text: string;
  tag?: string;
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

/** Demo reviews — same concise set for all venues, count varies slightly. */
export function getReviewsForRestaurant(
  restaurantId: string,
  venueRating: number
): RestaurantReviewSummary {
  const offset = restaurantId.length % 2;
  const reviews = BASE_REVIEWS.slice(0, 6 - offset).map((r, i) => ({
    ...r,
    id: `${restaurantId}-rev-${i}`,
  }));

  const averageRating =
    Math.round(
      ((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length + venueRating) /
        2) *
        10
    ) / 10;

  return {
    averageRating,
    totalCount: 24 + (restaurantId.charCodeAt(0) % 40),
    reviews,
  };
}

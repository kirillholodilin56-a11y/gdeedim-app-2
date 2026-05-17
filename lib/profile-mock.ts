export const PROFILE_USER = {
  name: "Кирилл",
  city: "Томск",
  subtitle: "Любимые места и предзаказы",
} as const;

export type ProfileTabId = "bookings" | "preorders" | "discounts";

export type BookingStatus = "active" | "completed";

export interface MockBooking {
  id: string;
  restaurantName: string;
  dateTimeLabel: string;
  guestsTableLabel: string;
  status: BookingStatus;
  statusLabel: string;
}

export type PreorderHistoryStatus = "awaiting_visit" | "completed" | "cancelled";

export interface MockPreorderHistory {
  id: string;
  restaurantName: string;
  dishesLabel: string;
  visitTimeLabel: string;
  total: number;
  status: PreorderHistoryStatus;
  statusLabel: string;
}

export interface MockDiscountHistory {
  id: string;
  restaurantName: string;
  dishName: string;
  pickupLabel: string;
  discountLabel: string;
  newPrice: number;
  statusLabel: string;
}

export const mockBookings: MockBooking[] = [
  {
    id: "bk-1",
    restaurantName: "Снегири",
    dateTimeLabel: "Сегодня · 19:00",
    guestsTableLabel: "3 гостя · столик №4 у окна",
    status: "active",
    statusLabel: "активна",
  },
  {
    id: "bk-2",
    restaurantName: "Кинцуги",
    dateTimeLabel: "Завтра · 18:30",
    guestsTableLabel: "2 гостя · столик №3 у окна",
    status: "active",
    statusLabel: "активна",
  },
  {
    id: "bk-3",
    restaurantName: "Додо Пицца",
    dateTimeLabel: "12 мая · 13:00",
    guestsTableLabel: "4 гостя · столик №6",
    status: "completed",
    statusLabel: "завершена",
  },
];

export const mockPreorderHistory: MockPreorderHistory[] = [
  {
    id: "po-1",
    restaurantName: "Surf Coffee x Lamp",
    dishesLabel: "Айс латте · чизкейк",
    visitTimeLabel: "Сегодня · 19:00",
    total: 575,
    status: "awaiting_visit",
    statusLabel: "ожидает визита",
  },
  {
    id: "po-2",
    restaurantName: "Территория Кофе",
    dishesLabel: "Капучино · сырники",
    visitTimeLabel: "Вчера · 10:30",
    total: 620,
    status: "completed",
    statusLabel: "получен",
  },
  {
    id: "po-3",
    restaurantName: "Pho Tigers",
    dishesLabel: "Фо бо · свежие роллы",
    visitTimeLabel: "10 мая · 20:00",
    total: 890,
    status: "completed",
    statusLabel: "получен",
  },
];

export const mockDiscountHistory: MockDiscountHistory[] = [
  {
    id: "ds-1",
    restaurantName: "Безумно.Крутая шаурма",
    dishName: "Комбо с напитком",
    pickupLabel: "Забрать до 22:30",
    discountLabel: "−15%",
    newPrice: 332,
    statusLabel: "забронировано",
  },
  {
    id: "ds-2",
    restaurantName: "Сибагро Гурмэ",
    dishName: "Бургер дня",
    pickupLabel: "Забрать до 21:00",
    discountLabel: "−20%",
    newPrice: 464,
    statusLabel: "забронировано",
  },
  {
    id: "ds-3",
    restaurantName: "Снегири",
    dishName: "Паста карбонара",
    pickupLabel: "Забрано вчера",
    discountLabel: "−25%",
    newPrice: 540,
    statusLabel: "получено",
  },
];

/** Favorite venue IDs — resolved from lib/mock-data restaurants */
export const favoriteRestaurantIds = [
  "snegiri",
  "surf-coffee-lamp",
  "kintsugi",
] as const;

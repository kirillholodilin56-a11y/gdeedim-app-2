export type LiveStatus = "open" | "busy" | "closing";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  district: string;
  rating: number;
  averageCheck: number;
  distance: string;
  image: string;
  liveStatus: LiveStatus;
  menuUpdatedAt: string;
  tags: string[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isDiscount?: boolean;
  discountPercent?: number;
  updatedAt?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface LiveUpdate {
  id: string;
  restaurantId: string;
  restaurantName: string;
  message: string;
  time: string;
  type: "menu" | "stop" | "discount";
}

import type { MenuItem, Restaurant } from "./types";
import { menuItems, restaurants } from "./mock-data";

export type MenuSearchResult = MenuItem & { restaurantName: string };

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "1": [],
  "2": ["завтрак", "завтраки", "сырник", "омлет", "круассан", "выпечка"],
  "3": ["азия", "том ям", "сашими", "япон", "суп"],
  "4": ["вино", "ужин", "ресторан", "средиземномор"],
  "5": ["кофе", "капучино", "раф", "матча", "кофейня", "спешелти"],
  "6": ["десерт", "десерты", "торт", "эклер", "чизкейк", "медовик", "кондитер"],
};

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function includesQuery(haystack: string, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  return normalize(haystack).includes(q);
}

function restaurantMatchesKeywords(
  restaurant: Restaurant,
  keywords: string[],
  items: MenuItem[]
): boolean {
  const restaurantBlob = [
    restaurant.name,
    restaurant.cuisine,
    restaurant.description,
    restaurant.district,
    ...restaurant.tags,
  ].join(" ");

  if (keywords.some((kw) => includesQuery(restaurantBlob, kw))) {
    return true;
  }

  return items
    .filter((item) => item.restaurantId === restaurant.id)
    .some((item) =>
      keywords.some(
        (kw) =>
          includesQuery(item.name, kw) ||
          includesQuery(item.category, kw) ||
          includesQuery(item.description, kw)
      )
    );
}

export function filterRestaurantsByCategory(
  list: Restaurant[],
  categoryId: string,
  items: MenuItem[] = menuItems
): Restaurant[] {
  const keywords = CATEGORY_KEYWORDS[categoryId] ?? [];
  if (keywords.length === 0) return list;

  return list.filter((restaurant) =>
    restaurantMatchesKeywords(restaurant, keywords, items)
  );
}

export function searchRestaurants(
  query: string,
  list: Restaurant[] = restaurants,
  items: MenuItem[] = menuItems
): Restaurant[] {
  const q = normalize(query);
  if (!q) return list;

  const idsFromMenu = new Set(
    items
      .filter(
        (item) =>
          includesQuery(item.name, q) ||
          includesQuery(item.description, q) ||
          includesQuery(item.category, q)
      )
      .map((item) => item.restaurantId)
  );

  return list.filter(
    (restaurant) =>
      idsFromMenu.has(restaurant.id) ||
      includesQuery(restaurant.name, q) ||
      includesQuery(restaurant.cuisine, q) ||
      includesQuery(restaurant.description, q) ||
      includesQuery(restaurant.district, q) ||
      restaurant.tags.some((tag) => includesQuery(tag, q))
  );
}

export function searchMenuItems(
  query: string,
  items: MenuItem[] = menuItems,
  venueList: Restaurant[] = restaurants
): MenuSearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  return items
    .filter(
      (item) =>
        includesQuery(item.name, q) ||
        includesQuery(item.description, q) ||
        includesQuery(item.category, q)
    )
    .map((item) => ({
      ...item,
      restaurantName:
        venueList.find((r) => r.id === item.restaurantId)?.name ?? "",
    }));
}

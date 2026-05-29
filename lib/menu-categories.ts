import type { MenuItem } from "./types";

export const ALL_MENU_CATEGORY = "Все";

/** Canonical tab order per venue (only tabs with at least one dish are shown). */
const RESTAURANT_CATEGORY_ORDER: Record<string, string[]> = {
  kintsugi: ["Закуски", "Основные", "Десерты", "Детское меню"],
};

/** Unique categories for a venue menu, in display order. */
export function getMenuCategoriesForRestaurant(items: MenuItem[]): string[] {
  const present = new Set(items.map((item) => item.category));
  const restaurantId = items[0]?.restaurantId;
  const canonical = restaurantId
    ? RESTAURANT_CATEGORY_ORDER[restaurantId]
    : undefined;

  if (canonical) {
    const ordered = canonical.filter((cat) => present.has(cat));
    const extras = Array.from(present)
      .filter((cat) => !canonical.includes(cat))
      .sort((a, b) => a.localeCompare(b, "ru"));
    return [ALL_MENU_CATEGORY, ...ordered, ...extras];
  }

  const categories: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      categories.push(item.category);
    }
  }

  return [ALL_MENU_CATEGORY, ...categories];
}

export function filterMenuByCategory(
  items: MenuItem[],
  activeCategory: string
): MenuItem[] {
  if (activeCategory === ALL_MENU_CATEGORY) return items;
  return items.filter((item) => item.category === activeCategory);
}

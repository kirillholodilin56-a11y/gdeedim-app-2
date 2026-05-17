import type { MenuItem } from "./types";

export const ALL_MENU_CATEGORY = "Все";

/** Unique categories for a venue menu, in order of first appearance. */
export function getMenuCategoriesForRestaurant(items: MenuItem[]): string[] {
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

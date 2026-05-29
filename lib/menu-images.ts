import type { MenuItem } from "./types";

export const MENU_ITEM_PLACEHOLDER = "/placeholder-dish.svg";

const MENU_IMAGE_EXTENSIONS = ["jpg", "png"] as const;

/** Extension per dish filename in public/menu (avoids 404 from wrong guess). */
const MENU_IMAGE_EXT: Record<string, (typeof MENU_IMAGE_EXTENSIONS)[number]> = {
  "Айс латте": "png",
  "Бургер бриошь с рваной говядиной": "jpg",
  "Вупи-пай вареная сгущенка": "png",
  "Гёдза с курицей": "png",
  "Грилд-чиз с томленными овощами и брынзой": "png",
  "Детский рамен": "png",
  "Додстер": "png",
  "Карбонара": "png",
  "Кедровый латте": "jpg",
  "Маргарита": "png",
  "Матча латте": "jpg",
  "Моти манго": "png",
  "Пепперони": "png",
  "Рамен с говядиной": "png",
  "Скрэмбл с колбасками": "jpg",
  "Сырники со сметаной": "jpg",
  "Том ям с креветкой": "png",
  "Флэт уайт": "png",
  "Хот-дог сырный": "jpg",
  "Чикен BBQ": "png",
  "Эспрессо-тоник": "png",
};

function menuImagePath(
  name: string,
  ext: (typeof MENU_IMAGE_EXTENSIONS)[number]
): string {
  return `/menu/${encodeURIComponent(name)}.${ext}`;
}

/** Candidate paths for a dish (single path when known, else jpg then png). */
export function getMenuItemImageCandidates(name: string): string[] {
  const known = MENU_IMAGE_EXT[name];
  if (known) return [menuImagePath(name, known)];
  return MENU_IMAGE_EXTENSIONS.map((ext) => menuImagePath(name, ext));
}

/** Primary local menu photo path from dish name. */
export function getMenuItemImageSrc(name: string): string {
  return getMenuItemImageCandidates(name)[0];
}

export function withMenuItemImage<T extends Pick<MenuItem, "name" | "image">>(
  item: T
): T {
  return {
    ...item,
    image: getMenuItemImageSrc(item.name),
  };
}

export function resolveMenuItemImages(items: MenuItem[]): MenuItem[] {
  return items.map(withMenuItemImage);
}

import type { MockPreorderHistory } from "./profile-mock";

export function buildPreorderQrValue(preorder: MockPreorderHistory): string {
  return `order:${preorder.id}:restaurant:${preorder.restaurantId}:total:${preorder.total}`;
}

export function getPreorderItems(preorder: MockPreorderHistory): string[] {
  return preorder.dishesLabel
    .split(" · ")
    .map((item) => item.trim())
    .filter(Boolean);
}

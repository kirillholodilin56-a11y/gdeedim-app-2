import type { PeopleCount } from "./preorder";

export type TableStatus = "available" | "occupied";

export interface RestaurantTable {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
  label?: string;
  /** Position on floor plan, percent 0–100 */
  x: number;
  y: number;
  size?: "sm" | "md" | "lg";
}

export interface RestaurantTablePlan {
  restaurantId: string;
  tables: RestaurantTable[];
}

export interface SelectedTable {
  tableId: string;
  number: number;
  seats: number;
  label?: string;
  autoAssigned?: boolean;
}

const TABLE_PLANS: RestaurantTablePlan[] = [
  {
    restaurantId: "dodo-pizza",
    tables: [
      { id: "dd-t1", number: 1, seats: 2, status: "available", x: 18, y: 22 },
      { id: "dd-t2", number: 2, seats: 2, status: "occupied", x: 50, y: 22 },
      { id: "dd-t3", number: 3, seats: 4, status: "available", x: 82, y: 22, size: "md" },
      { id: "dd-t4", number: 4, seats: 4, status: "available", x: 18, y: 58, size: "md" },
      { id: "dd-t5", number: 5, seats: 6, status: "occupied", x: 50, y: 58, size: "lg" },
      { id: "dd-t6", number: 6, seats: 2, status: "available", x: 82, y: 58 },
      { id: "dd-t7", number: 7, seats: 4, status: "available", x: 34, y: 82, size: "md" },
      { id: "dd-t8", number: 8, seats: 2, status: "available", x: 66, y: 82 },
    ],
  },
  {
    restaurantId: "kintsugi",
    tables: [
      { id: "ki-t1", number: 1, seats: 2, status: "available", label: "тихий", x: 22, y: 28 },
      { id: "ki-t2", number: 2, seats: 2, status: "occupied", label: "бар", x: 78, y: 28 },
      { id: "ki-t3", number: 3, seats: 2, status: "available", label: "у окна", x: 50, y: 20 },
      { id: "ki-t4", number: 4, seats: 4, status: "available", x: 30, y: 62, size: "md" },
      { id: "ki-t5", number: 5, seats: 4, status: "occupied", x: 70, y: 62, size: "md" },
      { id: "ki-t6", number: 6, seats: 2, status: "available", x: 50, y: 78 },
      { id: "ki-t7", number: 7, seats: 6, status: "available", label: "VIP", x: 50, y: 48, size: "lg" },
    ],
  },
  {
    restaurantId: "sibagro-gurme",
    tables: [
      { id: "sg-t1", number: 1, seats: 4, status: "available", x: 20, y: 25, size: "lg" },
      { id: "sg-t2", number: 2, seats: 4, status: "occupied", x: 55, y: 25, size: "lg" },
      { id: "sg-t3", number: 3, seats: 6, status: "available", x: 80, y: 25, size: "lg" },
      { id: "sg-t4", number: 4, seats: 4, status: "available", x: 20, y: 65, size: "lg" },
      { id: "sg-t5", number: 5, seats: 6, status: "available", x: 50, y: 65, size: "lg" },
      { id: "sg-t6", number: 6, seats: 4, status: "occupied", x: 80, y: 65, size: "lg" },
      { id: "sg-t7", number: 7, seats: 8, status: "available", label: "компания", x: 50, y: 88, size: "lg" },
    ],
  },
  {
    restaurantId: "snegiri",
    tables: [
      { id: "sn-t1", number: 1, seats: 2, status: "available", label: "у окна", x: 15, y: 30 },
      { id: "sn-t2", number: 2, seats: 2, status: "available", x: 38, y: 25 },
      { id: "sn-t3", number: 3, seats: 2, status: "occupied", x: 62, y: 30 },
      { id: "sn-t4", number: 4, seats: 4, status: "available", x: 85, y: 28, size: "md" },
      { id: "sn-t5", number: 5, seats: 2, status: "available", label: "тихий", x: 28, y: 68 },
      { id: "sn-t6", number: 6, seats: 4, status: "available", x: 55, y: 72, size: "md" },
      { id: "sn-t7", number: 7, seats: 2, status: "occupied", x: 78, y: 68 },
      { id: "sn-t8", number: 8, seats: 2, status: "available", x: 50, y: 48 },
    ],
  },
  {
    restaurantId: "pho-tigers",
    tables: [
      { id: "pt-t1", number: 1, seats: 2, status: "available", x: 25, y: 20 },
      { id: "pt-t2", number: 2, seats: 2, status: "occupied", x: 25, y: 45 },
      { id: "pt-t3", number: 3, seats: 2, status: "available", x: 25, y: 70 },
      { id: "pt-t4", number: 4, seats: 4, status: "available", x: 55, y: 30, size: "md" },
      { id: "pt-t5", number: 5, seats: 4, status: "occupied", x: 55, y: 60, size: "md" },
      { id: "pt-t6", number: 6, seats: 2, status: "available", x: 80, y: 25 },
      { id: "pt-t7", number: 7, seats: 2, status: "available", x: 80, y: 55 },
      { id: "pt-t8", number: 8, seats: 4, status: "available", x: 80, y: 78, size: "md" },
    ],
  },
  {
    restaurantId: "panda",
    tables: [
      { id: "pd-t1", number: 1, seats: 4, status: "available", x: 22, y: 28, size: "md" },
      { id: "pd-t2", number: 2, seats: 6, status: "available", label: "семейный", x: 55, y: 22, size: "lg" },
      { id: "pd-t3", number: 3, seats: 4, status: "occupied", x: 78, y: 28, size: "md" },
      { id: "pd-t4", number: 4, seats: 6, status: "available", label: "группа", x: 22, y: 62, size: "lg" },
      { id: "pd-t5", number: 5, seats: 4, status: "available", x: 55, y: 58, size: "md" },
      { id: "pd-t6", number: 6, seats: 8, status: "occupied", label: "большой", x: 78, y: 62, size: "lg" },
      { id: "pd-t7", number: 7, seats: 4, status: "available", x: 40, y: 82, size: "md" },
      { id: "pd-t8", number: 8, seats: 6, status: "available", x: 68, y: 82, size: "lg" },
    ],
  },
  {
    restaurantId: "territoriya-kofe",
    tables: [
      { id: "tk-t1", number: 1, seats: 2, status: "available", label: "у окна", x: 12, y: 35 },
      { id: "tk-t2", number: 2, seats: 2, status: "occupied", label: "у окна", x: 12, y: 65 },
      { id: "tk-t3", number: 3, seats: 2, status: "available", x: 38, y: 40 },
      { id: "tk-t4", number: 4, seats: 2, status: "available", x: 62, y: 40 },
      { id: "tk-t5", number: 5, seats: 2, status: "occupied", x: 88, y: 35 },
      { id: "tk-t6", number: 6, seats: 2, status: "available", label: "бар", x: 88, y: 65 },
      { id: "tk-t7", number: 7, seats: 2, status: "available", x: 50, y: 72 },
    ],
  },
  {
    restaurantId: "surf-coffee-lamp",
    tables: [
      { id: "sc-t1", number: 1, seats: 2, status: "available", label: "у окна", x: 18, y: 32 },
      { id: "sc-t2", number: 2, seats: 2, status: "available", label: "у окна", x: 18, y: 62 },
      { id: "sc-t3", number: 3, seats: 2, status: "occupied", x: 50, y: 28 },
      { id: "sc-t4", number: 4, seats: 2, status: "available", x: 50, y: 55 },
      { id: "sc-t5", number: 5, seats: 2, status: "available", label: "тихий", x: 82, y: 35 },
      { id: "sc-t6", number: 6, seats: 2, status: "occupied", label: "бар", x: 82, y: 62 },
      { id: "sc-t7", number: 7, seats: 2, status: "available", x: 50, y: 78 },
    ],
  },
];

export function getTablePlan(
  restaurantId: string
): RestaurantTablePlan | null {
  return TABLE_PLANS.find((p) => p.restaurantId === restaurantId) ?? null;
}

export function hasTablePlan(restaurantId: string): boolean {
  return getTablePlan(restaurantId) !== null;
}

export function minSeatsForPeople(peopleCount: PeopleCount): number {
  if (peopleCount === "4+") return 4;
  return parseInt(peopleCount, 10);
}

export function isTableSelectable(
  table: RestaurantTable,
  peopleCount: PeopleCount
): boolean {
  if (table.status === "occupied") return false;
  return table.seats >= minSeatsForPeople(peopleCount);
}

export function hasSelectableTablesForParty(
  plan: RestaurantTablePlan,
  peopleCount: PeopleCount
): boolean {
  return plan.tables.some((table) => isTableSelectable(table, peopleCount));
}

export function tableToSelection(table: RestaurantTable): SelectedTable {
  return {
    tableId: table.id,
    number: table.number,
    seats: table.seats,
    label: table.label,
  };
}

export const AUTO_ASSIGNED_TABLE: SelectedTable = {
  tableId: "auto",
  number: 0,
  seats: 0,
  autoAssigned: true,
};

export function formatTableSummary(table: SelectedTable | null): string {
  if (!table || table.autoAssigned) {
    return "Столик подберёт администратор";
  }
  const parts: string[] = [`Столик №${table.number}`];
  if (table.label) parts.push(table.label);
  parts.push(
    `${table.seats} ${table.seats === 1 ? "место" : table.seats < 5 ? "места" : "мест"}`
  );
  return parts.join(" · ");
}

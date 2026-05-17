"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "@/lib/types";
import {
  getCartItemCount,
  getCartTotal,
  menuItemToLine,
  type PeopleCount,
  type PreorderLine,
  type VisitTime,
} from "@/lib/preorder";
import {
  AUTO_ASSIGNED_TABLE,
  hasTablePlan,
  type SelectedTable,
} from "@/lib/table-plans";

export type PreorderFlowStep = "idle" | "time" | "table" | "confirm";

interface PreorderContextValue {
  restaurantId: string | null;
  restaurantName: string | null;
  lines: PreorderLine[];
  visitTime: VisitTime | null;
  peopleCount: PeopleCount | null;
  selectedTable: SelectedTable | null;
  flowStep: PreorderFlowStep;
  itemCount: number;
  total: number;
  isSheetExpanded: boolean;
  addItem: (restaurantId: string, restaurantName: string, item: MenuItem) => void;
  addOne: (menuItemId: string) => void;
  removeOne: (menuItemId: string) => void;
  clearCart: () => void;
  setSheetExpanded: (expanded: boolean) => void;
  startCheckout: () => void;
  setVisitTime: (time: VisitTime) => void;
  setPeopleCount: (count: PeopleCount) => void;
  setSelectedTable: (table: SelectedTable | null) => void;
  proceedToTableSelection: () => void;
  confirmWithoutTable: () => void;
  proceedToConfirm: () => void;
  completePreorder: () => void;
  closeFlow: () => void;
  hasCartForRestaurant: (restaurantId: string) => boolean;
}

const PreorderContext = createContext<PreorderContextValue | null>(null);

export function PreorderProvider({ children }: { children: ReactNode }) {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [lines, setLines] = useState<PreorderLine[]>([]);
  const [visitTime, setVisitTimeState] = useState<VisitTime | null>(null);
  const [peopleCount, setPeopleCountState] = useState<PeopleCount | null>(null);
  const [selectedTable, setSelectedTable] = useState<SelectedTable | null>(null);
  const [flowStep, setFlowStep] = useState<PreorderFlowStep>("idle");
  const [isSheetExpanded, setSheetExpanded] = useState(false);
  const restaurantIdRef = useRef<string | null>(null);

  const itemCount = useMemo(() => getCartItemCount(lines), [lines]);
  const total = useMemo(() => getCartTotal(lines), [lines]);

  const addItem = useCallback(
    (rid: string, rname: string, item: MenuItem) => {
      if (!item.isAvailable) return;

      const switchedVenue =
        restaurantIdRef.current !== null &&
        restaurantIdRef.current !== rid;

      restaurantIdRef.current = rid;
      setRestaurantId(rid);
      setRestaurantName(rname);

      setLines((prev) => {
        const base = switchedVenue ? [] : prev;
        const existing = base.find((l) => l.menuItemId === item.id);
        if (existing) {
          return base.map((l) =>
            l.menuItemId === item.id
              ? { ...l, quantity: l.quantity + 1 }
              : l
          );
        }
        return [...base, { ...menuItemToLine(item), quantity: 1 }];
      });
    },
    []
  );

  const addOne = useCallback((menuItemId: string) => {
    setLines((prev) =>
      prev.map((l) =>
        l.menuItemId === menuItemId
          ? { ...l, quantity: l.quantity + 1 }
          : l
      )
    );
  }, []);

  const removeOne = useCallback((menuItemId: string) => {
    setLines((prev) => {
      const line = prev.find((l) => l.menuItemId === menuItemId);
      if (!line) return prev;
      if (line.quantity <= 1) {
        const next = prev.filter((l) => l.menuItemId !== menuItemId);
        if (next.length === 0) {
          restaurantIdRef.current = null;
          setRestaurantId(null);
          setRestaurantName(null);
          setSheetExpanded(false);
        }
        return next;
      }
      return prev.map((l) =>
        l.menuItemId === menuItemId
          ? { ...l, quantity: l.quantity - 1 }
          : l
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    restaurantIdRef.current = null;
    setLines([]);
    setRestaurantId(null);
    setRestaurantName(null);
    setVisitTimeState(null);
    setPeopleCountState(null);
    setSelectedTable(null);
    setFlowStep("idle");
    setSheetExpanded(false);
  }, []);

  const startCheckout = useCallback(() => {
    if (lines.length === 0) return;
    setVisitTimeState(null);
    setPeopleCountState(null);
    setSelectedTable(null);
    setFlowStep("time");
    setSheetExpanded(false);
  }, [lines.length]);

  const setVisitTime = useCallback((time: VisitTime) => {
    setVisitTimeState(time);
  }, []);

  const setPeopleCount = useCallback((count: PeopleCount) => {
    setPeopleCountState(count);
  }, []);

  const proceedToTableSelection = useCallback(() => {
    if (!visitTime || !peopleCount || lines.length === 0) return;
    setSelectedTable(null);
    setFlowStep("table");
  }, [visitTime, peopleCount, lines.length]);

  const confirmWithoutTable = useCallback(() => {
    if (!visitTime || !peopleCount || lines.length === 0) return;
    setSelectedTable(AUTO_ASSIGNED_TABLE);
    setFlowStep("confirm");
  }, [visitTime, peopleCount, lines.length]);

  const proceedToConfirm = useCallback(() => {
    if (!visitTime || !peopleCount || lines.length === 0) return;
    const onTableStep = restaurantId && hasTablePlan(restaurantId);
    if (onTableStep) {
      if (!selectedTable || selectedTable.autoAssigned) return;
    } else if (!selectedTable) {
      setSelectedTable(AUTO_ASSIGNED_TABLE);
    }
    setFlowStep("confirm");
  }, [visitTime, peopleCount, lines.length, restaurantId, selectedTable]);

  const completePreorder = useCallback(() => {
    clearCart();
  }, [clearCart]);

  const closeFlow = useCallback(() => {
    setFlowStep("idle");
    setVisitTimeState(null);
    setPeopleCountState(null);
    setSelectedTable(null);
  }, []);

  const hasCartForRestaurant = useCallback(
    (rid: string) => restaurantId === rid && lines.length > 0,
    [restaurantId, lines.length]
  );

  const value = useMemo<PreorderContextValue>(
    () => ({
      restaurantId,
      restaurantName,
      lines,
      visitTime,
      peopleCount,
      selectedTable,
      flowStep,
      itemCount,
      total,
      isSheetExpanded,
      addItem,
      addOne,
      removeOne,
      clearCart,
      setSheetExpanded,
      startCheckout,
      setVisitTime,
      setPeopleCount,
      setSelectedTable,
      proceedToTableSelection,
      confirmWithoutTable,
      proceedToConfirm,
      completePreorder,
      closeFlow,
      hasCartForRestaurant,
    }),
    [
      restaurantId,
      restaurantName,
      lines,
      visitTime,
      peopleCount,
      selectedTable,
      flowStep,
      itemCount,
      total,
      isSheetExpanded,
      addItem,
      addOne,
      removeOne,
      clearCart,
      startCheckout,
      setVisitTime,
      setPeopleCount,
      proceedToTableSelection,
      confirmWithoutTable,
      proceedToConfirm,
      completePreorder,
      closeFlow,
      hasCartForRestaurant,
    ]
  );

  return (
    <PreorderContext.Provider value={value}>
      {children}
    </PreorderContext.Provider>
  );
}

export function usePreorder() {
  const ctx = useContext(PreorderContext);
  if (!ctx) {
    throw new Error("usePreorder must be used within PreorderProvider");
  }
  return ctx;
}

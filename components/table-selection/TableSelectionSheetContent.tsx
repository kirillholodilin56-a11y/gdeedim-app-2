"use client";

import type { ReactNode } from "react";
import type { PeopleCount } from "@/lib/preorder";
import {
  AUTO_ASSIGNED_TABLE,
  getSelectableTables,
  getTablePlan,
  hasSelectableTablesForParty,
  hasTablePlan,
  type SelectedTable,
} from "@/lib/table-plans";
import { NoTablePlanFallback } from "./NoTablePlanFallback";
import { NoTablesEmptyState } from "./NoTablesEmptyState";
import { TableFloorPlan } from "./TableFloorPlan";
import { TableSelectionBackButton } from "./TableSelectionBackButton";

export interface TableSelectionSheetContentProps {
  restaurantId: string;
  peopleCount: PeopleCount | null;
  selectedTable: SelectedTable | null;
  onSelectTable: (table: SelectedTable | null) => void;
  onBack: () => void;
  onChangeTime: () => void;
  onContinueWithoutTable: () => void;
  continueWithoutTableLabel?: string;
  /** Shown below content when tables are available (e.g. total + confirm). */
  footer?: ReactNode;
}

export function TableSelectionSheetContent({
  restaurantId,
  peopleCount,
  selectedTable,
  onSelectTable,
  onBack,
  onChangeTime,
  onContinueWithoutTable,
  continueWithoutTableLabel,
  footer,
}: TableSelectionSheetContentProps) {
  const plan = getTablePlan(restaurantId);
  const showFloorPlan = hasTablePlan(restaurantId);
  const selectableTables =
    plan && peopleCount ? getSelectableTables(plan, peopleCount) : [];
  const noSuitableTables =
    showFloorPlan &&
    peopleCount !== null &&
    (!plan || !hasSelectableTablesForParty(plan, peopleCount));

  return (
    <>
      <TableSelectionBackButton onClick={onBack} />

      {noSuitableTables ? (
        <NoTablesEmptyState
          onChangeTime={onChangeTime}
          onContinueWithoutTable={onContinueWithoutTable}
          continueLabel={continueWithoutTableLabel}
        />
      ) : (
        <>
          <h2 className="text-xl font-semibold tracking-tight">
            Выберите столик
          </h2>
          <p className="mt-1 text-sm text-muted">
            Покажем свободные места на выбранное время.
          </p>

          {showFloorPlan && peopleCount && selectableTables.length > 0 ? (
            <TableFloorPlan
              tables={selectableTables}
              selectedTable={selectedTable}
              onSelectTable={onSelectTable}
            />
          ) : (
            <NoTablePlanFallback
              selectedTable={selectedTable}
              onSelectAutoAssign={() => onSelectTable(AUTO_ASSIGNED_TABLE)}
            />
          )}
        </>
      )}

      {footer}
    </>
  );
}

export function useTableSelectionState(
  restaurantId: string,
  peopleCount: PeopleCount | null,
  selectedTable: SelectedTable | null
) {
  const plan = getTablePlan(restaurantId);
  const showFloorPlan = hasTablePlan(restaurantId);
  const noSuitableTables =
    showFloorPlan &&
    peopleCount !== null &&
    (!plan || !hasSelectableTablesForParty(plan, peopleCount));

  const canConfirmWithTable =
    !noSuitableTables &&
    (showFloorPlan
      ? selectedTable !== null &&
        !selectedTable.autoAssigned &&
        Boolean(selectedTable.tableId)
      : selectedTable?.autoAssigned === true);

  return { noSuitableTables, canConfirmWithTable, showFloorPlan };
}

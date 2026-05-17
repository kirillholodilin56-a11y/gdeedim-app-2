"use client";

import { useCallback, useEffect, useState } from "react";
import type { PeopleCount, VisitTime } from "@/lib/preorder";
import {
  AUTO_ASSIGNED_TABLE,
  type SelectedTable,
} from "@/lib/table-plans";
import { BookingConfirmSheet } from "./BookingConfirmSheet";
import { BookingTableSheet } from "./BookingTableSheet";
import { BookingTimeSheet } from "./BookingTimeSheet";

type BookingStep = "time" | "table" | "confirm";

interface TableBookingFlowProps {
  restaurantId: string;
  restaurantName: string;
  open: boolean;
  onClose: () => void;
}

export function TableBookingFlow({
  restaurantId,
  restaurantName,
  open,
  onClose,
}: TableBookingFlowProps) {
  const [step, setStep] = useState<BookingStep>("time");
  const [visitTime, setVisitTime] = useState<VisitTime | null>(null);
  const [peopleCount, setPeopleCount] = useState<PeopleCount | null>(null);
  const [selectedTable, setSelectedTable] = useState<SelectedTable | null>(null);

  const reset = useCallback(() => {
    setStep("time");
    setVisitTime(null);
    setPeopleCount(null);
    setSelectedTable(null);
  }, []);

  useEffect(() => {
    if (open) reset();
  }, [open, restaurantId, reset]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const confirmWithoutTable = () => {
    if (!visitTime || !peopleCount) return;
    setSelectedTable(AUTO_ASSIGNED_TABLE);
    setStep("confirm");
  };

  const goToTableSelection = () => {
    if (!visitTime || !peopleCount) return;
    setSelectedTable(null);
    setStep("table");
  };

  const confirmWithTable = () => {
    if (!visitTime || !peopleCount) return;
    setStep("confirm");
  };

  return (
    <>
      <BookingTimeSheet
        open={open && step === "time"}
        restaurantId={restaurantId}
        visitTime={visitTime}
        peopleCount={peopleCount}
        onVisitTimeChange={setVisitTime}
        onPeopleCountChange={setPeopleCount}
        onConfirm={confirmWithoutTable}
        onChooseTable={goToTableSelection}
        onClose={handleClose}
      />
      <BookingTableSheet
        open={open && step === "table"}
        restaurantId={restaurantId}
        peopleCount={peopleCount}
        selectedTable={selectedTable}
        onSelectTable={setSelectedTable}
        onConfirm={confirmWithTable}
        onClose={handleClose}
      />
      <BookingConfirmSheet
        open={open && step === "confirm"}
        restaurantName={restaurantName}
        visitTime={visitTime}
        peopleCount={peopleCount}
        selectedTable={selectedTable}
        onDone={handleClose}
      />
    </>
  );
}

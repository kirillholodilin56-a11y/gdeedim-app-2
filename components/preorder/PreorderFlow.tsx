"use client";

import { usePreorder } from "@/context/PreorderContext";
import { ConfirmationModal } from "./ConfirmationModal";
import { TableSelectionModal } from "./TableSelectionModal";
import { TimeSelectionModal } from "./TimeSelectionModal";

export function PreorderFlow() {
  const { flowStep } = usePreorder();

  return (
    <>
      <TimeSelectionModal open={flowStep === "time"} />
      <TableSelectionModal open={flowStep === "table"} />
      <ConfirmationModal open={flowStep === "confirm"} />
    </>
  );
}

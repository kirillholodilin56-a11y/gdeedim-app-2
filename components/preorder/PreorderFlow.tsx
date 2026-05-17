"use client";

import { usePreorder } from "@/context/PreorderContext";
import { ConfirmationModal } from "./ConfirmationModal";
import { TimeSelectionModal } from "./TimeSelectionModal";

export function PreorderFlow() {
  const { flowStep } = usePreorder();

  return (
    <>
      <TimeSelectionModal open={flowStep === "time"} />
      <ConfirmationModal open={flowStep === "confirm"} />
    </>
  );
}

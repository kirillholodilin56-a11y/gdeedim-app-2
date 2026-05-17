"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface BottomSheetShellProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
}

export function BottomSheetShell({
  open,
  onClose,
  children,
  zIndex = 60,
}: BottomSheetShellProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div
            className="mobile-fixed-shell bottom-0 safe-bottom"
            style={{ zIndex: zIndex + 10 }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function SheetHandle() {
  return (
    <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted/25" />
  );
}

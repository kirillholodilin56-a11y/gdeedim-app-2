"use client";

import { AnimatePresence, motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { PriceLabel } from "@/components/ui/PriceLabel";
import { useWakeLock } from "@/hooks/useWakeLock";
import {
  buildPreorderQrValue,
  getPreorderItems,
} from "@/lib/preorder-qr";
import type { MockPreorderHistory } from "@/lib/profile-mock";

interface PreorderQrModalProps {
  open: boolean;
  preorder: MockPreorderHistory | null;
  onClose: () => void;
}

export function PreorderQrModal({
  open,
  preorder,
  onClose,
}: PreorderQrModalProps) {
  useWakeLock(open);

  const items = preorder ? getPreorderItems(preorder) : [];
  const qrValue = preorder ? buildPreorderQrValue(preorder) : "";

  return (
    <AnimatePresence>
      {open && preorder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-white"
        >
          <div className="mx-auto flex h-full w-full max-w-[430px] flex-col px-5 pb-8 pt-12 safe-bottom">
            <div className="flex items-start justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-lg text-charcoal"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center text-center">
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-charcoal">
                Покажите QR-код на кассе
              </h2>

              <p className="mt-3 text-base font-semibold text-charcoal">
                {preorder.restaurantName}
              </p>

              <ul className="mt-4 w-full space-y-2 text-left">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-cream px-4 py-3 text-sm text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex w-full items-center justify-between rounded-2xl bg-cream px-4 py-3">
                <span className="text-sm text-muted">Итого</span>
                <PriceLabel amount={preorder.total} className="text-base font-semibold" />
              </div>

              <div className="mt-8 flex flex-1 items-center justify-center">
                <QRCodeCanvas value={qrValue} size={200} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

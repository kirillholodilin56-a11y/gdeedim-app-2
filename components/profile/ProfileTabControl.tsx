"use client";

import { motion } from "framer-motion";
import type { ProfileTabId } from "@/lib/profile-mock";

const TABS: { id: ProfileTabId; label: string }[] = [
  { id: "bookings", label: "Брони" },
  { id: "preorders", label: "Предзаказы" },
  { id: "discounts", label: "Скидки" },
];

interface ProfileTabControlProps {
  active: ProfileTabId;
  onChange: (tab: ProfileTabId) => void;
}

export function ProfileTabControl({ active, onChange }: ProfileTabControlProps) {
  return (
    <motion.div
      layout
      className="flex rounded-2xl bg-white p-1 shadow-card"
      role="tablist"
      aria-label="Разделы профиля"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className="relative flex-1 rounded-xl py-2.5 text-xs font-semibold transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="profile-tab-pill"
                className="absolute inset-0 rounded-xl bg-charcoal shadow-soft"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 ${
                isActive ? "text-white" : "text-muted"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

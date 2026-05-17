"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";
import { FavoriteVenuesSection } from "@/components/profile/FavoriteVenuesSection";
import { ProfileHistoryPanel } from "@/components/profile/ProfileHistoryPanel";
import { ProfileTabControl } from "@/components/profile/ProfileTabControl";
import {
  mockBookings,
  mockDiscountHistory,
  mockPreorderHistory,
  PROFILE_USER,
  type ProfileTabId,
} from "@/lib/profile-mock";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabId>("bookings");

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-4">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Профиль
        </motion.h1>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="mx-5 rounded-3xl bg-white p-4 shadow-card"
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft to-accent text-lg font-semibold text-white shadow-glow"
            aria-hidden
          >
            {PROFILE_USER.name.charAt(0)}
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold tracking-tight">
              {PROFILE_USER.name}
            </p>
            <p className="text-sm text-muted">{PROFILE_USER.city}</p>
            <p className="mt-1 text-xs text-muted">{PROFILE_USER.subtitle}</p>
          </div>
        </div>
      </motion.section>

      <div className="mt-6 px-5">
        <ProfileTabControl active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-4 px-5 pb-6">
        <ProfileHistoryPanel
          tab={activeTab}
          bookings={mockBookings}
          preorders={mockPreorderHistory}
          discounts={mockDiscountHistory}
        />
      </div>

      <div className="px-5 pb-8">
        <FavoriteVenuesSection />
      </div>
    </MobileShell>
  );
}

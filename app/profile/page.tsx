"use client";

import { motion } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";

const menuItems = [
  { label: "Мои брони", icon: "📅" },
  { label: "Предзаказы", icon: "🍽" },
  { label: "Избранное", icon: "♡" },
  { label: "Уведомления", icon: "🔔" },
  { label: "Настройки", icon: "⚙" },
];

export default function ProfilePage() {
  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-soft to-accent text-2xl text-white shadow-glow">
            К
          </div>
          <div>
            <h1 className="text-xl font-semibold">Кирилл</h1>
            <p className="text-sm text-muted">Москва · Премиум</p>
          </div>
        </motion.div>
      </header>

      <motion.div className="mx-5 mb-6 grid grid-cols-3 gap-3">
        {[
          { value: "3", label: "брони" },
          { value: "2", label: "предзаказа" },
          { value: "12", label: "избранных" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl py-4 text-center"
          >
            <p className="text-xl font-semibold">{stat.value}</p>
            <p className="text-[10px] text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <nav className="px-5 space-y-2 pb-4">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 shadow-card text-left"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronIcon />
          </motion.button>
        ))}
      </nav>
    </MobileShell>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="#9A948E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

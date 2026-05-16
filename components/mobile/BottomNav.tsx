"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { href: "/home", label: "Главная", icon: HomeIcon },
  { href: "/restaurants", label: "Заведения", icon: PlacesIcon },
  { href: "/discounts", label: "Скидки", icon: DiscountIcon },
  { href: "/profile", label: "Профиль", icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 safe-bottom px-4 pb-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass flex items-center justify-around rounded-3xl px-2 py-2 shadow-soft"
      >
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href === "/restaurants" &&
              pathname.startsWith("/restaurants")) ||
            (tab.href === "/discounts" &&
              (pathname === "/discounts" || pathname === "/menu"));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-1 rounded-2xl bg-white/80 shadow-card"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <Icon active={isActive} />
              </span>
              <span
                className={`relative z-10 text-[10px] font-medium tracking-tight ${
                  isActive ? "text-charcoal" : "text-muted"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
        stroke={active ? "#1C1B1A" : "#9A948E"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlacesIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
        stroke={active ? "#1C1B1A" : "#9A948E"}
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" fill={active ? "#1C1B1A" : "#9A948E"} />
    </svg>
  );
}

function DiscountIcon({ active }: { active: boolean }) {
  const stroke = active ? "#1C1B1A" : "#9A948E";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 9l2-4h12l2 4M4 9h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V9z"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="14" r="2.5" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M13 12h6M13 16h4"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={active ? "#1C1B1A" : "#9A948E"}
        strokeWidth="1.8"
      />
      <path
        d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
        stroke={active ? "#1C1B1A" : "#9A948E"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

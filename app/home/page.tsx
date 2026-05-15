"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { LiveBadge } from "@/components/ui/LiveBadge";
import {
  antiWasteDeals,
  categories,
  liveUpdates,
  restaurants,
} from "@/lib/mock-data";

export default function HomePage() {
  const nearby = restaurants.slice(0, 3);
  const recommended = restaurants.slice(2, 5);

  return (
    <MobileShell>
      <header className="sticky top-0 z-20 px-5 pb-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-4 shadow-soft"
        >
          <p className="text-xs text-muted">Добрый вечер</p>
          <h1 className="mt-0.5 text-xl font-semibold tracking-tight">
            Куда сегодня?
          </h1>
          <Link
            href="/restaurants"
            className="mt-3 flex items-center gap-2 rounded-2xl bg-white/60 px-4 py-3"
          >
            <SearchIcon />
            <span className="text-sm text-muted">Найти заведение или блюдо</span>
          </Link>
        </motion.div>
      </header>

      <div className="space-y-8 px-5">
        <section>
          <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium ${
                  i === 0
                    ? "bg-charcoal text-white"
                    : "glass text-charcoal"
                }`}
              >
                <span className="text-xs opacity-70">{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Рядом" actionHref="/restaurants" action="Все" />
          <div className="mt-3 space-y-3">
            {nearby.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} compact />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <SectionHeader title="Обновления меню" />
            <LiveBadge size="md" />
          </div>
          <div className="mt-3 space-y-2">
            {liveUpdates.slice(0, 3).map((update, i) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass flex items-center gap-3 rounded-2xl p-3"
              >
                <UpdateIcon type={update.type} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{update.restaurantName}</p>
                  <p className="truncate text-xs text-muted">{update.message}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted">{update.time}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Антифуд-вейст" />
          <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar -mx-5 px-5">
            {antiWasteDeals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="min-w-[160px] shrink-0 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-soft/30 p-4"
              >
                <span className="text-lg font-bold text-accent">{deal.discount}</span>
                <p className="mt-1 text-sm font-semibold">{deal.title}</p>
                <p className="text-xs text-muted">{deal.venue}</p>
                <p className="mt-2 text-[10px] font-medium text-muted">{deal.until}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="pb-4">
          <SectionHeader title="Рекомендуем" />
          <div className="mt-3 -mx-5 flex gap-3 overflow-x-auto hide-scrollbar px-5">
            {recommended.map((r, i) => (
              <div key={r.id} className="w-[260px] shrink-0">
                <RestaurantCard restaurant={r} index={i} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}

function SectionHeader({
  title,
  action,
  actionHref,
}: {
  title: string;
  action?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {action && actionHref && (
        <Link href={actionHref} className="text-sm font-medium text-accent">
          {action}
        </Link>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="11" cy="11" r="7" stroke="#9A948E" strokeWidth="1.8" />
      <path d="M20 20l-3-3" stroke="#9A948E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UpdateIcon({ type }: { type: "menu" | "stop" | "discount" }) {
  const colors = {
    menu: "bg-sage/15 text-sage",
    stop: "bg-muted/15 text-muted",
    discount: "bg-accent/15 text-accent",
  };
  const icons = { menu: "↻", stop: "⊘", discount: "%" };
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${colors[type]}`}
    >
      {icons[type]}
    </span>
  );
}

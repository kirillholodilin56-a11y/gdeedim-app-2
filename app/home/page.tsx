"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { LiveBadge } from "@/components/ui/LiveBadge";
import {
  antiWasteDeals,
  categories,
  liveUpdates,
  restaurants,
} from "@/lib/mock-data";
import {
  filterRestaurantsByCategory,
  searchMenuItems,
  searchRestaurants,
} from "@/lib/search";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("1");

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;
  const hasCategoryFilter = activeCategory !== "1";

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;
    result = filterRestaurantsByCategory(result, activeCategory);
    result = searchRestaurants(trimmedQuery, result);
    return result;
  }, [trimmedQuery, activeCategory]);

  const menuResults = useMemo(
    () => (isSearching ? searchMenuItems(trimmedQuery).slice(0, 8) : []),
    [trimmedQuery, isSearching]
  );

  const hasActiveFilter = isSearching || hasCategoryFilter;
  const showEmptyState =
    hasActiveFilter &&
    filteredRestaurants.length === 0 &&
    menuResults.length === 0;

  const nearby = hasActiveFilter
    ? filteredRestaurants.slice(0, 5)
    : restaurants.slice(0, 3);

  const recommended = hasActiveFilter
    ? filteredRestaurants
    : restaurants.slice(2, 5);

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
          <div className="relative mt-3">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти заведение или блюдо"
              className="w-full rounded-2xl bg-white/60 py-3 pl-11 pr-10 text-sm text-charcoal outline-none placeholder:text-muted focus:bg-white/80 focus:ring-2 focus:ring-accent/20"
              aria-label="Поиск заведения или блюда"
            />
            <AnimatePresence>
              {isSearching && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/10 text-sm text-muted hover:bg-charcoal/15"
                  aria-label="Очистить поиск"
                >
                  ×
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </header>

      <div className="space-y-8 px-5">
        <section>
          <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
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

        <AnimatePresence mode="wait">
          {showEmptyState ? (
            <motion.section
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-3xl bg-white px-6 py-10 text-center shadow-card"
            >
              <p className="text-lg font-semibold">Ничего не нашли</p>
              <p className="mt-2 text-sm text-muted">
                Попробуйте ввести название заведения или блюда.
              </p>
            </motion.section>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {isSearching && menuResults.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold tracking-tight">
                    Найдено в меню
                  </h2>
                  <div className="mt-3 space-y-2">
                    {menuResults.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link
                          href={`/restaurants/${item.restaurantId}`}
                          className="glass flex items-center justify-between gap-3 rounded-2xl p-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {item.name}
                            </p>
                            <p className="truncate text-xs text-muted">
                              {item.restaurantName}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold">
                              {item.isDiscount && item.discountPercent
                                ? Math.round(
                                    item.price * (1 - item.discountPercent / 100)
                                  )
                                : item.price}{" "}
                              ₽
                            </p>
                            <p
                              className={`text-[10px] font-medium ${
                                item.isAvailable ? "text-sage" : "text-muted"
                              }`}
                            >
                              {item.isAvailable ? "в наличии" : "стоп-лист"}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {nearby.length > 0 && (
                <section>
                  <SectionHeader
                    title={hasActiveFilter ? "Результаты" : "Рядом"}
                    actionHref="/restaurants"
                    action="Все"
                  />
                  <div className="mt-3 space-y-3">
                    {nearby.map((r, i) => (
                      <RestaurantCard
                        key={r.id}
                        restaurant={r}
                        index={i}
                        compact
                      />
                    ))}
                  </div>
                </section>
              )}

              {!hasActiveFilter && (
                <>
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
                            <p className="truncate text-sm font-medium">
                              {update.restaurantName}
                            </p>
                            <p className="truncate text-xs text-muted">
                              {update.message}
                            </p>
                          </div>
                          <span className="shrink-0 text-[10px] text-muted">
                            {update.time}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionHeader title="Антифуд-вейст" />
                    <div className="mt-3 -mx-5 flex gap-3 overflow-x-auto hide-scrollbar px-5">
                      {antiWasteDeals.map((deal, i) => (
                        <motion.div
                          key={deal.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="min-w-[160px] shrink-0 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-soft/30 p-4"
                        >
                          <span className="text-lg font-bold text-accent">
                            {deal.discount}
                          </span>
                          <p className="mt-1 text-sm font-semibold">
                            {deal.title}
                          </p>
                          <p className="text-xs text-muted">{deal.venue}</p>
                          <p className="mt-2 text-[10px] font-medium text-muted">
                            {deal.until}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {recommended.length > 0 && !hasActiveFilter && (
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
              )}
            </motion.div>
          )}
        </AnimatePresence>
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" stroke="#9A948E" strokeWidth="1.8" />
      <path
        d="M20 20l-3-3"
        stroke="#9A948E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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

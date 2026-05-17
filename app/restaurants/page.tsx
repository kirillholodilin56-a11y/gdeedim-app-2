"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { categories, restaurants } from "@/lib/mock-data";
import { filterRestaurantsByCategory } from "@/lib/search";

export default function RestaurantsPage() {
  const [activeCategory, setActiveCategory] = useState("1");

  const filteredRestaurants = useMemo(
    () => filterRestaurantsByCategory(restaurants, activeCategory),
    [activeCategory]
  );

  const hasCategoryFilter = activeCategory !== "1";
  const showEmptyState =
    hasCategoryFilter && filteredRestaurants.length === 0;

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Заведения
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-1 text-sm text-muted"
        >
          {filteredRestaurants.length} места с живым меню
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="hide-scrollbar -mx-0 flex gap-2 overflow-x-auto px-5 py-4"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-charcoal text-white"
                : "glass text-charcoal"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 px-5 pb-4"
      >
        {showEmptyState ? (
          <div className="rounded-3xl glass px-5 py-10 text-center">
            <p className="text-sm font-medium text-charcoal">
              Ничего не найдено
            </p>
            <p className="mt-1 text-sm text-muted">
              Попробуйте выбрать другую категорию.
            </p>
          </div>
        ) : (
          filteredRestaurants.map((restaurant, i) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              index={i}
            />
          ))
        )}
      </motion.div>
    </MobileShell>
  );
}

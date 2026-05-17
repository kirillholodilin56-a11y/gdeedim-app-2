"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { restaurants } from "@/lib/mock-data";
import { favoriteRestaurantIds } from "@/lib/profile-mock";

export function FavoriteVenuesSection() {
  const favorites = favoriteRestaurantIds
    .map((id) => restaurants.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r !== undefined);

  if (favorites.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold tracking-tight">
        Любимые заведения
      </h2>
      <motion.div className="hide-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
        {favorites.map((restaurant, i) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="w-[140px] shrink-0"
          >
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="block overflow-hidden rounded-2xl bg-white shadow-card"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  sizes="140px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              </div>
              <div className="p-2.5">
                <p className="truncate text-xs font-semibold">{restaurant.name}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted">
                  {restaurant.cuisine.split(" · ")[0]}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

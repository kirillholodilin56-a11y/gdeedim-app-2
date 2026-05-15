"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Restaurant } from "@/lib/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
  compact?: boolean;
}

export function RestaurantCard({
  restaurant,
  index = 0,
  compact = false,
}: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/restaurants/${restaurant.id}`} className="block">
        <article
          className={`overflow-hidden rounded-3xl bg-white shadow-card ${
            compact ? "" : ""
          }`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="(max-width: 430px) 100vw, 430px"
            />
            <div className="absolute inset-0 gradient-hero" />
            <div className="absolute left-3 top-3 flex gap-2">
              <LiveBadge label="Меню" />
              <StatusBadge status={restaurant.liveStatus} />
            </div>
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-charcoal backdrop-blur-sm">
              {restaurant.distance}
            </span>
          </div>

          <div className={`${compact ? "p-3" : "p-4"}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-charcoal">
                  {restaurant.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted">{restaurant.cuisine}</p>
              </div>
              <span className="flex items-center gap-0.5 text-sm font-semibold">
                <StarIcon />
                {restaurant.rating}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted">
                ~{restaurant.averageCheck.toLocaleString("ru-RU")} ₽
              </span>
              <span className="text-[10px] text-muted">
                обновлено {restaurant.menuUpdatedAt}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#E86B4A">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

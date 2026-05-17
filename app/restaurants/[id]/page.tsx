"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MenuDishRow } from "@/components/preorder/MenuDishRow";
import { TableBookingFlow } from "@/components/booking/TableBookingFlow";
import { PreorderBar } from "@/components/preorder/PreorderBar";
import { PreorderFlow } from "@/components/preorder/PreorderFlow";
import { ReviewsSheet } from "@/components/reviews/ReviewsSheet";
import { usePreorder } from "@/context/PreorderContext";
import { getReviewsForRestaurant } from "@/lib/restaurant-reviews";
import {
  ALL_MENU_CATEGORY,
  filterMenuByCategory,
  getMenuCategoriesForRestaurant,
} from "@/lib/menu-categories";
import { getMenuItemsByRestaurantId, getRestaurantById } from "@/lib/mock-data";

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurant = getRestaurantById(params.id as string);
  const { hasCartForRestaurant } = usePreorder();
  const [activeCategory, setActiveCategory] = useState(ALL_MENU_CATEGORY);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const venueMenu = useMemo(
    () =>
      restaurant ? getMenuItemsByRestaurantId(restaurant.id) : [],
    [restaurant]
  );

  const menuCategories = useMemo(
    () => getMenuCategoriesForRestaurant(venueMenu),
    [venueMenu]
  );

  const filteredMenu = useMemo(
    () => filterMenuByCategory(venueMenu, activeCategory),
    [venueMenu, activeCategory]
  );

  useEffect(() => {
    setActiveCategory(ALL_MENU_CATEGORY);
  }, [restaurant?.id]);

  if (!restaurant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5">
        <p className="text-muted">Заведение не найдено</p>
        <button
          onClick={() => router.push("/restaurants")}
          className="font-medium text-accent"
        >
          Назад
        </button>
      </div>
    );
  }

  const stopListCount = venueMenu.filter((m) => !m.isAvailable).length;
  const cartVisible = hasCartForRestaurant(restaurant.id);
  const reviewSummary = getReviewsForRestaurant(
    restaurant.id,
    restaurant.rating
  );

  return (
    <div className={`min-h-screen ${cartVisible ? "pb-36" : "pb-8"}`}>
      <div className="relative h-[320px] w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="430px"
        />
        <div className="absolute inset-0 gradient-hero" />

        <button
          onClick={() => router.back()}
          className="absolute left-4 top-12 flex h-10 w-10 items-center justify-center rounded-full glass"
          aria-label="Назад"
        >
          <BackIcon />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex gap-2">
            <LiveBadge size="md" label="Меню live" />
            <StatusBadge status={restaurant.liveStatus} />
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-white">
            {restaurant.name}
          </h1>
          <p className="text-sm text-white/80">{restaurant.cuisine}</p>
          <div className="mt-2 flex gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1 font-semibold">
              ★ {restaurant.rating}
            </span>
            <span>~{restaurant.averageCheck.toLocaleString("ru-RU")} ₽</span>
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>

      <div className="relative -mt-6 rounded-t-4xl bg-cream px-5 pt-6">
        <div className="glass mb-5 flex items-center justify-between rounded-2xl p-3">
          <div>
            <p className="text-xs text-muted">Меню обновлено</p>
            <p className="text-sm font-medium">{restaurant.menuUpdatedAt}</p>
          </div>
          {stopListCount > 0 && (
            <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-muted">
              {stopListCount} в стоп-листе
            </span>
          )}
        </div>

        {restaurant.description && (
          <p className="mb-5 text-sm leading-relaxed text-muted">
            {restaurant.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setBookingOpen(true)}
            className="rounded-2xl bg-charcoal py-3.5 text-sm font-medium text-white"
          >
            Забронировать столик
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setReviewsOpen(true)}
            className="glass rounded-2xl py-3.5 text-sm font-medium text-charcoal"
          >
            Отзывы
          </motion.button>
        </div>

        <div className="mt-6 hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-charcoal text-white"
                    : "bg-white text-charcoal shadow-card"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div
          id="venue-menu"
          className="mt-5 flex scroll-mt-24 items-center justify-between"
        >
          <h2 className="text-lg font-semibold">Меню</h2>
          <span className="text-sm font-medium text-muted">
            {filteredMenu.length}{" "}
            {filteredMenu.length === 1 ? "позиция" : filteredMenu.length < 5 ? "позиции" : "позиций"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {filteredMenu.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-3 rounded-2xl bg-white px-5 py-10 text-center shadow-card"
            >
              <p className="text-sm text-muted">
                В этой категории пока нет блюд.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-3 space-y-3"
            >
              {filteredMenu.map((item, i) => (
                <MenuDishRow
                  key={item.id}
                  item={item}
                  restaurantId={restaurant.id}
                  restaurantName={restaurant.name}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PreorderBar restaurantId={restaurant.id} />
      <PreorderFlow />
      <TableBookingFlow
        restaurantId={restaurant.id}
        restaurantName={restaurant.name}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
      <ReviewsSheet
        open={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
        summary={reviewSummary}
      />
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke="#1C1B1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MenuDishRow } from "@/components/preorder/MenuDishRow";
import { PreorderBar } from "@/components/preorder/PreorderBar";
import { PreorderFlow } from "@/components/preorder/PreorderFlow";
import { usePreorder } from "@/context/PreorderContext";
import { getMenuItemsByRestaurantId, getRestaurantById } from "@/lib/mock-data";

const menuCategories = ["Все", "Закуски", "Основные", "Десерты"];

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurant = getRestaurantById(params.id as string);
  const { hasCartForRestaurant } = usePreorder();

  if (!restaurant) {
    return (
      <motion.div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5">
        <p className="text-muted">Заведение не найдено</p>
        <button
          onClick={() => router.push("/restaurants")}
          className="font-medium text-accent"
        >
          Назад
        </button>
      </motion.div>
    );
  }

  const venueMenu = getMenuItemsByRestaurantId(restaurant.id);
  const stopListCount = venueMenu.filter((m) => !m.isAvailable).length;
  const cartVisible = hasCartForRestaurant(restaurant.id);

  const scrollToMenu = () => {
    document.getElementById("venue-menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className={`min-h-screen ${cartVisible ? "pb-36" : "pb-8"}`}
    >
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
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl bg-charcoal py-3.5 text-sm font-medium text-white"
          >
            Забронировать
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={scrollToMenu}
            className="glass rounded-2xl py-3.5 text-sm font-medium text-charcoal"
          >
            Предзаказ
          </motion.button>
        </div>

        <div className="mt-6 hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {menuCategories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium ${
                i === 0
                  ? "bg-charcoal text-white"
                  : "bg-white text-charcoal shadow-card"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          id="venue-menu"
          className="mt-5 flex scroll-mt-24 items-center justify-between"
        >
          <h2 className="text-lg font-semibold">Меню</h2>
          <span className="text-sm font-medium text-muted">
            {venueMenu.length} позиций
          </span>
        </motion.div>

        <motion.div className="mt-3 space-y-3">
          {venueMenu.map((item, i) => (
            <MenuDishRow
              key={item.id}
              item={item}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
              index={i}
            />
          ))}
        </motion.div>
      </div>

      <PreorderBar restaurantId={restaurant.id} />
      <PreorderFlow />
    </motion.div>
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

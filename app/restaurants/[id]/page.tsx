"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getMenuItemsByRestaurantId, getRestaurantById } from "@/lib/mock-data";

const menuCategories = ["Закуски", "Основные", "Десерты"];

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurant = getRestaurantById(params.id as string);

  if (!restaurant) {
    return (
      <motion.div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5">
        <p className="text-muted">Заведение не найдено</p>
        <button
          onClick={() => router.push("/restaurants")}
          className="text-accent font-medium"
        >
          Назад
        </button>
      </motion.div>
    );
  }

  const venueMenu = getMenuItemsByRestaurantId(restaurant.id);
  const previewItems = venueMenu.slice(0, 4);
  const stopListCount = venueMenu.filter((m) => !m.isAvailable).length;

  return (
    <div className="min-h-screen pb-8">
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

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="rounded-2xl bg-charcoal py-3.5 text-sm font-medium text-white"
          >
            Забронировать
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="glass rounded-2xl py-3.5 text-sm font-medium text-charcoal"
          >
            Предзаказ
          </motion.button>
        </div>

        <div className="mt-6 hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {menuCategories.map((cat, i) => (
            <button
              key={cat}
              className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium ${
                i === 0 ? "bg-charcoal text-white" : "bg-white shadow-card text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div id="venue-menu" className="mt-5 flex scroll-mt-24 items-center justify-between">
          <h2 className="text-lg font-semibold">Меню</h2>
          <span className="text-sm font-medium text-muted">
            {venueMenu.length} позиций
          </span>
        </motion.div>

        <motion.div className="mt-3 space-y-3">
          {previewItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex gap-3 rounded-2xl bg-white p-3 shadow-card ${
                !item.isAvailable ? "opacity-60" : ""
              }`}
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{item.name}</p>
                  {!item.isAvailable && (
                    <span className="shrink-0 rounded-full bg-muted/15 px-2 py-0.5 text-[10px] font-medium text-muted">
                      Стоп
                    </span>
                  )}
                  {item.isDiscount && item.isAvailable && (
                    <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                      −{item.discountPercent}%
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {item.description}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {item.isDiscount && item.discountPercent ? (
                    <>
                      <span className="text-muted line-through mr-1.5 text-xs font-normal">
                        {item.price} ₽
                      </span>
                      {Math.round(
                        item.price * (1 - item.discountPercent / 100)
                      )}{" "}
                      ₽
                    </>
                  ) : (
                    <>{item.price} ₽</>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
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

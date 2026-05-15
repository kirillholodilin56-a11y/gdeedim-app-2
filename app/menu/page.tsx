"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileShell } from "@/components/mobile/MobileShell";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { featuredMenuVenue, liveUpdates, menuItems } from "@/lib/mock-data";

type Filter = "all" | "available" | "stop" | "discount";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "available", label: "В наличии" },
  { id: "stop", label: "Стоп-лист" },
  { id: "discount", label: "Скидки" },
];

export default function MenuPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = menuItems.filter((item) => {
    if (filter === "available") return item.isAvailable;
    if (filter === "stop") return !item.isAvailable;
    if (filter === "discount") return item.isDiscount;
    return true;
  });

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold tracking-tight"
            >
              Живое меню
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-1 text-sm text-muted"
            >
              {featuredMenuVenue.name} · обновлено {featuredMenuVenue.menuUpdatedAt}
            </motion.p>
          </div>
          <LiveBadge size="md" />
        </div>
      </header>

      <div className="px-5 py-3">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.id
                  ? "bg-charcoal text-white"
                  : "glass text-charcoal"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <section className="px-5 pb-3">
        <h2 className="mb-2 text-sm font-semibold text-muted">Обновления</h2>
        <div className="space-y-2">
          {liveUpdates.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass flex items-center gap-3 rounded-2xl p-3"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-live animate-pulse-soft" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">{u.restaurantName}</p>
                <p className="truncate text-sm">{u.message}</p>
              </div>
              <span className="text-[10px] text-muted">{u.time}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-4">
        <h2 className="mb-3 text-sm font-semibold text-muted">Актуальные блюда</h2>
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.03 }}
                className={`overflow-hidden rounded-3xl bg-white shadow-card ${
                  !item.isAvailable ? "opacity-75" : ""
                }`}
              >
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    {item.isAvailable ? (
                      <LiveBadge label="В наличии" />
                    ) : (
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-muted">
                        Стоп-лист
                      </span>
                    )}
                    {item.isDiscount && item.isAvailable && (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white">
                        −{item.discountPercent}%
                      </span>
                    )}
                  </div>
                  {item.updatedAt && (
                    <span className="absolute bottom-3 right-3 text-[10px] font-medium text-white/90">
                      {item.updatedAt}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-0.5 text-xs text-muted">{item.description}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {item.isDiscount && item.discountPercent && item.isAvailable ? (
                        <>
                          <span className="block text-right text-xs font-normal text-muted line-through">
                            {item.price} ₽
                          </span>
                          {Math.round(item.price * (1 - item.discountPercent / 100))} ₽
                        </>
                      ) : (
                        <>{item.price} ₽</>
                      )}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatePresence>
      </section>
    </MobileShell>
  );
}

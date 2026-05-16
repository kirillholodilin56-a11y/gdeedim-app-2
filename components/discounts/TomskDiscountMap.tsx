"use client";

import { motion } from "framer-motion";
import type { DiscountMapPin } from "@/lib/types";

interface TomskDiscountMapProps {
  pins: DiscountMapPin[];
  selectedPinId: string | null;
  onSelectPin: (pinId: string) => void;
}

export function TomskDiscountMap({
  pins,
  selectedPinId,
  onSelectPin,
}: TomskDiscountMapProps) {
  return (
    <div className="relative mx-5 overflow-hidden rounded-3xl bg-[#E8F2F8] shadow-card">
      <div className="relative aspect-[4/3] w-full">
        {/* Stylized Tomsk map — rivers & districts (mock, no API) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <rect width="400" height="300" fill="#E8F2F8" />
          <ellipse cx="200" cy="150" rx="170" ry="120" fill="#DCEAF3" opacity="0.7" />
          <path
            d="M-20 120 Q80 100 140 130 T260 110 T420 140 L420 300 L-20 300 Z"
            fill="#B8D4E8"
            opacity="0.55"
          />
          <path
            d="M60 40 Q120 80 100 160 T140 280"
            stroke="#A8C8DC"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M280 60 Q240 120 260 200 T220 260"
            stroke="#A8C8DC"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={60 + i * 55}
              cy={80 + (i % 3) * 40}
              r="28"
              fill="#D4E6F0"
              opacity="0.35"
            />
          ))}
        </svg>

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-muted shadow-sm">
          Томск · центр
        </div>

        {pins.map((pin, i) => {
          const isSelected = selectedPinId === pin.id;
          return (
            <motion.button
              key={pin.id}
              type="button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.05, type: "spring", stiffness: 380, damping: 22 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelectPin(pin.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-full"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-label={`${pin.restaurantName}, ${pin.discountLabel}`}
            >
              <motion.div
                animate={isSelected ? { scale: 1.08 } : { scale: 1 }}
                className="flex flex-col items-center"
              >
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md transition-colors ${
                    isSelected
                      ? "bg-accent text-white"
                      : "bg-white text-charcoal"
                  }`}
                >
                  {pin.discountLabel}
                </span>
                <span
                  className={`mt-0.5 h-2.5 w-2.5 rotate-45 ${
                    isSelected ? "bg-accent" : "bg-white"
                  } shadow-sm`}
                />
                {isSelected && (
                  <motion.span
                    layoutId="map-pulse"
                    className="absolute -inset-3 rounded-full border-2 border-accent/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.button>
          );
        })}

        {/* User location dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage/40" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-sage shadow-sm" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

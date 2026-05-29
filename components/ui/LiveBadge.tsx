"use client";

import { motion } from "framer-motion";

interface LiveBadgeProps {
  label?: string;
  size?: "sm" | "md";
}

export function LiveBadge({ label = "Live", size = "sm" }: LiveBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/90 font-medium text-live backdrop-blur-sm ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      }`}
    >
      <motion.span
        className={`rounded-full bg-live ${size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"}`}
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {label}
    </span>
  );
}

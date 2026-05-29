"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getMenuItemImageCandidates,
  MENU_ITEM_PLACEHOLDER,
} from "@/lib/menu-images";

interface MenuItemImageProps {
  name: string;
  alt?: string;
  className?: string;
  sizes?: string;
  rounded?: "xl" | "2xl" | "3xl";
}

const roundedClass = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

export function MenuItemImage({
  name,
  alt,
  className = "h-16 w-16 shrink-0",
  sizes = "64px",
  rounded = "xl",
}: MenuItemImageProps) {
  const candidates = getMenuItemImageCandidates(name);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const src =
    candidateIndex < candidates.length
      ? candidates[candidateIndex]
      : MENU_ITEM_PLACEHOLDER;

  return (
    <div
      className={`relative overflow-hidden ${roundedClass[rounded]} ${className}`}
    >
      <Image
        src={src}
        alt={alt ?? name}
        fill
        className="object-cover"
        sizes={sizes}
        onError={() => {
          if (candidateIndex < candidates.length - 1) {
            setCandidateIndex((i) => i + 1);
            return;
          }
          setCandidateIndex(candidates.length);
        }}
      />
    </div>
  );
}

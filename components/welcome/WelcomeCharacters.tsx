"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Vertical position controls (pixels).
 * Larger bottom-[...] = characters sit higher on screen.
 * Smaller bottom-[...] = characters sit lower (more cropped at viewport edge).
 */
const GIRL_BOTTOM_PX = 40;
const BOY_BOTTOM_PX = 40;

export function WelcomeCharacters() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-[400px] w-full max-w-[430px]"
    >
      {/* Girl — left, larger. Change GIRL_BOTTOM_PX or bottom style to move up/down. */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 z-10 -mr-0 h-[360px] w-[58%] max-w-[250px]"
        style={{ bottom: GIRL_BOTTOM_PX }}
      >
        <Image
          src="/girl.png"
          alt=""
          fill
          priority
          sizes="(max-width: 430px) 58vw, 250px"
          className="object-contain object-bottom"
        />
      </motion.div>

      {/* Boy — right, smaller. Change BOY_BOTTOM_PX or bottom style to move up/down. */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 z-20 h-[310px] w-[48%] max-w-[200px]"
        style={{ bottom: BOY_BOTTOM_PX }}
      >
        <Image
          src="/boy.png"
          alt=""
          fill
          priority
          sizes="(max-width: 430px) 48vw, 200px"
          className="object-contain object-bottom"
        />
      </motion.div>
    </div>
  );
}

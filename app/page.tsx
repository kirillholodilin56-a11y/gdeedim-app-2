"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { WelcomeCharacters } from "@/components/welcome/WelcomeCharacters";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#6BAED6]">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 top-5 z-20"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <LocationIcon />
        </div>
      </motion.div>

      {/* Title — upper third */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 pt-[22vh] text-[60px] font-extrabold leading-[1.1] tracking-tight text-white"
      >
        Где едим
        <br />
        сегодня?
      </motion.h1>

      {/* Characters — center-bottom, cropped at shoulders */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[100px] z-0 flex justify-center overflow-hidden">
        <div className="h-[280px] w-full max-w-[400px] overflow-hidden">
          <WelcomeCharacters />
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mt-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-6"
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/home")}
          className="mx-auto block w-[90%] rounded-full bg-white py-[18px] text-center text-[17px] font-semibold text-[#1A1A1A] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform active:scale-[0.98]"
        >
          К поиску!
        </motion.button>
      </motion.div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-6-5.4-6-10a6 6 0 1112 0c0 4.6-6 10-6 10z"
        stroke="#6BAED6"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" fill="#6BAED6" />
    </svg>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { WelcomeCharacters } from "@/components/welcome/WelcomeCharacters";
import { welcomeCtaFont, welcomeTitleFont } from "./welcome-font";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#6BAED6]">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 top-5 z-30"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="relative h-10 w-10">
            <Image
              src="/logo.png"
              alt="ГдеЕдим"
              fill
              priority
              className="object-contain"
              sizes="28px"
            />
          </div>
        </div>
      </motion.div>

      {/* Title — upper third */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`${welcomeTitleFont.className} relative z-20 px-6 pt-[22vh] text-[65px] leading-[1.05] tracking-[-0.02em] text-white`}
      >
        Где едим
        <br />
        сегодня?
      </motion.h1>

      {/*
        Character stage — change bottom-[...] to move both characters higher/lower.
        Larger value (e.g. bottom-[120px]) = higher; smaller (e.g. bottom-[72px]) = lower.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[100px] z-[1] flex justify-center">
        <WelcomeCharacters />
      </div>

      {/* Bottom blend gradient — merges characters into blue, stays below CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[38vh] max-h-[320px]"
        style={{
          background:
            "linear-gradient(to top, #6BAED6 0%, #5BA4CF 18%, rgba(91, 164, 207, 0.75) 42%, rgba(107, 174, 214, 0.25) 68%, transparent 100%)",
        }}
      />

      {/* CTA — above characters & gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 mt-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-6"
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/home")}
          className={`${welcomeCtaFont.className} mx-auto block w-[90%] rounded-full bg-white py-[18px] text-center text-[17px] text-[#1A1A1A] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform active:scale-[0.98]`}
        >
          К поиску!
        </motion.button>
      </motion.div>
    </div>
  );
}


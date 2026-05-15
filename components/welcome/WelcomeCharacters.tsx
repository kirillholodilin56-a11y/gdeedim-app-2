"use client";

import { motion } from "framer-motion";

/**
 * CSS placeholder avatars — replace with <Image /> when assets are ready.
 */
export function WelcomeCharacters() {
  return (
    <div
      aria-hidden
      className="relative flex w-full max-w-[360px] items-end justify-center gap-0 px-2"
    >
      <GirlAvatar />
      <ManAvatar />
    </div>
  );
}

function GirlAvatar() {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 -mr-6 h-[220px] w-[148px] shrink-0"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="absolute -top-2 left-1/2 h-[88px] w-[96px] -translate-x-1/2 rounded-[48%_48%_40%_40%] bg-[#C0392B] shadow-[inset_0_-8px_0_rgba(0,0,0,0.08)]" />
        <div className="relative z-10 h-[108px] w-[100px] rounded-[50%] bg-[#F5D0B5] shadow-[0_12px_32px_rgba(0,0,0,0.12),inset_0_-6px_12px_rgba(0,0,0,0.04)]">
          <div className="absolute -top-1 left-1/2 h-10 w-[88px] -translate-x-1/2 rounded-b-[40px] bg-[#D44637]" />
          <div className="absolute left-2 top-6 h-8 w-7 rounded-full bg-[#C0392B]" />
          <div className="absolute right-2 top-6 h-8 w-7 rounded-full bg-[#C0392B]" />
          <div className="absolute left-1/2 top-[42px] flex -translate-x-1/2 items-center gap-1">
            <span className="h-[22px] w-[30px] rounded-full border-[3px] border-[#2C2C2C] bg-white/20" />
            <span className="h-[3px] w-2 rounded-full bg-[#2C2C2C]" />
            <span className="h-[22px] w-[30px] rounded-full border-[3px] border-[#2C2C2C] bg-white/20" />
          </div>
          <div className="absolute left-[22px] top-[50px] h-2 w-2 rounded-full bg-[#2C2C2C]" />
          <div className="absolute right-[22px] top-[50px] h-2 w-2 rounded-full bg-[#2C2C2C]" />
          <div className="absolute bottom-6 left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-[#C98B7A]" />
          <div className="absolute bottom-10 left-3 h-3 w-5 rounded-full bg-[#F4A9A0]/50" />
          <div className="absolute bottom-10 right-3 h-3 w-5 rounded-full bg-[#F4A9A0]/50" />
        </div>
        <div className="relative -mt-3 mx-auto h-14 w-[88px] rounded-t-[44px] bg-[#E8A0A0] shadow-[0_8px_20px_rgba(0,0,0,0.1)]" />
      </div>
    </motion.div>
  );
}

function ManAvatar() {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 h-[236px] w-[156px] shrink-0"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="absolute -top-1 left-1/2 z-20 h-[52px] w-[104px] -translate-x-1/2 rounded-[50%_50%_30%_30%] bg-[#2C2416] shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)]" />
        <div className="relative z-10 h-[112px] w-[104px] rounded-[50%] bg-[#8D5524] shadow-[0_12px_32px_rgba(0,0,0,0.14),inset_0_-6px_12px_rgba(0,0,0,0.06)]">
          <div className="absolute -left-1 top-12 h-5 w-3 rounded-full bg-[#7A4A1E]" />
          <div className="absolute -right-1 top-12 h-5 w-3 rounded-full bg-[#7A4A1E]" />
          <div className="absolute left-[24px] top-[46px] h-2.5 w-2.5 rounded-full bg-[#1A1A1A]" />
          <div className="absolute right-[24px] top-[46px] h-2.5 w-2.5 rounded-full bg-[#1A1A1A]" />
          <div className="absolute left-[20px] top-[38px] h-1.5 w-7 rounded-full bg-[#1F170D]" />
          <div className="absolute right-[20px] top-[38px] h-1.5 w-7 rounded-full bg-[#1F170D]" />
          <div className="absolute bottom-0 left-1/2 h-[52px] w-[88px] -translate-x-1/2 rounded-b-[44px] bg-[#3D2E1A] shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]" />
          <div className="absolute bottom-8 left-1/2 h-2 w-7 -translate-x-1/2 rounded-full bg-[#5C3D20]" />
          <div className="absolute left-1/2 top-[58px] h-4 w-5 -translate-x-1/2 rounded-full bg-[#7A4A1E]/60" />
        </div>
        <div className="relative -mt-3 mx-auto h-16 w-[96px] rounded-t-[48px] bg-[#4A6FA5] shadow-[0_8px_20px_rgba(0,0,0,0.12)]" />
      </div>
    </motion.div>
  );
}

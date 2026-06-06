"use client";

import { useEffect } from "react";

export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      return;
    }

    let wakeLock: WakeLockSentinel | null = null;
    let cancelled = false;

    async function acquireWakeLock() {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          wakeLock = null;
        });
      } catch {
        wakeLock = null;
      }
    }

    void acquireWakeLock();

    const onVisibilityChange = () => {
      if (cancelled || document.visibilityState !== "visible") return;
      void acquireWakeLock();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      void wakeLock?.release();
    };
  }, [active]);
}

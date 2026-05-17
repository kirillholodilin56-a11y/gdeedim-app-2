"use client";

import { PreorderProvider } from "@/context/PreorderContext";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <PreorderProvider>{children}</PreorderProvider>;
}

"use client";

import { BottomNav } from "./BottomNav";

interface MobileShellProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function MobileShell({ children, showNav = true }: MobileShellProps) {
  return (
    <div className="relative min-h-screen pb-28">
      {children}
      {showNav && <BottomNav />}
    </div>
  );
}

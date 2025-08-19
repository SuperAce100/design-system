"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export default function ModeToggle({ className }: { className?: string }) {
  return (
    <div className={className}>
      <AnimatedThemeToggler />
    </div>
  );
}

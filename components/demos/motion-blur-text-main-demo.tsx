"use client";

import { useTheme } from "next-themes";
import MotionBlurText from "@/registry/new-york/blocks/motion-blur-text/motion-blur-text";

export default function MotionBlurTextMainDemo() {
  const { resolvedTheme } = useTheme();

  return (
    <MotionBlurText
      color={resolvedTheme === "dark" ? "white" : "black"}
      blurAmount={24}
      className="text-center text-5xl font-semibold tracking-tight"
    >
      Speed
    </MotionBlurText>
  );
}

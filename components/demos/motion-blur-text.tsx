"use client";
import MotionBlurText from "@/registry/new-york/blocks/motion-blur-text/motion-blur-text";
import { useTheme } from "next-themes";

export default function MotionBlurTextDemo() {
  const { theme } = useTheme();
  return (
    <div className="space-y-4 w-full">
      <MotionBlurText
        color={theme === "dark" ? "white" : "black"}
        bidirectional={true}
        className="text-6xl font-medium tracking-tight text-center"
      >
        Motion Blur Text
      </MotionBlurText>
    </div>
  );
}

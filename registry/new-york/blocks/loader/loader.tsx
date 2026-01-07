"use client";

import * as React from "react";
import { Dithering } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

type DitheringType = "2x2" | "4x4" | "8x8";

const variantConfig = {
  default: {
    colorBack: "#000000",
    colorFront: "#00b3ff",
    type: "4x4" as DitheringType,
    speed: 1,
    scale: 0.6,
  },
  neon: {
    colorBack: "#0a0a0a",
    colorFront: "#39ff14",
    type: "4x4" as DitheringType,
    speed: 1.2,
    scale: 0.5,
  },
  monochrome: {
    colorBack: "#000000",
    colorFront: "#ffffff",
    type: "8x8" as DitheringType,
    speed: 0.8,
    scale: 0.7,
  },
  warm: {
    colorBack: "#1a0a00",
    colorFront: "#ff6b35",
    type: "4x4" as DitheringType,
    speed: 0.9,
    scale: 0.6,
  },
};

const sizeConfig = {
  sm: { width: 48, height: 48 },
  default: { width: 80, height: 80 },
  lg: { width: 120, height: 120 },
};

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Preset variant with curated visual style */
  variant?: keyof typeof variantConfig;
  /** Size preset (maps to width/height) */
  size?: keyof typeof sizeConfig;
  /** Custom width (overrides size preset) */
  width?: number;
  /** Custom height (overrides size preset) */
  height?: number;
  /** Background color (overrides variant default) */
  colorBack?: string;
  /** Foreground/sphere color (overrides variant default) */
  colorFront?: string;
  /** Dithering pattern type (overrides variant default) */
  type?: DitheringType;
  /** Animation speed multiplier (overrides variant default) */
  speed?: number;
  /** Sphere scale (overrides variant default) */
  scale?: number;
}

function Loader({
  variant = "default",
  size = "default",
  width,
  height,
  colorBack,
  colorFront,
  type,
  speed,
  scale,
  className,
  style,
  ...props
}: LoaderProps) {
  const variantDefaults = variantConfig[variant];
  const sizeDefaults = sizeConfig[size];

  const resolvedWidth = width ?? sizeDefaults.width;
  const resolvedHeight = height ?? sizeDefaults.height;
  const resolvedColorBack = colorBack ?? variantDefaults.colorBack;
  const resolvedColorFront = colorFront ?? variantDefaults.colorFront;
  const resolvedType = type ?? variantDefaults.type;
  const resolvedSpeed = speed ?? variantDefaults.speed;
  const resolvedScale = scale ?? variantDefaults.scale;

  return (
    <div
      data-slot="loader"
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        ...style,
      }}
      {...props}
    >
      <Dithering
        width={resolvedWidth}
        height={resolvedHeight}
        colorBack={resolvedColorBack}
        colorFront={resolvedColorFront}
        shape="sphere"
        type={resolvedType}
        size={2}
        speed={resolvedSpeed}
        scale={resolvedScale}
      />
    </div>
  );
}

export { Loader, variantConfig, sizeConfig };
export type { LoaderProps };

"use client";

import * as React from "react";
import { Dithering, GrainGradient, SmokeRing } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

type LoaderShape = "sphere" | "swirl" | "ripple";
type LoaderStyle = "plain" | "blur" | "dither";

const sizeConfig = {
  sm: { width: 48, height: 48 },
  default: { width: 80, height: 80 },
  lg: { width: 120, height: 120 },
};

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Base shape of the loader */
  shape?: LoaderShape;
  /** Visual style: plain (solid), blur (soft), or dither (pixelated) */
  variant?: LoaderStyle;
  /** Size preset (maps to width/height) */
  size?: keyof typeof sizeConfig;
  /** Custom width (overrides size preset) */
  width?: number;
  /** Custom height (overrides size preset) */
  height?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Primary color */
  color?: string;
  /** Background color */
  colorBack?: string;
}

function Loader({
  shape = "sphere",
  variant = "dither",
  size = "default",
  width,
  height,
  speed = 1,
  color = "#00b3ff",
  colorBack = "#000000",
  className,
  style,
  ...props
}: LoaderProps) {
  const sizeDefaults = sizeConfig[size];
  const resolvedWidth = width ?? sizeDefaults.width;
  const resolvedHeight = height ?? sizeDefaults.height;

  const renderShader = () => {
    // Plain style - uses GrainGradient for smooth solid look
    if (variant === "plain") {
      const grainShape = shape === "sphere" ? "blob" : shape === "swirl" ? "truchet" : "ripple";
      return (
        <GrainGradient
          width={resolvedWidth}
          height={resolvedHeight}
          colorBack={colorBack}
          colors={[color]}
          shape={grainShape}
          softness={0.3}
          intensity={0.6}
          noise={0.1}
          speed={speed}
          scale={shape === "sphere" ? 1.3 : 1}
        />
      );
    }

    // Blur style - uses SmokeRing for soft ethereal look
    if (variant === "blur") {
      const smokeConfig = {
        sphere: { radius: 0.25, thickness: 0.65, innerShape: 0.7, noiseScale: 2 },
        swirl: { radius: 0.35, thickness: 0.4, innerShape: 1.5, noiseScale: 4 },
        ripple: { radius: 0.3, thickness: 0.15, innerShape: 0.3, noiseScale: 1.5 },
      };
      const config = smokeConfig[shape];
      return (
        <SmokeRing
          width={resolvedWidth}
          height={resolvedHeight}
          colorBack={colorBack}
          colors={[color, `${color}88`]}
          noiseScale={config.noiseScale}
          noiseIterations={shape === "ripple" ? 3 : 6}
          radius={config.radius}
          thickness={config.thickness}
          innerShape={config.innerShape}
          speed={speed * 0.6}
          scale={1}
        />
      );
    }

    // Dither style - uses Dithering shader with pixelated aesthetic
    return (
      <Dithering
        width={resolvedWidth}
        height={resolvedHeight}
        colorBack={colorBack}
        colorFront={color}
        shape={shape}
        type="4x4"
        size={2}
        speed={speed}
        scale={0.6}
      />
    );
  };

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
      {renderShader()}
    </div>
  );
}

export { Loader, sizeConfig };
export type { LoaderProps, LoaderShape, LoaderStyle };

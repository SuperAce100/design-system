"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AsciiWaveProps {
  /** Path to the left mask image */
  leftImage?: string;
  /** Path to the right mask image */
  rightImage?: string;
  /** Character set to use for the wave animation */
  chars?: string;
  /** Cell width in pixels (default: 7) */
  cellWidth?: number;
  /** Cell height in pixels (default: 6) */
  cellHeight?: number;
  /** Font size in pixels (default: 6) */
  fontSize?: number;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  /** Opacity of the canvas (default: 0.9) */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Children to render on top of the background */
  children?: React.ReactNode;
}

// Color gradient - deep blue through cyan to light blue
function getWaveColor(t: number): { r: number; g: number; b: number } {
  if (t <= 0.14) {
    const e = t / 0.14;
    return { r: 0, g: 17 + 3 * e, b: 159 + 5 * e };
  }
  if (t <= 0.29) {
    const e = (t - 0.14) / 0.15;
    return { r: 25 * e, g: 20 + 38 * e, b: 164 + 78 * e };
  }
  if (t <= 0.41) {
    const e = (t - 0.29) / 0.12;
    return { r: 25 + 36 * e, g: 58 + 54 * e, b: 242 + 9 * e };
  }
  if (t <= 0.53) {
    const e = (t - 0.41) / 0.12;
    return { r: 61 + 86 * e, g: 112 + 81 * e, b: 251 };
  }
  const e = (t - 0.53) / 0.47;
  return { r: 147 + 108 * e, g: 193 + 62 * e, b: 251 + 4 * e };
}

// Color dodge blend mode
function colorDodge(base: number, blend: number): number {
  const b = base / 255;
  const l = blend / 255;
  if (l === 0) return 0;
  if (l === 1) return base;
  return Math.max(0, Math.min(255, Math.round(255 * (1 - (1 - b) / l))));
}

export function AsciiWave({
  leftImage = "/images/backgrounds/mountain-l-color.png",
  rightImage = "/images/backgrounds/mountain-r-color.png",
  chars = "▅▃▁?ab018:. ",
  cellWidth = 7,
  cellHeight = 6,
  fontSize = 6,
  speed = 1,
  opacity = 0.9,
  className,
  style,
  children,
}: AsciiWaveProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const animationRef = React.useRef<number>(0);
  const startTimeRef = React.useRef<number>(0);

  // Image refs
  const leftImageRef = React.useRef<HTMLImageElement | null>(null);
  const rightImageRef = React.useRef<HTMLImageElement | null>(null);
  const leftImageDataRef = React.useRef<ImageData | null>(null);
  const rightImageDataRef = React.useRef<ImageData | null>(null);

  const { sin, floor, PI } = Math;
  const TAU = 2 * PI;

  // Generate ASCII character based on position and time
  const getChar = React.useCallback(
    (
      pos: { x: number; y: number },
      state: { time: number; cols: number; rows: number }
    ): string => {
      const time = 1e-4 * state.time * speed;
      const scale = Math.min(state.cols, state.rows);
      const normalized = {
        x: (2 * (pos.x - state.cols / 2)) / scale,
        y: (2 * (pos.y - state.rows / 2)) / scale,
      };
      const index =
        floor(
          (0.5 * sin(4 * (normalized.y - 0.5 * time)) +
            0.5 +
            0.1 * sin(3 * normalized.x)) *
            chars.length
        ) % chars.length;
      return chars[Math.abs(index)];
    },
    [chars, speed, sin, floor]
  );

  // Main render loop
  const render = React.useCallback(
    (timestamp: number) => {
      if (!canvasRef.current) return;
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const screenWidth = rect.width;
      const screenHeight = rect.height;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = screenWidth * dpr;
      canvas.height = screenHeight * dpr;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      const cols = Math.floor(screenWidth / cellWidth);
      const rows = Math.floor(screenHeight / cellHeight);
      const state = {
        time: timestamp - startTimeRef.current,
        cols,
        rows,
      };

      // Calculate layouts for both images
      type ImageLayout = {
        x: number;
        y: number;
        width: number;
        height: number;
      };

      let leftLayout: ImageLayout | null = null;
      let rightLayout: ImageLayout | null = null;

      // Left image layout - fill height, anchor to left edge
      if (leftImageRef.current) {
        const img = leftImageRef.current;
        const imgAspect = img.width / img.height;

        const drawHeight = screenHeight;
        const drawWidth = drawHeight * imgAspect;

        leftLayout = {
          x: 0,
          y: 0,
          width: drawWidth,
          height: drawHeight,
        };
      }

      // Right image layout - fill height, anchor to right edge
      if (rightImageRef.current) {
        const img = rightImageRef.current;
        const imgAspect = img.width / img.height;

        const drawHeight = screenHeight;
        const drawWidth = drawHeight * imgAspect;

        rightLayout = {
          x: screenWidth - drawWidth,
          y: 0,
          width: drawWidth,
          height: drawHeight,
        };
      }

      // Draw images
      ctx.save();
      ctx.globalAlpha = 0.4;

      if (leftImageRef.current && leftLayout) {
        ctx.drawImage(
          leftImageRef.current,
          leftLayout.x,
          leftLayout.y,
          leftLayout.width,
          leftLayout.height
        );
      }

      if (rightImageRef.current && rightLayout) {
        ctx.drawImage(
          rightImageRef.current,
          rightLayout.x,
          rightLayout.y,
          rightLayout.width,
          rightLayout.height
        );
      }

      ctx.restore();

      // Apply top gradient fade
      ctx.save();
      const gradient = ctx.createLinearGradient(0, 0, 0, screenHeight);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.15, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      ctx.restore();

      // Setup text rendering
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      const baseColor = { r: 231, g: 235, b: 237 };

      // Render ASCII grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const char = getChar({ x: col, y: row }, state);

          const normalizedRow = row / rows;
          let charOpacity = 0;

          const pixelX = cellWidth * col;
          const pixelY = cellHeight * row;

          // Sample left image
          if (leftImageRef.current && leftImageDataRef.current && leftLayout) {
            const img = leftImageRef.current;
            if (
              pixelX >= leftLayout.x &&
              pixelX <= leftLayout.x + leftLayout.width &&
              pixelY >= leftLayout.y &&
              pixelY <= leftLayout.y + leftLayout.height
            ) {
              const sampleX = Math.floor(
                ((pixelX - leftLayout.x) / leftLayout.width) * img.width
              );
              const sampleY = Math.floor(
                ((pixelY - leftLayout.y) / leftLayout.height) * img.height
              );

              if (
                sampleX >= 0 &&
                sampleX < img.width &&
                sampleY >= 0 &&
                sampleY < img.height
              ) {
                const pixelIndex = (sampleY * img.width + sampleX) * 4;
                const r = leftImageDataRef.current.data[pixelIndex];
                const g = leftImageDataRef.current.data[pixelIndex + 1];
                const b = leftImageDataRef.current.data[pixelIndex + 2];
                const luminance = (r + g + b) / 3;

                if (luminance >= 230) {
                  charOpacity = 0;
                } else if (luminance >= 200) {
                  charOpacity = Math.pow(1 - (luminance - 200) / 30, 2);
                } else {
                  charOpacity = Math.pow(1 - luminance / 200, 0.3);
                }
              }
            }
          }

          // Sample right image
          if (
            rightImageRef.current &&
            rightImageDataRef.current &&
            rightLayout
          ) {
            const img = rightImageRef.current;
            if (
              pixelX >= rightLayout.x &&
              pixelX <= rightLayout.x + rightLayout.width &&
              pixelY >= rightLayout.y &&
              pixelY <= rightLayout.y + rightLayout.height
            ) {
              const sampleX = Math.floor(
                ((pixelX - rightLayout.x) / rightLayout.width) * img.width
              );
              const sampleY = Math.floor(
                ((pixelY - rightLayout.y) / rightLayout.height) * img.height
              );

              if (
                sampleX >= 0 &&
                sampleX < img.width &&
                sampleY >= 0 &&
                sampleY < img.height
              ) {
                const pixelIndex = (sampleY * img.width + sampleX) * 4;
                const r = rightImageDataRef.current.data[pixelIndex];
                const g = rightImageDataRef.current.data[pixelIndex + 1];
                const b = rightImageDataRef.current.data[pixelIndex + 2];
                const luminance = (r + g + b) / 3;

                if (luminance >= 230) {
                  charOpacity = Math.max(charOpacity, 0);
                } else if (luminance >= 200) {
                  charOpacity = Math.max(
                    charOpacity,
                    Math.pow(1 - (luminance - 200) / 30, 2)
                  );
                } else {
                  charOpacity = Math.max(
                    charOpacity,
                    Math.pow(1 - luminance / 200, 0.3)
                  );
                }
              }
            }
          }

          // Fade at edges (top and bottom)
          let edgeFade = 1;
          if (normalizedRow < 0.1) {
            edgeFade = normalizedRow / 0.1;
          } else if (normalizedRow > 0.9) {
            edgeFade = (1 - normalizedRow) / 0.1;
          }
          charOpacity *= edgeFade;

          // Only render if visible
          if (charOpacity > 0.025) {
            const waveValue = 0.5 * sin(3 * normalizedRow * TAU) + 0.5;
            const waveColor = getWaveColor(waveValue);

            const blended = {
              r: colorDodge(baseColor.r, waveColor.r),
              g: colorDodge(baseColor.g, waveColor.g),
              b: colorDodge(baseColor.b, waveColor.b),
            };

            const finalColor = {
              r: Math.round(baseColor.r + (blended.r - baseColor.r) * 0.8),
              g: Math.round(baseColor.g + (blended.g - baseColor.g) * 0.8),
              b: Math.round(baseColor.b + (blended.b - baseColor.b) * 0.8),
            };

            ctx.fillStyle = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${charOpacity})`;
            ctx.fillText(char, cellWidth * col, cellHeight * row);
          }
        }
      }

      animationRef.current = requestAnimationFrame(render);
    },
    [getChar, cellWidth, cellHeight, fontSize, sin, TAU]
  );

  // Load left image
  React.useEffect(() => {
    if (!leftImage) return;

    const img = new Image();
    img.src = leftImage;
    img.onload = () => {
      leftImageRef.current = img;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
        try {
          leftImageDataRef.current = tempCtx.getImageData(
            0,
            0,
            img.width,
            img.height
          );
        } catch (e) {
          console.error("Failed to extract left image data:", e);
        }
      }
    };
  }, [leftImage]);

  // Load right image
  React.useEffect(() => {
    if (!rightImage) return;

    const img = new Image();
    img.src = rightImage;
    img.onload = () => {
      rightImageRef.current = img;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
        try {
          rightImageDataRef.current = tempCtx.getImageData(
            0,
            0,
            img.width,
            img.height
          );
        } catch (e) {
          console.error("Failed to extract right image data:", e);
        }
      }
    };
  }, [rightImage]);

  // Start animation
  React.useEffect(() => {
    if (!canvasRef.current) return;

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);

  // Handle resize
  React.useEffect(() => {
    const handleResize = () => {
      startTimeRef.current = 0;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity }}
      />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}

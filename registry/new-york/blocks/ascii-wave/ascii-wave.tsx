"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AsciiWaveProps {
  /** Path to the mask image (mountain silhouette) */
  maskImage?: string;
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
  maskImage = "/images/backgrounds/mountain-r-color.png",
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

  // Image refs - no rotation, just store the original
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const imageDataRef = React.useRef<ImageData | null>(null);

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

      // Calculate image layout
      type ImageLayout = {
        leftEdgeX: number;
        rightEdgeX: number;
        drawWidth: number;
        drawHeight: number;
        centerY: number;
      };
      let imageLayout: ImageLayout | null = null;

      if (imageRef.current) {
        const img = imageRef.current;
        const imgAspect = img.width / img.height;

        // Scale image to fit 85% of screen while maintaining aspect ratio
        let drawWidth: number;
        let drawHeight: number;

        if (imgAspect > screenWidth / screenHeight) {
          drawWidth = 0.85 * screenWidth;
          drawHeight = drawWidth / imgAspect;
        } else {
          drawHeight = 0.85 * screenHeight;
          drawWidth = drawHeight * imgAspect;
        }

        imageLayout = {
          leftEdgeX: 0.05 * screenWidth,
          rightEdgeX: 0.95 * screenWidth,
          drawWidth,
          drawHeight,
          centerY: screenHeight / 2 - 0.1 * screenHeight,
        };
      }

      // Draw images on sides (no rotation - just positioned on edges)
      if (imageRef.current && imageLayout) {
        ctx.save();
        ctx.globalAlpha = 0.4;

        const img = imageRef.current;
        const { drawWidth, drawHeight, leftEdgeX, rightEdgeX, centerY } =
          imageLayout;

        // Draw on left side
        ctx.drawImage(
          img,
          leftEdgeX,
          centerY - drawHeight / 2,
          drawWidth,
          drawHeight
        );

        // Draw on right side (flipped horizontally)
        ctx.save();
        ctx.translate(rightEdgeX, centerY);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

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
      }

      // Setup text rendering
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      const baseColor = { r: 231, g: 235, b: 237 };

      // Render ASCII grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const char = getChar({ x: col, y: row }, state);

          // Skip bottom 25% of rows
          if (row > 0.75 * rows) continue;

          const normalizedRow = row / (0.75 * rows);
          let charOpacity = 1;

          // Sample image for opacity if available
          if (imageDataRef.current && imageRef.current && imageLayout) {
            const imgWidth = imageRef.current.width;
            const imgHeight = imageRef.current.height;
            const pixelX = cellWidth * col;
            const pixelY = cellHeight * row;

            let sampleX = -1;
            let sampleY = -1;

            const { drawWidth, drawHeight, leftEdgeX, rightEdgeX, centerY } =
              imageLayout;

            // Left image region
            const leftRegionX = leftEdgeX;
            const leftRegionXEnd = leftEdgeX + drawWidth;
            const leftRegionY = centerY - drawHeight / 2;
            const leftRegionYEnd = centerY + drawHeight / 2;

            if (
              pixelX >= leftRegionX &&
              pixelX <= leftRegionXEnd &&
              pixelY >= leftRegionY &&
              pixelY <= leftRegionYEnd
            ) {
              sampleX = Math.floor(
                ((pixelX - leftRegionX) / drawWidth) * imgWidth
              );
              sampleY = Math.floor(
                ((pixelY - leftRegionY) / drawHeight) * imgHeight
              );
            }

            // Right image region (flipped)
            const rightRegionX = rightEdgeX - drawWidth;
            const rightRegionXEnd = rightEdgeX;
            const rightRegionY = centerY - drawHeight / 2;
            const rightRegionYEnd = centerY + drawHeight / 2;

            if (
              pixelX >= rightRegionX &&
              pixelX <= rightRegionXEnd &&
              pixelY >= rightRegionY &&
              pixelY <= rightRegionYEnd
            ) {
              // Flip X for right side
              sampleX = Math.floor(
                ((rightRegionXEnd - pixelX) / drawWidth) * imgWidth
              );
              sampleY = Math.floor(
                ((pixelY - rightRegionY) / drawHeight) * imgHeight
              );
            }

            // Sample pixel and calculate opacity based on luminance
            if (
              sampleX >= 0 &&
              sampleX < imgWidth &&
              sampleY >= 0 &&
              sampleY < imgHeight
            ) {
              const pixelIndex = (sampleY * imgWidth + sampleX) * 4;
              const r = imageDataRef.current.data[pixelIndex];
              const g = imageDataRef.current.data[pixelIndex + 1];
              const b = imageDataRef.current.data[pixelIndex + 2];
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

          // Determine if pixel is in image region
          let inImageRegion = 0;
          if (imageRef.current && imageLayout) {
            const pixelX = cellWidth * col;
            const pixelY = cellHeight * row;

            const { drawWidth, drawHeight, leftEdgeX, rightEdgeX, centerY } =
              imageLayout;

            // Left region
            const inLeft =
              pixelX >= leftEdgeX &&
              pixelX <= leftEdgeX + drawWidth &&
              pixelY >= centerY - drawHeight / 2 &&
              pixelY <= centerY + drawHeight / 2;

            // Right region
            const inRight =
              pixelX >= rightEdgeX - drawWidth &&
              pixelX <= rightEdgeX &&
              pixelY >= centerY - drawHeight / 2 &&
              pixelY <= centerY + drawHeight / 2;

            if (inLeft || inRight) {
              inImageRegion = charOpacity;
            }
          }

          // Fade at top
          let topFade = 1;
          if (normalizedRow < 0.15) {
            topFade = normalizedRow / 0.15;
          }
          inImageRegion *= topFade;

          // Only render if visible
          if (inImageRegion > 0.025) {
            // Wave-based coloring
            const waveValue = 0.5 * sin(3 * normalizedRow * TAU) + 0.5;
            const waveColor = getWaveColor(waveValue);

            // Color dodge blending
            const blended = {
              r: colorDodge(baseColor.r, waveColor.r),
              g: colorDodge(baseColor.g, waveColor.g),
              b: colorDodge(baseColor.b, waveColor.b),
            };

            // Mix colors
            const finalColor = {
              r: Math.round(baseColor.r + (blended.r - baseColor.r) * 0.8),
              g: Math.round(baseColor.g + (blended.g - baseColor.g) * 0.8),
              b: Math.round(baseColor.b + (blended.b - baseColor.b) * 0.8),
            };

            ctx.fillStyle = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${inImageRegion})`;
            ctx.fillText(char, cellWidth * col, cellHeight * row);
          }
        }
      }

      animationRef.current = requestAnimationFrame(render);
    },
    [getChar, cellWidth, cellHeight, fontSize, sin, TAU]
  );

  // Load image (no rotation)
  React.useEffect(() => {
    if (!maskImage) return;

    const img = new Image();
    img.src = maskImage;
    img.onload = () => {
      imageRef.current = img;

      // Extract pixel data for sampling
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
        try {
          imageDataRef.current = tempCtx.getImageData(
            0,
            0,
            img.width,
            img.height
          );
        } catch (e) {
          console.error("Failed to extract image data:", e);
        }
      }
    };
    img.onerror = () => {
      console.error("Failed to load mask image:", maskImage);
    };
  }, [maskImage]);

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

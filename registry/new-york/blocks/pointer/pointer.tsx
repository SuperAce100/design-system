"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MousePointer, Loader2 } from "lucide-react";

type PointerLayerContextValue = {
  getRect: () => DOMRect | null;
} | null;

const PointerLayerContext = React.createContext<PointerLayerContextValue>(null);

export interface PointerLayerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PointerLayer({ className, children, ...props }: PointerLayerProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const getRect = React.useCallback((): DOMRect | null => {
    const el = ref.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }, []);

  return (
    <PointerLayerContext.Provider value={{ getRect }}>
      <div ref={ref} className={cn("relative w-full h-full", className)} {...props}>
        {children}
      </div>
    </PointerLayerContext.Provider>
  );
}

function useLayerBounds() {
  const ctx = React.useContext(PointerLayerContext);
  return ctx?.getRect ?? (() => null);
}

export type PointerStatus = "idle" | "thinking" | "moving";

export interface PointerProps extends React.HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
  thoughts?: string | null;
  sizePx?: number; // overall visual scale of the pointer icon
  status?: PointerStatus;
  clampToLayer?: boolean;
}

export function Pointer({
  x,
  y,
  thoughts,
  sizePx = 20,
  status = "idle",
  clampToLayer = true,
  className,
  ...props
}: PointerProps) {
  const getRect = useLayerBounds();

  const { clampedX, clampedY } = React.useMemo(() => {
    const rect = getRect();
    if (!clampToLayer || !rect) return { clampedX: x, clampedY: y };
    const maxX = Math.max(0, rect.width - sizePx);
    const maxY = Math.max(0, rect.height - sizePx);
    return {
      clampedX: Math.min(Math.max(0, x), maxX),
      clampedY: Math.min(Math.max(0, y), maxY),
    };
  }, [x, y, clampToLayer, getRect, sizePx]);

  const showThoughts = Boolean(thoughts && thoughts.trim().length > 0);

  // Fixed bubble positioning relative to pointer: top-right
  const bubbleOffset = React.useMemo(() => ({ top: -8, left: 16 }), []);

  return (
    <div
      className={cn("absolute pointer-events-none", className)}
      style={{ left: clampedX, top: clampedY, transition: "left 300ms ease-out, top 300ms ease-out" }}
      aria-live="polite"
      {...props}
    >
      <div className="relative" style={{ width: sizePx, height: sizePx }}>
        <MousePointer
          className={cn(
            "text-foreground drop-shadow-sm",
            status === "moving" && "scale-105",
            status === "thinking" && "animate-pulse"
          )}
          style={{ width: sizePx, height: sizePx }}
        />

        {/* Thinking badge: always anchored bottom-right */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 size-4 rounded-full border bg-popover text-popover-foreground",
            "flex items-center justify-center shadow-sm"
          )}
          aria-hidden
        >
          {status === "thinking" ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <div className="size-2 rounded-full bg-muted-foreground/60" />
          )}
        </div>
      </div>

      {/* Thoughts bubble */}
      <div
        className={cn("absolute z-[5] max-w-xs select-text")}
        style={{
          top: bubbleOffset.top,
          left: bubbleOffset.left,
          opacity: showThoughts ? 1 : 0,
          transform: `translate(8px, -8px)`,
          transition: "opacity 200ms ease-out, transform 200ms ease-out",
        }}
        aria-hidden={!showThoughts}
      >
        <div className="relative">
          <div className="rounded-xl border bg-popover text-popover-foreground shadow-md px-3 py-2 text-xs leading-snug">
            {thoughts}
          </div>
          <div className="absolute -bottom-1 left-2 size-2 rotate-45 border bg-popover" />
        </div>
      </div>
    </div>
  );
}

export type MoveToArgs = { x: number; y: number; thoughts?: string | null; status?: PointerStatus };

export function usePointer(initial: { x?: number; y?: number; thoughts?: string | null; status?: PointerStatus } = {}) {
  const [x, setX] = React.useState<number>(initial.x ?? 24);
  const [y, setY] = React.useState<number>(initial.y ?? 24);
  const [thoughts, setThoughts] = React.useState<string | null>(initial.thoughts ?? null);
  const [status, setStatus] = React.useState<PointerStatus>(initial.status ?? "idle");

  const moveTo = React.useCallback((args: MoveToArgs) => {
    setX(args.x);
    setY(args.y);
    if (typeof args.thoughts !== "undefined") setThoughts(args.thoughts);
    if (typeof args.status !== "undefined") setStatus(args.status);
  }, []);

  return { x, y, thoughts, status, moveTo, setThoughts, setStatus } as const;
}

export default Pointer;



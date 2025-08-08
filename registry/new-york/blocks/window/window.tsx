"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Bounds = { width: number; height: number } | null;

const WindowContainerContext = React.createContext<{
  getRect: () => DOMRect | null;
} | null>(null);

export interface WindowContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function WindowContainer({ className, children, ...props }: WindowContainerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const getRect = React.useCallback((): DOMRect | null => {
    const el = containerRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }, []);

  return (
    <WindowContainerContext.Provider value={{ getRect }}>
      <div
        ref={containerRef}
        data-window-container
        className={cn("relative w-full h-full", className)}
        {...props}
      >
        {children}
      </div>
    </WindowContainerContext.Provider>
  );
}

function useContainerBounds() {
  const ctx = React.useContext(WindowContainerContext);
  return ctx?.getRect ?? (() => null);
}

export interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export function Window({
  className,
  children,
  title = "Window",
  initialX = 24,
  initialY = 24,
  initialWidth = 360,
  initialHeight = 220,
  minWidth = 240,
  minHeight = 120,
  ...props
}: WindowProps) {
  const getRect = useContainerBounds();

  const [position, setPosition] = React.useState({ x: initialX, y: initialY });
  const [size, setSize] = React.useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState<null | "right" | "bottom" | "corner">(null);
  const dragOffsetRef = React.useRef({ dx: 0, dy: 0 });

  const clampToBounds = React.useCallback(
    (x: number, y: number, width: number, height: number) => {
      const rect = getRect();
      if (!rect) return { x, y };
      const maxX = Math.max(0, rect.width - width);
      const maxY = Math.max(0, rect.height - height);
      return {
        x: Math.min(Math.max(0, x), maxX),
        y: Math.min(Math.max(0, y), maxY),
      };
    },
    [getRect]
  );

  const onHeaderPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    const rect = getRect();
    const localX = rect ? e.clientX - rect.left : e.clientX;
    const localY = rect ? e.clientY - rect.top : e.clientY;
    dragOffsetRef.current = {
      dx: localX - position.x,
      dy: localY - position.y,
    };
  };

  const onResizePointerDown = (
    e: React.PointerEvent,
    direction: "right" | "bottom" | "corner"
  ) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setIsResizing(direction);
  };

  React.useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const rect = getRect();
      const localX = rect ? e.clientX - rect.left : e.clientX;
      const localY = rect ? e.clientY - rect.top : e.clientY;
      if (isDragging) {
        const nextX = localX - dragOffsetRef.current.dx;
        const nextY = localY - dragOffsetRef.current.dy;
        const clamped = clampToBounds(nextX, nextY, size.width, size.height);
        setPosition(clamped);
      } else if (isResizing) {
        if (!rect) return;
        if (isResizing === "right" || isResizing === "corner") {
          const maxWidth = Math.max(minWidth, rect.width - position.x);
          const desired = localX - position.x; // width based on pointer
          const newWidth = Math.max(minWidth, Math.min(maxWidth, desired));
          setSize((s) => ({ ...s, width: newWidth }));
        }
        if (isResizing === "bottom" || isResizing === "corner") {
          const maxHeight = Math.max(minHeight, rect.height - position.y);
          const desired = localY - position.y; // height based on pointer
          const newHeight = Math.max(minHeight, Math.min(maxHeight, desired));
          setSize((s) => ({ ...s, height: newHeight }));
        }
      }
    };

    const handleUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      // Ensure position remains within bounds after interactions
      setPosition((p) => clampToBounds(p.x, p.y, size.width, size.height));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, isResizing, clampToBounds, getRect, minHeight, minWidth, position.x, position.y, size.width, size.height]);

  // Keep inside bounds if container size changes
  React.useEffect(() => {
    const ro = new ResizeObserver(() => {
      setPosition((p) => clampToBounds(p.x, p.y, size.width, size.height));
    });
    // Try to observe the nearest container element in DOM tree
    const containerEl = document?.querySelector?.("[data-window-container]") as HTMLElement | null;
    if (containerEl) ro.observe(containerEl);
    return () => ro.disconnect();
  }, [clampToBounds, size.width, size.height]);

  return (
    <div
      className={cn(
        "absolute select-none rounded-xl border border-border bg-white shadow-md shadow-border/60 overflow-hidden",
        isDragging && "cursor-grabbing",
        className
      )}
      style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 bg-muted text-muted-foreground cursor-grab active:cursor-grabbing"
        )}
        onPointerDown={onHeaderPointerDown}
        aria-label="Drag window"
      >
        <span className="text-xs font-medium truncate">{title}</span>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="w-full h-[calc(100%-2.25rem)] p-3 overflow-auto">{children}</div>
      {/* Resize handles */}
      <div
        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize"
        onPointerDown={(e) => onResizePointerDown(e, "right")}
        aria-label="Resize right"
      />
      <div
        className="absolute left-0 bottom-0 w-full h-1 cursor-ns-resize"
        onPointerDown={(e) => onResizePointerDown(e, "bottom")}
        aria-label="Resize bottom"
      />
      <div
        className="absolute right-0 bottom-0 size-3 cursor-nwse-resize"
        onPointerDown={(e) => onResizePointerDown(e, "corner")}
        aria-label="Resize corner"
      />
    </div>
  );
}

export default Window;



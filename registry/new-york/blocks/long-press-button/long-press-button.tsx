"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const DEFAULT_HOLD_DURATION = 1600;
type ProgressDirection = "left-to-right" | "top-to-bottom" | "bottom-to-top";

export type LongPressButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  holdDuration?: number;
  onHoldComplete?: () => void;
  onHoldCancel?: () => void;
  progressClassName?: string;
  progressDirection?: ProgressDirection;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getClipPath = (progress: number, direction: ProgressDirection) => {
  const remaining = 100 - clamp(progress, 0, 1) * 100;
  if (direction === "top-to-bottom") {
    return `inset(0 0 ${remaining}% 0)`;
  }
  if (direction === "bottom-to-top") {
    return `inset(${remaining}% 0 0 0)`;
  }
  return `inset(0 ${remaining}% 0 0)`;
};

const LongPressButton = React.forwardRef<HTMLButtonElement, LongPressButtonProps>(
  (
    {
      holdDuration = DEFAULT_HOLD_DURATION,
      onHoldComplete,
      onHoldCancel,
      className,
      progressClassName,
      progressDirection = "left-to-right",
      disabled,
      type,
      children,
      onPointerDown,
      onPointerUp,
      onPointerLeave,
      onPointerCancel,
      onBlur,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const contentRef = React.useRef<HTMLSpanElement | null>(null);
    const [progress, setProgress] = React.useState(0);
    const [isHolding, setIsHolding] = React.useState(false);

    const progressRef = React.useRef(0);
    const holdRef = React.useRef<{
      frame: number | null;
      startTime: number | null;
      completed: boolean;
    }>({ frame: null, startTime: null, completed: false });

    const setProgressValue = React.useCallback((value: number) => {
      progressRef.current = value;
      setProgress(value);
    }, []);

    const stopAnimation = React.useCallback(() => {
      if (holdRef.current.frame !== null) {
        cancelAnimationFrame(holdRef.current.frame);
        holdRef.current.frame = null;
      }
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") {
          ref(node);
          return;
        }
        if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const playCompleteAnimation = React.useCallback(() => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      buttonRef.current?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-1px)" },
          { transform: "translateX(1px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 220, easing: "ease-out" }
      );

      contentRef.current?.animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(-2px) scale(1.08)" },
          { transform: "translateY(0) scale(1)" },
        ],
        { duration: 260, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
      );
    }, []);

    const resetHold = React.useCallback(() => {
      holdRef.current.startTime = null;
      holdRef.current.completed = false;
      setIsHolding(false);
      setProgressValue(0);
    }, [setProgressValue]);

    const stopHold = React.useCallback(() => {
      const wasHolding = holdRef.current.frame !== null || isHolding;
      stopAnimation();
      const shouldNotify = wasHolding && !holdRef.current.completed;
      resetHold();
      if (shouldNotify) {
        onHoldCancel?.();
      }
    }, [isHolding, onHoldCancel, resetHold, stopAnimation]);

    const startHold = React.useCallback(() => {
      if (disabled || holdRef.current.frame !== null || holdRef.current.completed) {
        return;
      }

      const resolvedDuration = Math.max(holdDuration, 0);
      if (resolvedDuration === 0) {
        setProgressValue(1);
        holdRef.current.completed = true;
        setIsHolding(false);
        playCompleteAnimation();
        onHoldComplete?.();
        return;
      }

      setIsHolding(true);
      holdRef.current.startTime = null;
      holdRef.current.frame = requestAnimationFrame(function tick(time) {
        if (holdRef.current.startTime === null) {
          holdRef.current.startTime = time;
        }
        const elapsed = time - holdRef.current.startTime;
        const nextProgress = clamp(elapsed / resolvedDuration, 0, 1);
        setProgressValue(nextProgress);

        if (nextProgress >= 1) {
          stopAnimation();
          holdRef.current.completed = true;
          setIsHolding(false);
          playCompleteAnimation();
          onHoldComplete?.();
          return;
        }

        holdRef.current.frame = requestAnimationFrame(tick);
      });
    }, [disabled, holdDuration, onHoldComplete, playCompleteAnimation, setProgressValue, stopAnimation]);

    React.useEffect(() => {
      if (disabled) {
        stopHold();
      }
    }, [disabled, stopHold]);

    React.useEffect(() => {
      return () => {
        stopAnimation();
      };
    }, [stopAnimation]);

    const state = progress >= 1 ? "complete" : isHolding ? "holding" : "idle";

    return (
      <button
        ref={setRefs}
        type={type ?? "button"}
        data-slot="long-press-button"
        data-state={state}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive shadow-sm transition-all duration-150 ease-out hover:bg-destructive/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || event.button !== 0) {
            return;
          }
          startHold();
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          if (event.defaultPrevented) {
            return;
          }
          stopHold();
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          if (event.defaultPrevented) {
            return;
          }
          stopHold();
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          if (event.defaultPrevented) {
            return;
          }
          stopHold();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (event.defaultPrevented) {
            return;
          }
          stopHold();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.repeat) {
            return;
          }
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            startHold();
          }
        }}
        onKeyUp={(event) => {
          onKeyUp?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            stopHold();
          }
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn("absolute inset-0 bg-destructive/60", progressClassName)}
          style={{ clipPath: getClipPath(progress, progressDirection) }}
        />
        <span ref={contentRef} className="relative z-10 flex items-center gap-2">
          {children ?? "Long press button"}
        </span>
      </button>
    );
  }
);

LongPressButton.displayName = "LongPressButton";

export { LongPressButton };

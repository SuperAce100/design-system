"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};

const getStepPrecision = (step: number) => {
  if (!Number.isFinite(step)) {
    return 0;
  }

  const stepText = step.toString();
  if (stepText.includes("e-")) {
    const [, exponent = "0"] = stepText.split("e-");
    return Number.parseInt(exponent, 10) || 0;
  }

  const [, decimals = ""] = stepText.split(".");
  return decimals.length;
};

const snapToStep = (value: number, min: number, max: number, step: number) => {
  const normalized = clamp(value, min, max);
  const nextStep = step > 0 ? step : 1;
  const precision = Math.min(getStepPrecision(nextStep) + 2, 8);
  const snapped = Math.round((normalized - min) / nextStep) * nextStep + min;
  return Number(clamp(snapped, min, max).toFixed(precision));
};

const getPercentFromValue = (value: number, min: number, max: number) => {
  if (max <= min) {
    return 0;
  }
  return clamp((value - min) / (max - min), 0, 1);
};

const formatDisplayValue = (value: number, step: number) => {
  const precision = Math.min(getStepPrecision(step), 4);
  if (precision === 0) {
    return `${Math.round(value)}`;
  }
  return value.toFixed(precision);
};

export type SliderProps = Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue"> & {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  bars?: number;
  editable?: boolean;
  disabled?: boolean;
  valueSuffix?: string;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
};

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      bars = 36,
      editable = true,
      disabled = false,
      valueSuffix = "%",
      onValueChange,
      onValueCommit,
      style,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const safeStep = step > 0 ? step : 1;
    const safeMax = max > min ? max : min + safeStep;
    const isControlled = value !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
      snapToStep(defaultValue ?? min, min, safeMax, safeStep)
    );
    const [isEditing, setIsEditing] = React.useState(false);
    const [draftValue, setDraftValue] = React.useState("");
    const [isDragging, setIsDragging] = React.useState(false);

    const sliderRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const pointerIdRef = React.useRef<number | null>(null);

    const resolvedValue = snapToStep(
      isControlled ? value : uncontrolledValue,
      min,
      safeMax,
      safeStep
    );

    const setSliderRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        sliderRef.current = node;
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

    React.useEffect(() => {
      if (!isControlled) {
        setUncontrolledValue((previous) => snapToStep(previous, min, safeMax, safeStep));
      }
    }, [isControlled, min, safeMax, safeStep]);

    React.useEffect(() => {
      if (!isEditing) {
        setDraftValue(formatDisplayValue(resolvedValue, safeStep));
      }
    }, [resolvedValue, safeStep, isEditing]);

    React.useEffect(() => {
      if (!isEditing) {
        return;
      }

      inputRef.current?.focus();
      inputRef.current?.select();
    }, [isEditing]);

    const setValue = React.useCallback(
      (nextValue: number, options?: { commit?: boolean }) => {
        const snapped = snapToStep(nextValue, min, safeMax, safeStep);
        const hasChanged = snapped !== resolvedValue;

        if (!isControlled && hasChanged) {
          setUncontrolledValue(snapped);
        }

        if (hasChanged) {
          onValueChange?.(snapped);
        }

        if (options?.commit) {
          onValueCommit?.(snapped);
        }
      },
      [isControlled, min, onValueChange, onValueCommit, resolvedValue, safeMax, safeStep]
    );

    const valuePercent = getPercentFromValue(resolvedValue, min, safeMax);
    const barCount = clamp(Math.round(bars), 12, 96);

    const updateFromClientX = React.useCallback(
      (clientX: number, options?: { commit?: boolean }) => {
        const sliderElement = sliderRef.current;
        if (!sliderElement) {
          return;
        }

        const rect = sliderElement.getBoundingClientRect();
        if (rect.width <= 0) {
          return;
        }

        const relativeX = clamp((clientX - rect.left) / rect.width, 0, 1);
        const nextValue = min + relativeX * (safeMax - min);
        setValue(nextValue, options);
      },
      [min, safeMax, setValue]
    );

    const stopDragging = React.useCallback(() => {
      pointerIdRef.current = null;
      setIsDragging(false);
    }, []);

    const commitDraft = React.useCallback(
      (cancel = false) => {
        if (cancel) {
          setDraftValue(formatDisplayValue(resolvedValue, safeStep));
          setIsEditing(false);
          return;
        }

        const parsed = Number.parseFloat(draftValue.trim());
        if (!Number.isNaN(parsed)) {
          setValue(parsed, { commit: true });
        } else {
          setDraftValue(formatDisplayValue(resolvedValue, safeStep));
        }

        setIsEditing(false);
      },
      [draftValue, resolvedValue, safeStep, setValue]
    );

    const tokenStyle: React.CSSProperties = {
      // Token contract:
      // --slider-bg: container background (defaults to --muted)
      // --slider-border: container and bubble border (defaults to --border)
      // --slider-bar: bar color (defaults to --foreground)
      // --slider-pill-bg: value bubble background (defaults to --secondary)
      // --slider-pill-fg: value bubble text color (defaults to --foreground)
      "--slider-bg": "var(--muted)",
      "--slider-border": "var(--border)",
      "--slider-bar": "var(--foreground)",
      "--slider-pill-bg": "var(--secondary)",
      "--slider-pill-fg": "var(--foreground)",
      ...style,
    } as React.CSSProperties;

    return (
      <div
        {...props}
        ref={setSliderRef}
        data-slot="slider"
        data-disabled={disabled ? "true" : "false"}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={safeMax}
        aria-valuenow={resolvedValue}
        aria-valuetext={`${formatDisplayValue(resolvedValue, safeStep)}${valueSuffix}`}
        className={cn(
          "relative h-[132px] w-full touch-none select-none rounded-[2rem] border border-[var(--slider-border)] bg-[var(--slider-bg)] px-4 pb-4 pt-10 outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring/40",
          "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        style={tokenStyle}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || disabled || isEditing) {
            return;
          }

          pointerIdRef.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsDragging(true);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (event.defaultPrevented || pointerIdRef.current !== event.pointerId) {
            return;
          }

          updateFromClientX(event.clientX);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          if (event.defaultPrevented || pointerIdRef.current !== event.pointerId) {
            return;
          }

          updateFromClientX(event.clientX, { commit: true });
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          stopDragging();
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          if (event.defaultPrevented || pointerIdRef.current !== event.pointerId) {
            return;
          }

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          stopDragging();
        }}
        onLostPointerCapture={() => {
          stopDragging();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || disabled || isEditing) {
            return;
          }

          const stepSize = event.shiftKey ? safeStep * 10 : safeStep;

          switch (event.key) {
            case "ArrowLeft":
            case "ArrowDown": {
              event.preventDefault();
              setValue(resolvedValue - stepSize, { commit: true });
              break;
            }
            case "ArrowRight":
            case "ArrowUp": {
              event.preventDefault();
              setValue(resolvedValue + stepSize, { commit: true });
              break;
            }
            case "PageDown": {
              event.preventDefault();
              setValue(resolvedValue - safeStep * 10, { commit: true });
              break;
            }
            case "PageUp": {
              event.preventDefault();
              setValue(resolvedValue + safeStep * 10, { commit: true });
              break;
            }
            case "Home": {
              event.preventDefault();
              setValue(min, { commit: true });
              break;
            }
            case "End": {
              event.preventDefault();
              setValue(safeMax, { commit: true });
              break;
            }
            default:
              break;
          }
        }}
      >
        <div className="pointer-events-none absolute inset-x-4 bottom-4 top-7 flex items-end gap-1">
          {Array.from({ length: barCount }, (_, index) => {
            const ratio = barCount <= 1 ? 0 : index / (barCount - 1);
            const distance = Math.abs(ratio - valuePercent);
            const valley = Math.exp(-(distance * distance) / (2 * 0.11 * 0.11));
            const rightRise = smoothstep(0.72, 1, ratio) * 0.35;
            const height = clamp(0.74 - valley * 0.56 + rightRise, 0.1, 0.96);
            const rightFade = 1 - ratio * 0.58;
            const valleyFade = 1 - valley * 0.55;
            const activeBoost = ratio <= valuePercent ? 1 : 0.88;
            const opacity = clamp(rightFade * valleyFade * activeBoost, 0.12, 0.95);

            return (
              <span
                key={`bar-${index}`}
                className="flex-1 rounded-full bg-[var(--slider-bar)] transition-[height,opacity] duration-200 ease-out"
                style={{
                  height: `${(height * 100).toFixed(2)}%`,
                  opacity,
                }}
              />
            );
          })}
        </div>

        <div
          className="absolute -top-[54px] z-10 -translate-x-1/2 transition-[left] duration-200 ease-out"
          style={{ left: `${(valuePercent * 100).toFixed(3)}%` }}
        >
          <div
            className="flex min-w-14 flex-col items-center rounded-2xl border border-[var(--slider-border)] bg-[var(--slider-pill-bg)] px-2.5 py-1 text-[var(--slider-pill-fg)] shadow-md shadow-shade"
            onDoubleClick={() => {
              if (!editable || disabled) {
                return;
              }
              setDraftValue(formatDisplayValue(resolvedValue, safeStep));
              setIsEditing(true);
            }}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                value={draftValue}
                inputMode="decimal"
                aria-label="Slider value"
                className="w-12 bg-transparent text-center text-4xl leading-none font-semibold outline-none"
                onChange={(event) => {
                  setDraftValue(event.target.value);
                }}
                onBlur={() => {
                  commitDraft();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                  if (event.key === "Enter") {
                    event.preventDefault();
                    commitDraft();
                    return;
                  }

                  if (event.key === "Escape") {
                    event.preventDefault();
                    commitDraft(true);
                  }
                }}
              />
            ) : (
              <span className="text-4xl leading-none font-semibold tabular-nums">
                {formatDisplayValue(resolvedValue, safeStep)}
              </span>
            )}
            {valueSuffix ? <span className="text-lg leading-none">{valueSuffix}</span> : null}
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

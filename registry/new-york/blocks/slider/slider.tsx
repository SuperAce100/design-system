"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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

const trimTrailingZeros = (value: string) => value.replace(/\.?0+$/, "");

const normalizeStep = (step: number | undefined) =>
  Number.isFinite(step) && (step ?? 0) > 0 ? (step as number) : null;

const snapToStep = (value: number, min: number, max: number, step: number | null) => {
  const normalized = clamp(value, min, max);
  if (step === null) {
    return normalized;
  }
  const nextStep = step;
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

const getRangePrecision = (range: number) => {
  if (!Number.isFinite(range) || range <= 0) {
    return 0;
  }

  if (range <= 5) {
    return 2;
  }

  if (range <= 20) {
    return 1;
  }

  return 0;
};

const formatDisplayValue = (value: number, step: number | null, range: number) => {
  const precision = Math.min(step === null ? getRangePrecision(range) : getStepPrecision(step), 4);
  if (precision === 0) {
    return `${Math.round(value)}`;
  }
  return trimTrailingZeros(value.toFixed(precision));
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
      step,
      bars = 36,
      editable = true,
      disabled = false,
      valueSuffix = "",
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
    const safeStep = normalizeStep(step);
    const safeMax = max > min ? max : min + (safeStep ?? 1);
    const valueRange = safeMax - min;
    const keyboardStep = safeStep ?? Math.max((safeMax - min) / 100, 0.01);
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
        setDraftValue(formatDisplayValue(resolvedValue, safeStep, valueRange));
      }
    }, [resolvedValue, safeStep, valueRange, isEditing]);

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
    const labelLeftPercent = clamp(valuePercent * 100, 8, 92);

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
          setDraftValue(formatDisplayValue(resolvedValue, safeStep, valueRange));
          setIsEditing(false);
          return;
        }

        const parsed = Number.parseFloat(draftValue.trim());
        if (!Number.isNaN(parsed)) {
          setValue(parsed, { commit: true });
        } else {
          setDraftValue(formatDisplayValue(resolvedValue, safeStep, valueRange));
        }

        setIsEditing(false);
      },
      [draftValue, resolvedValue, safeStep, setValue, valueRange]
    );

    const tokenStyle: React.CSSProperties = {
      // Token contract:
      // --slider-bg: container background (defaults to --muted)
      // --slider-border: container border (defaults to --border)
      // --slider-bar: bar color (defaults to --foreground)
      // --slider-value-fg: inline value color (defaults to --foreground)
      "--slider-bg": "var(--muted)",
      "--slider-border": "var(--border)",
      "--slider-bar": "var(--foreground)",
      "--slider-value-fg": "var(--foreground)",
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
        aria-valuetext={
          valueSuffix
            ? `${formatDisplayValue(resolvedValue, safeStep, valueRange)}${valueSuffix}`
            : formatDisplayValue(resolvedValue, safeStep, valueRange)
        }
        className={cn(
          "relative h-[108px] w-full touch-none select-none rounded-2xl border border-[var(--slider-border)] bg-[var(--slider-bg)] px-3 py-3 outline-none transition-colors",
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

          const stepSize = event.shiftKey ? keyboardStep * 10 : keyboardStep;

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
              setValue(resolvedValue - keyboardStep * 10, { commit: true });
              break;
            }
            case "PageUp": {
              event.preventDefault();
              setValue(resolvedValue + keyboardStep * 10, { commit: true });
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
        <div className="pointer-events-none absolute inset-3 flex items-end gap-1">
          {Array.from({ length: barCount }, (_, index) => {
            const ratio = barCount <= 1 ? 0 : index / (barCount - 1);
            const distance = Math.abs(ratio - valuePercent);
            const valleyWidth = 0.1;
            const valley = Math.exp(-(distance * distance) / (2 * valleyWidth * valleyWidth));
            const height = clamp(0.72 - valley * 0.56, 0.1, 0.82);
            const opacity = clamp(1 - valley * 0.42, 0.2, 1);

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
          className="absolute inset-3 z-10 pointer-events-none"
          aria-label="Slider value display"
          aria-live="polite"
        >
          <div
            className="pointer-events-auto absolute top-[34%] -translate-x-1/2 -translate-y-1/2 transition-[left] duration-200 ease-out"
            style={{ left: `${labelLeftPercent.toFixed(3)}%` }}
          >
            <div
              className="flex items-baseline gap-0.5 px-1 text-[var(--slider-value-fg)] drop-shadow-[0_1px_0_var(--slider-bg)]"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              onDoubleClick={(event) => {
                event.stopPropagation();
                if (!editable || disabled) {
                  return;
                }
                setDraftValue(formatDisplayValue(resolvedValue, safeStep, valueRange));
                setIsEditing(true);
              }}
            >
              {isEditing ? (
                <input
                  ref={inputRef}
                  value={draftValue}
                  inputMode="decimal"
                  aria-label="Slider value"
                  className="w-12 bg-transparent text-center text-3xl leading-none font-semibold tabular-nums outline-none"
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
                <span className="text-3xl leading-none font-semibold tabular-nums">
                  {formatDisplayValue(resolvedValue, safeStep, valueRange)}
                </span>
              )}
              {valueSuffix ? (
                <span className="text-base leading-none font-medium opacity-80">{valueSuffix}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

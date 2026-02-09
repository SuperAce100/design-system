"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getStepPrecision = (step: number) => {
  const stepText = step.toString();
  if (stepText.includes("e-")) {
    const [, exponent = "0"] = stepText.split("e-");
    return Number.parseInt(exponent, 10) || 0;
  }

  const [, decimals = ""] = stepText.split(".");
  return decimals.length;
};

const resolveStep = (step: number | undefined) =>
  Number.isFinite(step) && (step ?? 0) > 0 ? (step as number) : 1;

const snapToStep = (value: number, min: number, max: number, step: number) => {
  const normalized = clamp(value, min, max);
  const precision = Math.min(getStepPrecision(step) + 2, 8);
  const snapped = Math.round((normalized - min) / step) * step + min;
  return Number(clamp(snapped, min, max).toFixed(precision));
};

const formatValue = (value: number, step: number) => {
  const precision = Math.min(getStepPrecision(step), 4);
  if (precision === 0) {
    return `${Math.round(value)}`;
  }
  return value.toFixed(precision).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
};

const sliderSurfaceClassName =
  "border-input dark:bg-input/30 rounded-xl border bg-transparent shadow-md shadow-shade transition-all duration-150 ease-out hover:bg-muted hover:border-border/0 hover:shadow-none";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  (
    {
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step,
      disabled,
      onValueChange,
      onValueCommit,
      onDoubleClick,
      ...props
    },
    ref
  ) => {
    const safeStep = resolveStep(step);
    const isControlled = value !== undefined;

    const initialValues = React.useMemo(() => defaultValue ?? [min], [defaultValue, min]);
    const [internalValues, setInternalValues] = React.useState<number[]>(initialValues);
    const values = React.useMemo(
      () => (isControlled ? (value ?? [min]) : internalValues),
      [internalValues, isControlled, min, value]
    );
    const primaryValue = values[0] ?? min;

    const [isEditing, setIsEditing] = React.useState(false);
    const [draftValue, setDraftValue] = React.useState(formatValue(primaryValue, safeStep));
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (!isControlled) {
        setInternalValues(initialValues);
      }
    }, [initialValues, isControlled]);

    React.useEffect(() => {
      if (!isEditing) {
        setDraftValue(formatValue(primaryValue, safeStep));
      }
    }, [isEditing, primaryValue, safeStep]);

    React.useEffect(() => {
      if (!isEditing) {
        return;
      }

      inputRef.current?.focus();
      inputRef.current?.select();
    }, [isEditing]);

    const emitValues = (nextValues: number[], options?: { commit?: boolean }) => {
      if (!isControlled) {
        setInternalValues(nextValues);
      }

      onValueChange?.(nextValues);
      if (options?.commit) {
        onValueCommit?.(nextValues);
      }
    };

    const handleDoubleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      (onDoubleClick as React.MouseEventHandler<HTMLElement> | undefined)?.(event);
      if (event.defaultPrevented || disabled) {
        return;
      }

      setDraftValue(formatValue(primaryValue, safeStep));
      setIsEditing(true);
    };

    const commitInput = (cancel = false) => {
      if (cancel) {
        setIsEditing(false);
        return;
      }

      const parsed = Number.parseFloat(draftValue);
      if (Number.isNaN(parsed)) {
        setIsEditing(false);
        return;
      }

      const nextValues = values.length > 0 ? [...values] : [min];
      nextValues[0] = snapToStep(parsed, min, max, safeStep);
      emitValues(nextValues, { commit: true });
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <input
          ref={inputRef}
          type="number"
          step={safeStep}
          min={min}
          max={max}
          value={draftValue}
          data-slot="slider-input"
          className={cn(
            "h-10 w-full px-3 py-2 text-center text-sm font-medium outline-none",
            "focus-visible:border-primary focus-visible:ring-primary/30 focus-visible:ring-[3px]",
            sliderSurfaceClassName,
            className
          )}
          onChange={(event) => {
            setDraftValue(event.target.value);
          }}
          onBlur={() => {
            commitInput();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commitInput();
              return;
            }

            if (event.key === "Escape") {
              event.preventDefault();
              commitInput(true);
            }
          }}
        />
      );
    }

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        min={min}
        max={max}
        step={safeStep}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={cn(
          "relative flex h-10 w-full touch-none items-center px-1.5",
          "focus-within:border-primary focus-within:ring-primary/30 focus-within:ring-[3px]",
          "disabled:pointer-events-none disabled:opacity-50",
          sliderSurfaceClassName,
          className
        )}
        onValueChange={(nextValues) => {
          emitValues(nextValues);
        }}
        onValueCommit={onValueCommit}
        onDoubleClick={handleDoubleClick}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-full w-full overflow-hidden rounded-[0.65rem]">
          <SliderPrimitive.Range className="absolute h-full bg-primary/30" />
        </SliderPrimitive.Track>
        {(values.length ? values : [min]).map((_, index) => (
          <SliderPrimitive.Thumb
            key={`thumb-${index}`}
            className={cn(
              "block w-0.5 rounded-full border-0 bg-primary",
              "h-[calc(100%-8px)] shadow-none",
              "focus-visible:outline-none"
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

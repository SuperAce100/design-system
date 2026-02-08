"use client";

import * as React from "react";
import { Paintbrush, X, Check, Copy, RotateCcw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/blocks/button/button";
import { useThemeConfig } from "@/lib/theme-context";
import {
  type ThemeConfig,
  type NeutralScale,
  type PrimaryColor,
  type BackgroundShade,
  type FontOption,
  NEUTRAL_LABELS,
  PRIMARY_LABELS,
  FONT_OPTIONS,
  FONT_OPTION_LABELS,
  NEUTRAL_DISPLAY_COLORS,
  PRIMARY_DISPLAY_COLORS,
  BACKGROUND_PRESETS,
  getBackgroundDisplayColors,
  getFontFamilyForOption,
  generateGlobalsCss,
} from "@/lib/theme-config";
import { ColorPicker } from "@/registry/new-york/blocks/color-picker/color-picker";

// ---------------------------------------------------------------------------
// Theme Customizer (collapsible drawer)
// ---------------------------------------------------------------------------

export function ThemeCustomizer() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg size-8 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Customize theme"
      >
        <Paintbrush className="size-4" />
      </button>
      <ThemeDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

function ThemeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [shouldRender, setShouldRender] = React.useState(open);

  React.useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const handleTransitionEnd = React.useCallback(() => {
    if (!open) setShouldRender(false);
  }, [open]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={cn(
          "relative ml-auto flex h-full w-[340px] max-w-full flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-out [&_button]:focus-visible:ring-0 [&_button]:focus-visible:ring-offset-0 [&_button]:focus-visible:border-transparent",
          open ? "translate-x-0" : "translate-x-full"
        )}
        onTransitionEnd={handleTransitionEnd}
      >
        <DrawerContent onClose={onClose} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Drawer content
// ---------------------------------------------------------------------------

function DrawerContent({ onClose }: { onClose: () => void }) {
  const { config, setConfig, resetConfig } = useThemeConfig();
  const [copied, setCopied] = React.useState(false);

  const handleCopyCss = React.useCallback(() => {
    const css = generateGlobalsCss(config);
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [config]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-xl font-medium tracking-tight">Edit Theme</h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-lg size-7 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close theme panel"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-7">
        {/* Neutral */}
        <Section title="Neutral" description="The neutral scale of the theme">
          <div className="flex items-center gap-2">
            {(Object.keys(NEUTRAL_LABELS) as NeutralScale[]).map((scale) => (
              <ColorSwatch
                key={scale}
                color={NEUTRAL_DISPLAY_COLORS[scale]}
                label={NEUTRAL_LABELS[scale]}
                active={config.neutral === scale}
                onClick={() => setConfig((p) => ({ ...p, neutral: scale }))}
              />
            ))}
          </div>
        </Section>

        {/* Primary */}
        <PrimarySection config={config} setConfig={setConfig} />

        {/* Typography */}
        <Section title="Typography" description="Fonts for headings and body text">
          <div className="flex flex-col gap-3">
            <FontOptionPicker
              label="Heading font"
              selectedFont={config.headingFont}
              onChange={(font) => setConfig((p) => ({ ...p, headingFont: font }))}
            />
            <FontOptionPicker
              label="Body font"
              selectedFont={config.bodyFont}
              onChange={(font) => setConfig((p) => ({ ...p, bodyFont: font }))}
            />
          </div>
        </Section>

        {/* Radius */}
        <Section title="Radius" description="How rounded the elements are">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1}
              step={0.025}
              value={config.radius}
              onChange={(e) => setConfig((p) => ({ ...p, radius: Number(e.target.value) }))}
              className="w-full accent-primary h-1.5 rounded-full appearance-none bg-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-sm"
            />
            <span className="text-xs text-muted-foreground tabular-nums w-10 text-right font-mono">
              {config.radius.toFixed(2)}
            </span>
          </div>
        </Section>

        {/* Background */}
        <Section title="Background" description="How dark the page background is">
          <div className="flex items-center gap-2">
            {BACKGROUND_PRESETS.map((preset) => {
              const bgColors = getBackgroundDisplayColors(config.neutral);
              return (
                <ColorSwatch
                  key={preset.value}
                  color={bgColors[preset.value]}
                  label={preset.label}
                  active={config.backgroundShade === preset.value}
                  onClick={() =>
                    setConfig((p) => ({ ...p, backgroundShade: preset.value as BackgroundShade }))
                  }
                />
              );
            })}
          </div>
        </Section>

        {/* Shadow Depth */}
        <Section
          title="Shadow Depth"
          description="How elevated the shadow is relative to the element"
        >
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={config.shadowDepth}
              onChange={(e) => setConfig((p) => ({ ...p, shadowDepth: Number(e.target.value) }))}
              className="w-full accent-primary h-1.5 rounded-full appearance-none bg-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-sm"
            />
            <span className="text-xs text-muted-foreground tabular-nums w-7 text-right">
              {config.shadowDepth}
            </span>
          </div>
        </Section>

        {/* Shadow Opacity */}
        <Section title="Shadow Opacity" description="How subtle the shadow is">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={config.shadowOpacity}
              onChange={(e) => setConfig((p) => ({ ...p, shadowOpacity: Number(e.target.value) }))}
              className="w-full accent-primary h-1.5 rounded-full appearance-none bg-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-sm"
            />
            <span className="text-xs text-muted-foreground tabular-nums w-7 text-right">
              {config.shadowOpacity}
            </span>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-4">
        <Button variant="ghost" size="sm" onClick={handleCopyCss} className="flex-1">
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy CSS
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetConfig}
          aria-label="Reset theme to defaults"
          className="flex-1"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Primary Section (with popover custom picker)
// ---------------------------------------------------------------------------

function PrimarySection({
  config,
  setConfig,
}: {
  config: { primary: PrimaryColor; customPrimary?: string };
  setConfig: (fn: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => void;
}) {
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  // Close popover on outside click
  React.useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setPickerOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [pickerOpen]);

  // Close on ESC (capture so it doesn't close the drawer too)
  React.useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setPickerOpen(false);
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [pickerOpen]);

  const isCustomActive = !!config.customPrimary;

  return (
    <Section title="Primary" description="The primary color of the theme">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRIMARY_LABELS) as PrimaryColor[]).map((color) => (
          <ColorSwatch
            key={color}
            color={PRIMARY_DISPLAY_COLORS[color]}
            label={PRIMARY_LABELS[color]}
            active={config.primary === color && !config.customPrimary}
            onClick={() => {
              setConfig((p: ThemeConfig) => ({ ...p, primary: color, customPrimary: undefined }));
              setPickerOpen(false);
            }}
          />
        ))}

        {/* Custom color swatch – matches the other swatches in size/shape */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setPickerOpen((v) => !v)}
          className={cn(
            "group relative size-8 rounded-full border-2 transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isCustomActive
              ? "border-foreground scale-110"
              : "border-transparent hover:border-foreground/30"
          )}
          title="Custom color"
          aria-label="Custom color"
          aria-pressed={isCustomActive}
        >
          {isCustomActive ? (
            <>
              <span
                className="absolute inset-[2px] rounded-full"
                style={{ backgroundColor: config.customPrimary }}
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className="size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              </span>
            </>
          ) : (
            <>
              <span
                className="absolute inset-[2px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, oklch(0.7 0.25 0), oklch(0.7 0.25 60), oklch(0.7 0.25 120), oklch(0.7 0.25 180), oklch(0.7 0.25 240), oklch(0.7 0.25 300), oklch(0.7 0.25 360))",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <Plus className="size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Color picker popover – renders below the swatch grid */}
      {pickerOpen && (
        <div ref={popoverRef} className="rounded-lg p-3 animate-in fade-in-0 zoom-in-95">
          <ColorPicker
            value={config.customPrimary ?? PRIMARY_DISPLAY_COLORS[config.primary]}
            onValueChange={(val) => {
              setConfig((p: ThemeConfig) => ({ ...p, customPrimary: val }));
            }}
            format="oklch"
            presets="tailwind"
          />
        </div>
      )}
    </Section>
  );
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

function FontOptionPicker({
  label,
  selectedFont,
  onChange,
}: {
  label: string;
  selectedFont: FontOption;
  onChange: (font: FontOption) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {FONT_OPTIONS.map((font) => (
          <Button
            key={font}
            type="button"
            size="xs"
            variant="ghost"
            className={cn(
              "h-auto min-h-0 rounded-md border px-2 py-1 text-xs shadow-none",
              selectedFont === font
                ? "border-transparent bg-foreground text-background hover:bg-foreground/90"
                : "border-border bg-background text-foreground hover:bg-muted"
            )}
            onClick={() => onChange(font)}
            aria-pressed={selectedFont === font}
            style={{ fontFamily: getFontFamilyForOption(font) }}
          >
            {FONT_OPTION_LABELS[font]}
          </Button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-0.5">
        <label className="text-md font-medium tracking-tight text-foreground">{title}</label>
        <label className="text-sm text-muted-foreground">{description}</label>
      </div>
      {children}
    </div>
  );
}

function ColorSwatch({
  color,
  label,
  active,
  onClick,
}: {
  color: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative size-8 rounded-full border-2 transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active ? "border-foreground scale-110" : "border-transparent hover:border-foreground/30"
      )}
      title={label}
      aria-label={label}
      aria-pressed={active}
    >
      <span className="absolute inset-[2px] rounded-full" style={{ backgroundColor: color }} />
      {active && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check className="size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        </span>
      )}
    </button>
  );
}

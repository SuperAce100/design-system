"use client";

import * as React from "react";
import { Paintbrush, X, Check, Copy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeConfig } from "@/lib/theme-context";
import {
  type NeutralScale,
  type PrimaryColor,
  type BackgroundShade,
  NEUTRAL_LABELS,
  PRIMARY_LABELS,
  NEUTRAL_DISPLAY_COLORS,
  PRIMARY_DISPLAY_COLORS,
  RADIUS_PRESETS,
  BACKGROUND_PRESETS,
  generateGlobalsCss,
} from "@/lib/theme-config";

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
          "relative ml-auto flex h-full w-[340px] max-w-full flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-out",
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
        <Section title="Primary" description="The primary color of the theme">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PRIMARY_LABELS) as PrimaryColor[]).map((color) => (
              <ColorSwatch
                key={color}
                color={PRIMARY_DISPLAY_COLORS[color]}
                label={PRIMARY_LABELS[color]}
                active={config.primary === color}
                onClick={() => setConfig((p) => ({ ...p, primary: color }))}
              />
            ))}
          </div>
        </Section>

        {/* Radius */}
        <Section title="Radius" description="How rounded the elements are">
          <div className="flex items-center gap-2">
            {RADIUS_PRESETS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setConfig((p) => ({ ...p, radius: r }))}
                className={cn(
                  "flex items-center justify-center size-9 border-2 transition-colors rounded-lg text-xs font-mono",
                  config.radius === r
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </Section>

        {/* Background */}
        <Section title="Background" description="How dark the page background is">
          <div className="flex items-center gap-2">
            {BACKGROUND_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() =>
                  setConfig((p) => ({ ...p, backgroundShade: preset.value as BackgroundShade }))
                }
                className={cn(
                  "flex items-center justify-center h-9 px-3 border-2 transition-colors rounded-lg text-xs font-mono",
                  config.backgroundShade === preset.value
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                {preset.label}
              </button>
            ))}
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
      <div className="flex items-center gap-2 px-5 py-4 border-t">
        <button
          type="button"
          onClick={handleCopyCss}
          className={cn(
            "flex-1 inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
            copied
              ? "border-success/50 bg-success/10 text-success"
              : "border-border hover:bg-muted text-foreground"
          )}
        >
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
        </button>
        <button
          type="button"
          onClick={resetConfig}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Reset theme to defaults"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>
    </>
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

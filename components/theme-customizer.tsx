"use client";

import * as React from "react";
import { Paintbrush, X, Check, Copy, RotateCcw, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button as UiButton } from "@/components/ui/button";
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
  BACKGROUND_PRESETS_LIGHT,
  BACKGROUND_PRESETS_DARK,
  getBackgroundDisplayColors,
  getFontFamilyForOption,
  generateGlobalsCss,
} from "@/lib/theme-config";
import { ColorPicker } from "@/registry/new-york/blocks/color-picker/color-picker";

// ---------------------------------------------------------------------------
// Theme Customizer (floating panel)
// ---------------------------------------------------------------------------

export function ThemeCustomizer() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <UiButton
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
        className="text-foreground"
        aria-label="Customize theme"
      >
        <Paintbrush className="size-4" />
      </UiButton>
      <ThemeDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Floating panel
// ---------------------------------------------------------------------------

function ThemeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-transparent"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Theme customizer"
            className="absolute right-3 top-3 bottom-3 flex w-[min(22rem,calc(100vw-1.5rem))] max-w-full flex-col rounded-2xl border bg-background shadow-2xl will-change-transform sm:right-4 sm:top-4 sm:bottom-4 sm:w-[360px] [&_button]:focus-visible:ring-0 [&_button]:focus-visible:ring-offset-0 [&_button]:focus-visible:border-transparent"
            initial={{ x: "105%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "105%", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <DrawerContent onClose={onClose} />
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Drawer content
// ---------------------------------------------------------------------------

function DrawerContent({ onClose }: { onClose: () => void }) {
  const { config, setConfig, resetConfig } = useThemeConfig();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [copied, setCopied] = React.useState(false);

  const handleCopyCss = React.useCallback(() => {
    const css = generateGlobalsCss(config);
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [config]);

  const backgroundPresets = isDark ? BACKGROUND_PRESETS_DARK : BACKGROUND_PRESETS_LIGHT;
  const bgColors = getBackgroundDisplayColors(config.neutral, isDark ? "dark" : "light");

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 pb-2">
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
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-8">
        <SectionGroup title="Colors">
          <Section title="Neutral" description="The neutral scale of the theme">
            <div className="flex items-center gap-1">
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

          <Section title="Background" description="How dark the page background is">
            <div className="flex items-center gap-2">
              {backgroundPresets.map((preset) => (
                  <ColorSwatch
                    key={preset.value}
                    color={bgColors[preset.value]}
                    label={preset.label}
                    active={config.backgroundShade === preset.value}
                    onClick={() =>
                      setConfig((p) => ({ ...p, backgroundShade: preset.value as BackgroundShade }))
                    }
                  />
              ))}
            </div>
          </Section>

          <PrimarySection config={config} setConfig={setConfig} />
        </SectionGroup>

        <SectionGroup title="Typography">
          <Section title="Fonts" description="Fonts for headings and body text">
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
        </SectionGroup>

        <SectionGroup title="Styling">
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

          <Section title="Shadow Opacity" description="How subtle the shadow is">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={config.shadowOpacity}
                onChange={(e) =>
                  setConfig((p) => ({ ...p, shadowOpacity: Number(e.target.value) }))
                }
                className="w-full accent-primary h-1.5 rounded-full appearance-none bg-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-sm"
              />
              <span className="text-xs text-muted-foreground tabular-nums w-7 text-right">
                {config.shadowOpacity}
              </span>
            </div>
          </Section>
        </SectionGroup>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-4 pt-2">
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
      <div className="flex flex-wrap gap-1">
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
            "group relative h-8 w-15 rounded-xs transition-all duration-150 hover:scale-110",
            isCustomActive && "inset-ring-2 inset-ring-foreground/30 scale-110"
          )}
          title="Custom color"
          aria-label="Custom color"
          aria-pressed={isCustomActive}
        >
          {isCustomActive ? (
            <>
              <span
                className="absolute inset-0 rounded-xs"
                style={{ backgroundColor: config.customPrimary }}
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className="size-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              </span>
            </>
          ) : (
            <>
              <span
                className="absolute inset-0 rounded-xs"
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
            variant={selectedFont === font ? "secondary" : "ghost"}
            className={cn("h-auto min-h-0 rounded-md px-2 py-1 text-xs")}
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

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-[11px] font-semibold uppercase font-sans tracking-[0.14em] text-muted-foreground/80">
        {title}
      </h3>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
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
        <h4 className="text-sm font-medium tracking-tight text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
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
  darkText = false,
}: {
  color: string;
  label: string;
  active: boolean;
  darkText?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative h-8 w-15 rounded-xs transition-all duration-150 hover:scale-110",
        active && "inset-ring-2 inset-ring-foreground/30"
      )}
      title={label}
      aria-label={label}
      aria-pressed={active}
    >
      <span className="absolute inset-0 rounded-xs" style={{ backgroundColor: color }} />
      <div className="absolute inset-1 flex items-center justify-center">
        {active && <Check className="size-3.5 text-white" />}
        <div
          className="text-[11px] w-full truncate"
          style={{
            color: darkText ? "var(--color-background)" : "var(--color-foreground)",
          }}
        >
          {label}
        </div>
      </div>
    </button>
  );
}

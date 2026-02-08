"use client";

import * as React from "react";
import {
  type ThemeConfig,
  type FontOption,
  DEFAULT_CONFIG,
  FONT_OPTIONS,
  applyThemeToDOM,
  removeThemeFromDOM,
} from "./theme-config";

const STORAGE_KEY = "theme-config";

type ThemeConfigContextValue = {
  config: ThemeConfig;
  setConfig: (config: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => void;
  resetConfig: () => void;
  /** True once the client has hydrated (avoids flash). */
  mounted: boolean;
};

const ThemeConfigContext = React.createContext<ThemeConfigContextValue | null>(null);

function isFontOption(value: unknown): value is FontOption {
  return typeof value === "string" && FONT_OPTIONS.includes(value as FontOption);
}

function isValidConfig(value: unknown): value is ThemeConfig {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.neutral === "string" &&
    typeof obj.primary === "string" &&
    typeof obj.radius === "number" &&
    typeof obj.backgroundShade === "number" &&
    typeof obj.shadowDepth === "number" &&
    typeof obj.shadowOpacity === "number" &&
    isFontOption(obj.headingFont) &&
    isFontOption(obj.bodyFont)
  );
}

/** Migrate old configs that may be missing new fields. */
function migrateConfig(raw: Record<string, unknown>): ThemeConfig | null {
  if (
    typeof raw.neutral !== "string" ||
    typeof raw.primary !== "string" ||
    typeof raw.radius !== "number"
  )
    return null;

  const config: ThemeConfig = {
    neutral: raw.neutral as ThemeConfig["neutral"],
    primary: raw.primary as ThemeConfig["primary"],
    radius: raw.radius as number,
    backgroundShade:
      typeof raw.backgroundShade === "number"
        ? (raw.backgroundShade as ThemeConfig["backgroundShade"])
        : DEFAULT_CONFIG.backgroundShade,
    shadowDepth: typeof raw.shadowDepth === "number" ? raw.shadowDepth : DEFAULT_CONFIG.shadowDepth,
    shadowOpacity:
      typeof raw.shadowOpacity === "number" ? raw.shadowOpacity : DEFAULT_CONFIG.shadowOpacity,
    headingFont: isFontOption(raw.headingFont) ? raw.headingFont : DEFAULT_CONFIG.headingFont,
    bodyFont: isFontOption(raw.bodyFont) ? raw.bodyFont : DEFAULT_CONFIG.bodyFont,
  };

  // Preserve customPrimary if present
  if (typeof raw.customPrimary === "string") {
    config.customPrimary = raw.customPrimary;
  }

  return config;
}

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = React.useState<ThemeConfig>(DEFAULT_CONFIG);
  const [mounted, setMounted] = React.useState(false);

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isValidConfig(parsed)) {
          setConfigState(parsed);
          applyThemeToDOM(parsed);
        } else if (typeof parsed === "object" && parsed !== null) {
          // Attempt migration from older config format
          const migrated = migrateConfig(parsed as Record<string, unknown>);
          if (migrated) {
            setConfigState(migrated);
            applyThemeToDOM(migrated);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          }
        }
      }
    } catch {
      // Corrupt / missing storage – fall through to defaults
    }
    setMounted(true);
  }, []);

  const setConfig = React.useCallback(
    (update: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => {
      setConfigState((prev) => {
        const next = typeof update === "function" ? update(prev) : update;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Storage full or unavailable – silent fail
        }
        applyThemeToDOM(next);
        return next;
      });
    },
    []
  );

  const resetConfig = React.useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
    removeThemeFromDOM();
    setConfigState(DEFAULT_CONFIG);
  }, []);

  const value = React.useMemo(
    () => ({ config, setConfig, resetConfig, mounted }),
    [config, setConfig, resetConfig, mounted]
  );

  return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}

export function useThemeConfig(): ThemeConfigContextValue {
  const ctx = React.useContext(ThemeConfigContext);
  if (!ctx) {
    throw new Error("useThemeConfig must be used within a ThemeConfigProvider");
  }
  return ctx;
}

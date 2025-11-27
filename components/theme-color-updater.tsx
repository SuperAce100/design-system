"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const DATA_ATTRIBUTE = "data-dynamic-theme-color";

export function ThemeColorUpdater() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateThemeColor = () => {
      const background = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();

      if (!background) {
        return;
      }

      const selector = `meta[name="theme-color"][${DATA_ATTRIBUTE}]`;
      let meta =
        document.head.querySelector<HTMLMetaElement>(selector) ?? null;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "theme-color");
        meta.setAttribute(DATA_ATTRIBUTE, "true");
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", background);
    };

    updateThemeColor();
  }, [resolvedTheme]);

  return null;
}

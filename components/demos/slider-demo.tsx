"use client";

import * as React from "react";

import { Slider } from "@/registry/new-york/blocks/slider/slider";

export default function SliderDemo() {
  const [primaryValue, setPrimaryValue] = React.useState(82);
  const [accentValue, setAccentValue] = React.useState(34);

  return (
    <div className="w-full max-w-[680px] space-y-8 py-4">
      <div className="space-y-3">
        <Slider value={primaryValue} onValueChange={setPrimaryValue} aria-label="Primary slider" />
        <p className="text-center text-xs text-muted-foreground">
          Drag anywhere on the track. Double-click the value bubble to type a number.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <Slider
          value={accentValue}
          onValueChange={setAccentValue}
          aria-label="Accent slider"
          style={
            {
              "--slider-bg": "var(--background)",
              "--slider-border": "var(--input)",
              "--slider-bar": "var(--primary)",
              "--slider-pill-bg": "var(--accent)",
              "--slider-pill-fg": "var(--accent-foreground)",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

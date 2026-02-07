"use client";

import * as React from "react";
import {
  ColorPicker,
  formatColor,
  parseColor,
  type ColorFormat,
} from "@/registry/new-york/blocks/color-picker/color-picker";

export default function ColorPickerDemo() {
  const [color, setColor] = React.useState("oklch(0.6847 0.1479 237.32)");
  const [format, setFormat] = React.useState<ColorFormat>("oklch");

  const parsed = parseColor(color);
  const formats: ColorFormat[] = ["oklch", "hex", "rgb", "hsl"];

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <ColorPicker
        value={color}
        onValueChange={setColor}
        format={format}
        showAlpha
        presets="tailwind"
      />

      <div className="flex flex-col items-center gap-2 text-xs w-[264px]">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Format:</span>
          {formats.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFormat(f);
                setColor(formatColor(parsed, f));
              }}
              className={`rounded-md px-1.5 py-0.5 uppercase font-medium transition-colors ${
                format === f
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <code className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md truncate max-w-full">
          {color}
        </code>
      </div>
    </div>
  );
}

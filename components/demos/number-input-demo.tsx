"use client";

import * as React from "react";

import { NumberInput } from "@/registry/new-york/blocks/number-input/number-input";

export default function NumberInputDemo() {
  const [value, setValue] = React.useState(12);

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Drag the handle or use arrow keys.</p>
        <NumberInput
          value={value}
          min={0}
          max={100}
          step={1}
          aria-label="Quantity"
          onValueChange={setValue}
        />
      </div>
      <p className="rounded-lg border border-dashed border-border/60 px-3 py-2 text-xs text-muted-foreground">
        Current value: <span className="font-medium text-foreground">{value}</span>
      </p>
      <NumberInput defaultValue={1.5} min={0} max={10} step={0.25} aria-label="Opacity" />
    </div>
  );
}

"use client";

import * as React from "react";

import { Slider } from "@/registry/new-york/blocks/slider/slider";

export default function SliderDemo() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="w-full max-w-[560px] space-y-2 py-2">
      <Slider value={value} onValueChange={setValue} aria-label="Wave slider" />
      <p className="text-center text-[11px] text-muted-foreground">
        Drag anywhere. Double-click the number to type a value.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";

import { Slider } from "@/registry/new-york/blocks/slider/slider";

export default function SliderDemo() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="w-full max-w-[520px] py-1">
      <Slider value={value} min={-20} max={120} onValueChange={setValue} aria-label="Wave slider" />
    </div>
  );
}

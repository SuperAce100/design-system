"use client";

import * as React from "react";

import { Slider } from "@/registry/new-york/blocks/slider/slider";

export default function SliderDemo() {
  const [value, setValue] = React.useState([42]);

  return (
    <div className="w-full max-w-[520px] py-1">
      <Slider value={value} onValueChange={setValue} min={0} max={100} aria-label="Value" />
    </div>
  );
}

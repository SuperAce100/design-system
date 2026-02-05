"use client";

import * as React from "react";
import { AsciiWave } from "@/registry/new-york/blocks/ascii-wave/ascii-wave";

export default function AsciiWaveDemo() {
  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-border/50 bg-white">
      <AsciiWave
        leftImage="/images/backgrounds/mountain-l-color.png"
        rightImage="/images/backgrounds/mountain-r-color.png"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center space-y-3 max-w-lg px-8 -mt-8">
            <h1 className="text-4xl font-semibold font-serif tracking-tight text-foreground">
              Beauty is in simplicity
            </h1>
          </div>
        </div>
      </AsciiWave>
    </div>
  );
}

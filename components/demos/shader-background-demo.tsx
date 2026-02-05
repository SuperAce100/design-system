"use client";

import * as React from "react";
import { ShaderBackground } from "@/registry/new-york/blocks/shader-background/shader-background";

export default function ShaderBackgroundDemo() {
  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border/50">
      <ShaderBackground
        color1="#5a9fd4"
        color2="#8b7cb8"
        color3="#c8ddf0"
        noiseScale={1.8}
        flowSpeed={0.08}
        edgeFade={0.4}
      >
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-center space-y-4 max-w-lg px-8">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Ethereal Background
            </h1>
            <p className="text-lg text-gray-600">
              A subtle, flowing shader background inspired by exa.ai. The soft colors gently animate
              while the overall pattern remains stable.
            </p>
          </div>
        </div>
      </ShaderBackground>
    </div>
  );
}

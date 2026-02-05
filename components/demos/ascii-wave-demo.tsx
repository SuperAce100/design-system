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
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              The best search API for AI
            </h1>
            <p className="text-lg text-gray-500">
              Powering agents with fast, high-quality web search
            </p>
            <div className="pt-4">
              <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                Try the API for free
              </button>
            </div>
          </div>
        </div>
      </AsciiWave>
    </div>
  );
}

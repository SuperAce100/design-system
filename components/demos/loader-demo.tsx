"use client";

import * as React from "react";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  return (
    <div className="flex flex-col gap-12 p-8 max-w-4xl mx-auto">
      {/* Variants showcase */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Variants</h3>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Loader variant="default" />
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader variant="neon" />
            <span className="text-xs text-muted-foreground">neon</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader variant="monochrome" />
            <span className="text-xs text-muted-foreground">monochrome</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader variant="warm" />
            <span className="text-xs text-muted-foreground">warm</span>
          </div>
        </div>
      </div>

      {/* Sizes showcase */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
        <div className="flex items-end justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader size="sm" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="default" />
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="lg" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
        </div>
      </div>

      {/* Custom props example */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Custom</h3>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader
              width={100}
              height={100}
              colorBack="#0f0f23"
              colorFront="#ff00ff"
              type="8x8"
              speed={1.5}
              scale={0.4}
            />
            <span className="text-xs text-muted-foreground">custom props</span>
          </div>
        </div>
      </div>
    </div>
  );
}

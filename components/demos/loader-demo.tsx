"use client";

import * as React from "react";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  return (
    <div className="flex flex-col gap-12 p-8 max-w-4xl mx-auto">
      {/* Sphere variants */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Sphere</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader shape="sphere" variant="plain" />
            <span className="text-xs text-muted-foreground">plain</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader shape="sphere" variant="blur" />
            <span className="text-xs text-muted-foreground">blur</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader shape="sphere" variant="dither" />
            <span className="text-xs text-muted-foreground">dither</span>
          </div>
        </div>
      </div>

      {/* Swirl variants */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Swirl</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader shape="swirl" variant="plain" color="#a855f7" />
            <span className="text-xs text-muted-foreground">plain</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader shape="swirl" variant="blur" color="#a855f7" />
            <span className="text-xs text-muted-foreground">blur</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader shape="swirl" variant="dither" color="#a855f7" />
            <span className="text-xs text-muted-foreground">dither</span>
          </div>
        </div>
      </div>

      {/* Ripple variants */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Ripple</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Loader shape="ripple" variant="plain" color="#22d3ee" />
            <span className="text-xs text-muted-foreground">plain</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader shape="ripple" variant="blur" color="#22d3ee" />
            <span className="text-xs text-muted-foreground">blur</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader shape="ripple" variant="dither" color="#22d3ee" />
            <span className="text-xs text-muted-foreground">dither</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
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
    </div>
  );
}

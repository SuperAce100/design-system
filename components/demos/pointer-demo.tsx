"use client";

import * as React from "react";
import { Pointer, PointerLayer, usePointer } from "@/registry/new-york/blocks/pointer/pointer";
import { Button } from "@/registry/new-york/blocks/button/button";

export default function PointerDemo() {
  const { x, y, thoughts, moveTo } = usePointer({ x: 24, y: 24 });

  const randomMove = React.useCallback(() => {
    const container = document.querySelector("[data-pointer-layer]") as HTMLElement | null;
    const rect = container?.getBoundingClientRect();
    const nx = rect
      ? Math.floor(Math.random() * Math.max(0, rect.width - 24))
      : Math.floor(Math.random() * 280);
    const ny = rect
      ? Math.floor(Math.random() * Math.max(0, rect.height - 24))
      : Math.floor(Math.random() * 160);
    const thoughts = ["On it", "Navigating", "Working", "Moving", "Queued"];
    const pick = thoughts[Math.floor(Math.random() * thoughts.length)];
    moveTo({ x: nx, y: ny, thoughts: pick });
  }, [moveTo]);

  return (
    <div className="flex flex-col gap-4 w-full h-ful min-h-0 flex-1">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={randomMove}>
          Random move
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => moveTo({ x: 24, y: 24, thoughts: "Reset position" })}
        >
          Reset
        </Button>
      </div>

      <PointerLayer
        className="relative w-full h-[300px] border border-dashed rounded-2xl flex-1 min-h-0"
        data-pointer-layer
      >
        <Pointer x={x} y={y} thoughts={thoughts ?? undefined} />
      </PointerLayer>
    </div>
  );
}

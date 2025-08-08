"use client";

import { Window, WindowContainer } from "@/registry/new-york/blocks/window/window";

export default function WindowDemo() {
  return (
    <div className="w-full h-[380px]">
      <WindowContainer className="w-full h-full border border-border rounded-2xl bg-muted/30">
        <Window title="Notes" initialX={24} initialY={24} initialWidth={320} initialHeight={180}>
          <p className="text-sm text-muted-foreground">
            Drag by the header. Resize from right, bottom, or corner.
          </p>
        </Window>
        <Window title="Preview" initialX={180} initialY={120} initialWidth={360} initialHeight={200}>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Windows stay within the container.</p>
            <p>You can have multiple windows.</p>
          </div>
        </Window>
      </WindowContainer>
    </div>
  );
}



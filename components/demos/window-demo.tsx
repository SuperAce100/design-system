"use client";

import * as React from "react";
import { Window, WindowContainer } from "@/registry/new-york/blocks/window/window";

export default function WindowDemo() {
  const [windows, setWindows] = React.useState([
    { id: 1, title: "Notes", x: 24, y: 24, w: 320, h: 180 },
    { id: 2, title: "Preview", x: 180, y: 120, w: 360, h: 200 },
  ]);

  return (
    <div className="w-full h-[380px]">
      <WindowContainer className="w-full h-full border border-border border-dashed rounded-2xl">
        {windows.map((w) => (
          <Window
            key={w.id}
            title={w.title}
            initialX={w.x}
            initialY={w.y}
            initialWidth={w.w}
            initialHeight={w.h}
            onClose={() => setWindows((prev) => prev.filter((x) => x.id !== w.id))}
          >
            {w.id === 1 ? (
              <p className="text-sm text-muted-foreground">
                Drag by the header. Resize from any side or corner.
              </p>
            ) : (
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Windows stay within the container.</p>
                <p>You can have multiple windows.</p>
              </div>
            )}
          </Window>
        ))}
      </WindowContainer>
    </div>
  );
}



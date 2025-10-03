"use client";

import * as React from "react";
import { InvisibleInput } from "@/components/ui/invisible-input";

export default function InvisibleInputDemo() {
  const [value, setValue] = React.useState("Type to edit me like plain text");

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="text-sm text-muted-foreground">Looks like text, edits like input</div>
      <InvisibleInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Invisible input"
        className="text-base text-foreground"
      />
      <div className="text-xs text-muted-foreground">
        Try styling via className. It&apos;s fully unstyled.
      </div>
      <InvisibleInput
        defaultValue="Try me with underline and monospace"
        className="text-sm underline font-mono"
        aria-label="Styled invisible input"
      />
    </div>
  );
}

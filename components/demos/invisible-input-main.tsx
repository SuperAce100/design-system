"use client";

import * as React from "react";
import { InvisibleInput } from "@/components/ui/invisible-input";

export default function InvisibleInputMain() {
  const [value, setValue] = React.useState("Click to edit this text");

  return (
    <div className="w-full max-w-md">
      <InvisibleInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Editable text"
        className="text-base text-foreground"
      />
    </div>
  );
}

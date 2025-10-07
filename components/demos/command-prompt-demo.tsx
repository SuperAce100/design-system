"use client";
import * as React from "react";

import { CommandPromptOverlay } from "@/registry/new-york/blocks/command-prompt/command-prompt";

const DEFAULT_SUGGESTIONS = [
  { value: "open settings", description: "Navigate to preferences" },
  { value: "new file", description: "Create a blank document" },
  { value: "search projects", description: "Find a project by name" },
  { value: "toggle theme", description: "Switch light/dark" },
  { value: "install component", description: "Install from registry" },
  { value: "help", description: "Show available commands" },
];

export default function CommandPromptDemo() {
  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground">
        <kbd className="rounded-md border border-input bg-background px-2 py-1 text-xs shadow-xs">
          ⌘K
        </kbd>
      </div>
      <CommandPromptOverlay placeholder="Type a command..." suggestions={DEFAULT_SUGGESTIONS} />
    </div>
  );
}

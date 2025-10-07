"use client";
import * as React from "react";

import {
  CommandPrompt,
  CommandPromptOverlay,
} from "@/registry/new-york/blocks/command-prompt/command-prompt";

const DEFAULT_SUGGESTIONS = [
  { value: "open settings", description: "Navigate to preferences" },
  { value: "new file", description: "Create a blank document" },
  { value: "search projects", description: "Find a project by name" },
  { value: "toggle theme", description: "Switch light/dark" },
  { value: "install component", description: "Install from registry" },
  { value: "help", description: "Show available commands" },
];

export default function CommandPromptDemo() {
  const [output, setOutput] = React.useState<string>("Press Cmd+K to open. Use ↑/↓, Tab, Enter.");

  function handleCommand(v: string) {
    if (!v) return;
    setOutput(`Executed: ${v}`);
  }

  return (
    <div className="w-full max-w-xl space-y-3">
      <div className="text-sm text-muted-foreground">
        Press <kbd className="rounded border px-1.5 py-0.5 text-xs">⌘K</kbd> /{" "}
        <kbd className="rounded border px-1.5 py-0.5 text-xs">Ctrl K</kbd> to open the command
        prompt.
      </div>
      <CommandPromptOverlay
        onCommand={handleCommand}
        placeholder="Type a command..."
        suggestions={DEFAULT_SUGGESTIONS}
      />
      <div className="text-sm text-muted-foreground">{output}</div>
      <div className="pt-2">
        <CommandPrompt
          onCommand={handleCommand}
          placeholder="Inline prompt (for comparison)"
          suggestions={DEFAULT_SUGGESTIONS}
        />
      </div>
    </div>
  );
}

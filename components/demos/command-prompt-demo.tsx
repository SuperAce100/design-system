"use client";
import * as React from "react";

import { CommandPrompt } from "@/registry/new-york/blocks/command-prompt/command-prompt";

const DEFAULT_SUGGESTIONS = [
  { value: "open settings", description: "Navigate to preferences" },
  { value: "new file", description: "Create a blank document" },
  { value: "search projects", description: "Find a project by name" },
  { value: "toggle theme", description: "Switch light/dark" },
  { value: "install component", description: "Install from registry" },
  { value: "help", description: "Show available commands" },
];

export default function CommandPromptDemo() {
  const [output, setOutput] = React.useState<string>("Try typing 'to' and press Tab");
  const [value, setValue] = React.useState<string>("");

  function handleSubmit(v: string) {
    if (!v) return;
    setOutput(`Executed: ${v}`);
    setValue("");
  }

  return (
    <div className="w-full max-w-lg space-y-3">
      <CommandPrompt
        value={value}
        onValueChange={setValue}
        onSubmit={handleSubmit}
        placeholder="Type a command..."
        suggestions={DEFAULT_SUGGESTIONS}
      />
      <div className="text-sm text-muted-foreground">{output}</div>
    </div>
  );
}

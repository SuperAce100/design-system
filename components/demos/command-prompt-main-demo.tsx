"use client";

import { CommandPrompt } from "@/registry/new-york/blocks/command-prompt/command-prompt";

const suggestions = [
  { value: "open settings", description: "Jump to preferences" },
  { value: "invite teammate", description: "Share the project" },
  { value: "deploy preview", description: "Create a new preview build" },
];

export default function CommandPromptMainDemo() {
  return (
    <div className="w-full max-w-xl">
      <CommandPrompt
        placeholder="Type a command..."
        suggestions={suggestions}
        defaultValue="deploy"
        showPrefix={false}
      />
    </div>
  );
}

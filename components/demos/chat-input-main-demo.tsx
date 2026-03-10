"use client";

import * as React from "react";
import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";

const models = [
  { id: "gpt-5-mini", name: "GPT-5 mini", description: "Fast and affordable" },
  { id: "gpt-5", name: "GPT-5", description: "Reasoning-capable and more powerful" },
];

export default function ChatInputMainDemo() {
  const [input, setInput] = React.useState("");
  const [model, setModel] = React.useState(models[0]?.id ?? "gpt-5-mini");

  return (
    <ChatInput
      title="Ask the assistant"
      placeholder="Summarize the latest feedback"
      models={models}
      allowFileUpload={false}
      loading={false}
      handleSubmit={(event) => event.preventDefault()}
      handleInputChange={(event) => setInput(event.target.value)}
      input={input}
      model={model}
      onModelChange={setModel}
    />
  );
}
